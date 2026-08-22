import { varieties, getVarietyById } from "./data/varieties.js";
import { add, put, getAll, getByIndex, remove, exportData, importData, validateBackup } from "./db.js";
const $ = (s) => document.querySelector(s);
const uid = (prefix) => `${prefix}_${crypto.randomUUID()}`;
let selectedVariety = null; let deferredInstallPrompt = null;
document.addEventListener("DOMContentLoaded", init);
async function init(){bindNavigation();bindActions();renderCatalog();await renderDashboard();if("serviceWorker"in navigator){try{await navigator.serviceWorker.register("./sw.js")}catch(e){console.warn("SW:",e)}}window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstallPrompt=e;$("#installBtn")?.classList.remove("hidden")});$("#installBtn")?.addEventListener("click",async()=>{if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();deferredInstallPrompt=null;$("#installBtn")?.classList.add("hidden")})}
function bindNavigation(){document.querySelectorAll(".nav-btn").forEach(btn=>btn.addEventListener("click",async()=>{showView(btn.dataset.view);if(btn.dataset.view==="dashboard")await renderDashboard();if(btn.dataset.view==="catalog")renderCatalog();if(btn.dataset.view==="cultivations")await renderAllCultivations()}))}
function showView(name){document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));const target=$("#"+name);if(!target)return;target.classList.add("active");document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.view===name))}
function bindActions(){$("#newCultivationBtn")?.addEventListener("click",()=>showNewCultivationModal());$("#closeModal")?.addEventListener("click",closeModal);$("#modal")?.addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});$("#difficultyFilter")?.addEventListener("change",renderCatalog);$("#exportBtn")?.addEventListener("click",handleExport);$("#importBtn")?.addEventListener("click",()=>$("#importFile")?.click());$("#importFile")?.addEventListener("change",handleImportFile)}

function renderCatalog() {
  const filter = $("#difficultyFilter").value;
  const items = varieties.filter(v => filter === "all" || v.difficulty === filter);
  $("#catalogList").innerHTML = items.map(v => `
    <article class="variety-card card">
      <span class="badge">${v.difficulty === "easy" ? "Fácil" : "Intermediária"}</span>
      <h3>${escapeHtml(v.name)}</h3>
      <p><em>${escapeHtml(v.scientificName)}</em></p>
      <div class="tags">${(v.tags || []).slice(0,3).map(t => `<span class="tag">${escapeHtml(t.replaceAll("_"," "))}</span>`).join("")}</div>
      <p><strong>${v.timing.harvestDays.min}–${v.timing.harvestDays.max} dias</strong> até a colheita (estimativa).</p>
      <button class="secondary" type="button" data-start="${v.id}">Cultivar</button>
    </article>
  `).join("");
  document.querySelectorAll("[data-start]").forEach(b => b.addEventListener("click", () => showNewCultivationModal(b.dataset.start)));
}


function formatRelativeDay(day) {
  if (day === 0) return "Hoje";
  if (day === 1) return "Amanhã";
  if (day === -1) return "Ontem";
  return day > 1 ? `Em ${day} dias` : `Há ${Math.abs(day)} dias`;
}

function getEnginePhase(v, day) {
  const phases = v?.dailyEngine?.phases || {};
  const ordered = Object.entries(phases).sort((a,b)=>(a[1].startDay??0)-(b[1].startDay??0));
  for (const [key, cfg] of ordered) {
    const start = Number(cfg.startDay ?? 0);
    const end = Number(cfg.endDay ?? Infinity);
    if (day >= start && day < end) return key;
  }
  if (day >= Number(v?.timing?.harvestDays?.min ?? 9999)) return "harvest";
  return ordered[0]?.[0] || "growth";
}

function phaseLabel(phase) {
  return ({germination:"Germinação",transition:"Transição",growth:"Crescimento",harvest:"Colheita"}[phase] || "Acompanhamento");
}

function cultivationDay(c) {
  const start = new Date(c.startedAt);
  const today = startOfDay(new Date());
  const planted = startOfDay(start);
  return Math.max(0, Math.floor((today - planted) / 86400000));
}

function dailyStatus(c, log = null) {
  const v = getVarietyById(c.varietyId);
  const day = cultivationDay(c);
  const phase = getEnginePhase(v, day);
  const cfg = v?.dailyEngine?.phases?.[phase] || {};
  const totalActions = Array.isArray(cfg.actions) ? cfg.actions.length : 0;
  const completedCount = Number(log?.completedActionsCount ?? 0);
  const minHarvest = Number(v?.timing?.harvestDays?.min ?? Infinity);
  const maxHarvest = Number(v?.timing?.harvestDays?.max ?? Infinity);
  return {
    day, phase, phaseLabel: phaseLabel(phase),
    totalActions, completedCount,
    harvestWindow: day >= minHarvest && day <= maxHarvest,
    afterWindow: day > maxHarvest
  };
}

function progressFor(v, day) {
  const max = Number(v?.timing?.harvestDays?.max ?? 1);
  return Math.max(0, Math.min(100, Math.round((day / Math.max(1,max)) * 100)));
}

async function getCultivationLogs(cultivationId) {
  return (await getByIndex("dailyLogs", "cultivationId", cultivationId)).sort((a,b)=>{
    const da=Number(a.day??0), db=Number(b.day??0);
    return db-da || String(b.date||"").localeCompare(String(a.date||""));
  });
}

function latestLogForDay(logs, day) {
  return (logs || []).find(l => Number(l.day) === Number(day)) || null;
}

function calculateCompletedActions(log) {
  if (!log) return 0;
  if (Array.isArray(log.completedActions)) return log.completedActions.filter(Boolean).length;
  return log.completedActionsCount ? Number(log.completedActionsCount) : 0;
}

function aiAnalyze(item) {
  const { c, v, logs = [] } = item;
  const currentDay = Number(item.s?.day ?? 0);

  const recent = logs
    .filter(l => {
      const d = Number(l.day ?? 0);
      return currentDay - d >= 0 && currentDay - d <= 3;
    })
    .sort((a, b) => Number(b.day ?? 0) - Number(a.day ?? 0));

  const out = [];

  const highHumidity = recent.filter(l =>
    l.humidity === "muito_umida" ||
    l.humidity === "Muito úmido" ||
    l.condition === "Muito úmido"
  );

  const dry = recent.filter(l =>
    l.humidity === "seca" ||
    l.humidity === "Seco" ||
    l.condition === "Seco"
  );

  const lowAir = recent.filter(l =>
    l.ventilation === "baixa" ||
    l.ventilation === "Baixa"
  );

  const mold = recent.filter(l =>
    l.condition === "Suspeita de mofo"
  );

  const leggy = recent.filter(l =>
    l.condition === "Alongado"
  );

  const temperatures = recent
  .map(l => Number(l.temperature))
  .filter((n, index) => {
    const value = recent[index]?.temperature;
    return value !== "" &&
           value !== null &&
           value !== undefined &&
           Number.isFinite(n);
  });

  const irrigations = recent
    .map(l => Number(l.irrigationMl))
    .filter(n => Number.isFinite(n) && n > 0);

  const totalIrrigation = irrigations.reduce((sum, n) => sum + n, 0);
  const averageTemperature = temperatures.length
    ? temperatures.reduce((a, b) => a + b, 0) / temperatures.length
    : null;

  /*
   * 1. RISCO DE CONTAMINAÇÃO
   */
  if (mold.length) {
    out.push({
      priority: 4,
      type: "danger",
      icon: "🚨",
      title: "Investigue sinais de contaminação",
      text: "Há registro de suspeita de mofo. Inspecione cuidadosamente o cultivo e não consuma enquanto houver dúvida.",
      evidence: `${mold.length} registro(s) recente(s)`
    });
  }

  /*
   * 2. UMIDADE + VENTILAÇÃO
   */
  if (highHumidity.length >= 1 && lowAir.length >= 1) {
    out.push({
      priority: 4,
      type: "danger",
      icon: "💦",
      title: "Umidade alta + pouca ventilação",
      text: "O histórico recente combina umidade elevada com pouca ventilação. Evite nova irrigação desnecessária e melhore suavemente a circulação de ar.",
      evidence: `${highHumidity.length}x umidade alta · ${lowAir.length}x ventilação baixa`
    });
  } else if (highHumidity.length >= 2) {
    out.push({
      priority: 3,
      type: "warning",
      icon: "💧",
      title: "Umidade elevada repetidamente",
      text: "O cultivo foi registrado como muito úmido em dias recentes. Verifique o substrato antes da próxima irrigação.",
      evidence: `${highHumidity.length} registros de umidade alta`
    });
  }

  /*
   * 3. CULTIVO SECO
   */
  if (dry.length >= 1) {
    out.push({
      priority: 3,
      type: "warning",
      icon: "💧",
      title: "O cultivo está ficando seco",
      text: "A umidade foi registrada como baixa repetidamente. Verifique o substrato e ajuste a irrigação conforme a necessidade.",
      evidence: `${dry.length} registros secos`
    });
  }

  /*
   * 4. VENTILAÇÃO BAIXA
   */
  if (lowAir.length >= 1 && highHumidity.length === 0) {
    out.push({
      priority: 2,
      type: "warning",
      icon: "🌬️",
      title: "Ventilação merece atenção",
text: lowAir.length === 1
  ? "A ventilação foi registrada como baixa. Observe a circulação de ar e a condição das folhas."
  : "A ventilação foi registrada como baixa em mais de um momento. Observe a circulação de ar e a condição das folhas.",      evidence: `${lowAir.length} registros de ventilação baixa`
    });
  }

  /*
   * 5. CRESCIMENTO ALONGADO
   */
  if (leggy.length >= 1) {
    out.push({
      priority: leggy.length >= 2 ? 3 : 2,
      type: "warning",
      icon: "☀️",
      title: "Crescimento alongado observado",
      text: "Foi registrado crescimento alongado. Observe a iluminação e a uniformidade do desenvolvimento antes de fazer mudanças bruscas.",
      evidence: `${leggy.length} registro(s) de alongamento`
    });
  }

  /*
   * 6. IRRIGAÇÃO + UMIDADE
   */
  if (highHumidity.length >= 1 && totalIrrigation > 0 && lowAir.length === 0) {
    out.push({
      priority: 2,
      type: "info",
      icon: "💦",
      title: "Observe a relação entre irrigação e umidade",
      text: "Há registro de irrigação junto com umidade elevada. Antes de irrigar novamente, confirme a condição real do substrato.",
      evidence: `${totalIrrigation} mL registrados · ${highHumidity.length} registro(s) úmido(s)`
    });
  }

  /*
   * 7. TEMPERATURA — apenas informação.
   *
   * O catálogo atual usa "moderate", não uma faixa numérica.
   * Portanto não vamos afirmar que uma temperatura está
   * "fora da referência" sem uma faixa confiável.
   */
  if (averageTemperature !== null) {
    out.push({
      priority: 1,
      type: "info",
      icon: "🌡️",
      title: "Temperatura registrada",
      text: "A temperatura foi registrada no acompanhamento recente. Use esse dado junto com a evolução do cultivo para identificar padrões.",
      evidence: `média recente ${averageTemperature.toFixed(1)} °C`
    });
  }

  /*
   * 8. JANELA DE COLHEITA
   */
  if (item.s.harvestWindow) {
    out.push({
      priority: 2,
      type: "ready",
      icon: "✂️",
      title: "Você entrou na janela de colheita",
      text: "Compare altura, cor, firmeza e aparência com os sinais de colheita da variedade e registre o resultado quando decidir colher.",
      evidence: `Dia ${currentDay}`
    });
  }

  /*
   * 9. NENHUM ALERTA
   */
const pendingActions = Math.max(
  0,
  Number(item.s?.totalActions ?? 0) - Number(item.s?.completedCount ?? 0)
);

if (pendingActions > 0) {
  const actionLabels = {
    check_emergence: "Observar emergência",
    monitor_humidity: "Verificar umidade",
    keep_cover_if_needed: "Manter cobertura se necessário",
    start_light_when_established: "Iniciar luz quando estabelecido",
    increase_airflow: "Aumentar circulação",
    provide_light: "Fornecer luz",
    control_humidity: "Controlar umidade",
    maintain_airflow: "Manter ventilação",
    check_for_mold: "Verificar mofo",
    check_for_leggy_growth: "Verificar alongamento",
    evaluate_harvest_signals: "Avaliar sinais de colheita",
    record_harvest_if_ready: "Registrar colheita se estiver pronto"
  };

  const phaseActions =
    item.v?.dailyEngine?.phases?.[item.s?.phase]?.actions || [];

  const completedActions = Array.isArray(item.logs)
    ? item.logs
        .filter(l => Number(l.day) === Number(item.s?.day))
        .flatMap(l => Array.isArray(l.completedActions) ? l.completedActions : [])
    : [];

  const pendingActionNames = phaseActions
    .filter(action => !completedActions.includes(action))
    .map(action => actionLabels[action] || action);

  out.push({
    priority: 2,
    type: "action",
    icon: "✓",
    title: "Há tarefas pendentes hoje",
    text: pendingActionNames.length
      ? pendingActionNames.join(" · ")
      : `Existem ${pendingActions} tarefa(s) da fase atual ainda pendente(s).`,
      evidence: `${pendingActions} ${pendingActions === 1 ? "tarefa pendente" : "tarefas pendentes"}`  });
}
  if (!out.length) {
    out.push({
      priority: 0,
      type: "ok",
      icon: "✨",
      title: "Tudo tranquilo",
      text: "Os registros recentes não indicam um padrão que exija intervenção. Continue observando e registrando.",
      evidence: "análise dos registros recentes"
    });
  }

  return out.sort((a, b) => b.priority - a.priority);
}

function renderIntelligencePanel(items) {
  const insights=[];
  items.forEach(item=>aiAnalyze(item).filter(x=>x.priority>0).forEach(x=>insights.push({...x,cultivation:item.c.name,cultivationId:item.c.id})));
  insights.sort((a,b)=>b.priority-a.priority);
  return insights.slice(0,4).map(i=>`<button class="ai-insight ${i.type}" data-cultivation-id="${escapeHtml(i.cultivationId)}"><span class="ai-icon">${i.icon}</span><span class="ai-body"><strong>${escapeHtml(i.title)}</strong><small>${escapeHtml(i.cultivation)} · ${escapeHtml(i.evidence)}</small><em>${escapeHtml(i.text)}</em></span><b>›</b></button>`).join("") || `<div class="good-state">✨ <strong>Tudo tranquilo.</strong><span>Nenhum alerta importante no momento.</span></div>`;
}

function getCultivationAttention(c, v, log, day) {
  const status = dailyStatus(c, log);
  if (status.afterWindow) return { level: "warning", label: "Passou da janela", icon: "⚠️" };
  if (status.harvestWindow) return { level: "ready", label: "Avaliar colheita", icon: "✂️" };
  if (log?.condition === "Suspeita de mofo") return { level: "danger", label: "Atenção", icon: "🚨" };
  if (log?.humidity === "muito_umida" || log?.condition === "Muito úmido") return { level: "warning", label: "Umidade alta", icon: "💦" };
  if (log?.humidity === "seca" || log?.condition === "Seco") return { level: "warning", label: "Verificar umidade", icon: "💧" };
  if (status.completedCount < status.totalActions && status.totalActions) return { level: "action", label: "Há tarefas hoje", icon: "✓" };
  return { level: "ok", label: "Em andamento", icon: "🌱" };
}

async function getTodayOverview(cultivations) {
  const items = [];
  for (const c of cultivations) {
    if (c.status === "harvested" || c.status === "archived") continue;
    const v = getVarietyById(c.varietyId);
    if (!v) continue;
    const logs = await getCultivationLogs(c.id);
    const dayNow = cultivationDay(c);
    const log = latestLogForDay(logs, dayNow);
    const s = dailyStatus(c, log);
    items.push({ c, v, s, log, attention: getCultivationAttention(c,v,log,s.day), logs });
  }
  return items;
}

function renderTodayHero(items) {
  const actions = items.reduce((sum,x)=>sum + Math.max(0,x.s.totalActions-x.s.completedCount),0);
  const ready = items.filter(x=>x.s.harvestWindow).length;
  const attention = items.filter(x=>["danger","warning"].includes(x.attention.level)).length;
  return `
    <section class="today-hero">
      <div class="hero-copy">
        <span class="eyebrow">SEU CULTIVO HOJE</span>
        <h1>${items.length ? "Vamos cuidar das suas plantas?" : "Comece seu primeiro cultivo"}</h1>
        <p>${items.length
          ? `${items.length} cultivo(s) ativo(s)${actions ? ` · ${actions} tarefa(s) pendente(s)` : " · tudo em dia"}`
          : "Escolha uma variedade e registre seu primeiro plantio."}</p>
      </div>
      <div class="hero-orb">🌱</div>
      <div class="today-metrics">
        <div><strong>${items.length}</strong><span>ativos</span></div>
        <div><strong>${actions}</strong><span>tarefas</span></div>
        <div><strong>${ready}</strong><span>colheitas</span></div>
        ${attention ? `<div class="metric-alert"><strong>${attention}</strong><span>atenção</span></div>` : ""}
      </div>
    </section>`;
}

function cultivationCard(item) {
  const {c,v,s,attention}=item;
  const progress=progressFor(v,s.day);
  const pending=Math.max(0,s.totalActions-s.completedCount);
  return `
    <article class="cultivation-card" data-cultivation-id="${escapeHtml(c.id)}">
      <button class="card-main" type="button">
        <div class="cultivation-head">
          <div>
            <span class="status-pill ${attention.level}">${attention.icon} ${escapeHtml(attention.label)}</span>
            <h3>${escapeHtml(c.name)}</h3>
            <p>${escapeHtml(v.name)} · Dia ${s.day} · ${escapeHtml(s.phaseLabel)}</p>
          </div>
          <div class="cultivation-day">D${s.day}</div>
        </div>
        <div class="mini-progress"><span style="width:${progress}%"></span></div>
        <div class="cultivation-footer">
          <span>${pending ? `✓ ${pending} tarefa(s) pendente(s)` : "✓ Tudo em dia"}</span>
          <strong>${progress}%</strong>
        </div>
      </button>
    </article>`;
}

function renderActivityTimeline(items) {
  const rows=[];
  for (const item of items) {
    const latest=item.logs[0];
    if (latest) rows.push({
      date: latest.date, cultivation:item.c.name, day:latest.day,
      text: latest.note || latest.condition || "Registro atualizado",
      temp: latest.temperature
    });
  }
  rows.sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  return rows.slice(0,5).map(r=>`
    <div class="activity-row">
      <div class="activity-dot">🌱</div>
      <div><strong>${escapeHtml(r.cultivation)} · Dia ${r.day}</strong>
      <span>${escapeHtml(r.text)}${r.temp!=null ? ` · ${r.temp}°C` : ""}</span></div>
      <time>${formatDate(r.date)}</time>
    </div>`).join("") || `<p class="meta">Seus registros aparecerão aqui conforme você acompanhar os cultivos.</p>`;
}

function renderCalendar(items) {
  const days=[];
  for(let i=0;i<7;i++){
    const date=new Date(); date.setHours(0,0,0,0); date.setDate(date.getDate()+i);
    let tasks=0, harvest=0;
    for(const item of items){
      const targetDay=item.s.day+i;
      const phase=getEnginePhase(item.v,targetDay);
      const acts=item.v?.dailyEngine?.phases?.[phase]?.actions || [];
      tasks+=acts.length;
      if(item.v?.timing?.harvestDays && targetDay>=item.v.timing.harvestDays.min && targetDay<=item.v.timing.harvestDays.max) harvest++;
    }
    days.push({date,tasks,harvest});
  }
  return days.map((d,i)=>`
    <div class="calendar-day ${i===0?"today":""}">
      <span>${d.date.toLocaleDateString("pt-BR",{weekday:"short"}).replace(".","")}</span>
      <strong>${d.date.getDate()}</strong>
      ${d.tasks ? `<small>✓ ${d.tasks}</small>` : `<small>—</small>`}
      ${d.harvest ? `<em>✂️</em>` : ""}
    </div>`).join("");
}

async function renderDashboard() {
  const cultivations = await getAll("cultivations");
  const items = await getTodayOverview(cultivations);

  showView("dashboard");
  $("#dashboard").innerHTML = `
    <div class="app-shell">
      ${renderTodayHero(items)}

      <div class="quick-actions">
        <button class="quick-action primary" id="quickNew"><span>＋</span><strong>Novo cultivo</strong><small>Começar agora</small></button>
        <button class="quick-action" id="quickCatalog"><span>🌱</span><strong>Variedades</strong><small>Ver catálogo</small></button>
        <button class="quick-action" id="quickBackup"><span>💾</span><strong>Backup</strong><small>Exportar dados</small></button>
      </div>

      <section class="dashboard-section">
        <div class="section-title">
          <div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Meus cultivos</h2></div>
          <button class="text-button" id="seeAllCultivations">${items.length ? "Ver todos" : ""}</button>
        </div>
        <div class="cultivation-list">
          ${items.length ? items.slice(0,4).map(cultivationCard).join("") : `
            <div class="empty-state">
              <div>🌱</div><h3>Seu primeiro cultivo começa aqui</h3>
              <p>Escolha uma variedade e o app vai montar o acompanhamento diário para você.</p>
              <button class="primary" id="emptyNew">Começar um cultivo</button>
            </div>`}
        </div>
      </section>

      <section class="dashboard-section">
        <div class="section-title"><div><span class="eyebrow">PLANEJAMENTO</span><h2>Próximos 7 dias</h2></div></div>
        <div class="calendar-strip">${renderCalendar(items)}</div>
        <p class="calendar-help"><span>✓</span> tarefas previstas · <span>✂️</span> possível janela de colheita</p>
      </section>

      <section class="dashboard-grid">
        <div class="card intelligence-card">
          <div class="section-title compact"><div><span class="eyebrow">INTELIGÊNCIA</span><h3>O que merece atenção</h3></div>🧠</div>
          ${renderIntelligencePanel(items)}
        </div>

        <div class="card">
          <div class="section-title compact"><div><span class="eyebrow">DIÁRIO</span><h3>Atividade recente</h3></div></div>
          <div class="activity-list">${renderActivityTimeline(items)}</div>
        </div>
      </section>

      <section class="dashboard-section">
        <div class="section-title"><div><span class="eyebrow">ACESSO RÁPIDO</span><h2>Ferramentas</h2></div></div>
        <div class="tools-grid">
          <button class="tool-card" id="toolCatalog"><span>🌿</span><strong>Catálogo</strong><small>Variedades e protocolos</small></button>
          <button class="tool-card" id="toolBackup"><span>💾</span><strong>Backup</strong><small>Exportar ou importar</small></button>
          <button class="tool-card" id="toolSettings"><span>⚙️</span><strong>Configurações</strong><small>Preferências do app</small></button>
        </div>
      </section>
    </div>`;

  document.querySelectorAll("[data-cultivation-id]").forEach(el=>{
    el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId);
  });

  $("#quickNew").onclick=()=>showNewCultivationModal();
  $("#emptyNew")?.addEventListener("click",()=>showNewCultivationModal());
  $("#quickCatalog").onclick=()=>showView("catalog");
  $("#toolCatalog").onclick=()=>showView("catalog");
  $("#quickBackup").onclick=()=>handleExport();
  $("#toolBackup").onclick=()=>handleExport();
  $("#toolSettings").onclick=()=>alert("As configurações serão adicionadas em uma próxima versão.");
  $("#seeAllCultivations")?.addEventListener("click", () => showView("cultivations"));
}

async function renderAllCultivations() {
  const cultivations=await getAll("cultivations");
  const items=await getTodayOverview(cultivations);
  showView("cultivations");
  const host=$("#cultivations .container-inner");
  host.innerHTML=`<div class="app-shell"><button class="back" id="allBack">← Início</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div><button class="primary" id="allNew">+ Novo</button></div><div class="cultivation-list">${items.length?items.map(cultivationCard).join(""):`<div class="empty-state"><div>🌱</div><h3>Nenhum cultivo ativo</h3><p>Comece sua primeira bandeja.</p><button class="primary" id="allEmptyNew">Começar</button></div>`}</div></div>`;
  host.querySelector("#allBack").onclick=()=>renderDashboard(); host.querySelector("#allNew").onclick=()=>showNewCultivationModal(); host.querySelector("#allEmptyNew")?.addEventListener("click",()=>showNewCultivationModal());
  host.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
}

function showNewCultivationModal(preselectedId = null) {
  selectedVariety = preselectedId || varieties[0].id;
  $("#modalContent").innerHTML = `
    <p class="eyebrow">NOVO CULTIVO</p><h2>Começar uma bandeja</h2>
    <form id="newCultivationForm" class="form-grid">
      <label>Variedade
        <select id="varietySelect">${varieties.map(v => `<option value="${v.id}" ${v.id === selectedVariety ? "selected":""}>${escapeHtml(v.name)}</option>`).join("")}</select>
      </label>
      <label>Nome do cultivo
        <input id="cultivationName" maxlength="60" placeholder="Ex.: Rúcula — bandeja 1">
      </label>
      <label>Data de plantio
        <input id="startedAt" type="date" value="${todayISO()}">
      </label>
      <label>Observação inicial
        <textarea id="initialNote" rows="3" placeholder="Ex.: substrato de coco, bandeja 1020..."></textarea>
      </label>
      <button class="primary" type="submit">Criar cultivo</button>
    </form>`;
  $("#modal").classList.remove("hidden");
  $("#newCultivationForm").addEventListener("submit", createCultivation);
}
async function createCultivation(e) {
  e.preventDefault();
  const varietyId = $("#varietySelect").value;
  const v = getVarietyById(varietyId);
  const started = $("#startedAt").value || todayISO();
  const cultivation = {
    id: uid("cult"),
    varietyId,
    name: $("#cultivationName").value.trim() || `Cultivo de ${v.name}`,
    startedAt: new Date(`${started}T00:00:00`).toISOString(),
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    settings: { substrate: "", tray: "", seedAmount: null },
    notes: $("#initialNote").value.trim()
  };
  await add("cultivations", cultivation);
  await add("dailyLogs", { id: uid("log"), cultivationId: cultivation.id, day: 0, date: cultivation.startedAt, note: cultivation.notes || "Plantio iniciado.", createdAt: new Date().toISOString() });
  closeModal();
  await renderDashboard();
  await renderCultivationDetail(cultivation.id);
}
async function renderCultivationDetail(id) {
  const all = await getAll("cultivations");
  const c = all.find(x => x.id === id);
  if (!c) return;
  const v = getVarietyById(c.varietyId);
  const logs = (await getByIndex("dailyLogs","cultivationId",id)).sort((a,b)=>{
  const da = Number(a.day ?? 0), db = Number(b.day ?? 0);
  return db - da || String(b.date || "").localeCompare(String(a.date || ""));
});
const day = cultivationDay(c);
const existingLog = latestLogForDay(logs, day);
const s = dailyStatus(c, existingLog);
  showView("cultivation");
  $("#cultivationDetail").innerHTML = `
    <button class="back" id="backDashboard">← Voltar</button>
    <div class="detail">
      <div class="card">
        <span class="badge">${escapeHtml(s.phaseLabel)}</span>
        <h2>${escapeHtml(c.name)}</h2>
        <p class="meta">${escapeHtml(v.name)} · Dia ${s.day}</p>
        <div class="actions">
        <button class="primary" id="addLogBtn">${existingLog ? "✏️ Editar registro de hoje" : "+ Registrar hoje"}</button>          ${s.harvestWindow ? `<button class="secondary" id="harvestBtn">✂️ Registrar colheita</button>` : ""}
        </div>
      </div>
      <div class="card">
        <h3>Orientação de hoje</h3>
        ${todayGuidance(v,s).map(x=>`<div class="timeline-item"><strong>${escapeHtml(x.title)}</strong><span>${escapeHtml(x.text)}</span></div>`).join("")}
      </div>
      <div class="card">
        <h3>Plano da variedade</h3>
        <p>Germinação: <strong>${v.timing.germinationDays.min}–${v.timing.germinationDays.max} dias</strong></p>
        <p>Blackout: <strong>${v.timing.blackoutDays.min}–${v.timing.blackoutDays.max} dias</strong></p>
        <p>Colheita: <strong>${v.timing.harvestDays.min}–${v.timing.harvestDays.max} dias</strong></p>
        <div class="notice">Os prazos são estimativas. Temperatura, luz, umidade, sementes, substrato e método de cultivo podem alterar o desenvolvimento.</div>
      </div>
      <div class="card">
        <h3>Diário</h3>
        ${logs.length ? logs.map(l=>`
  <div class="timeline-item">
    <div>
      <strong>Dia ${l.day} · ${formatDate(l.date)}</strong>
      <span>${escapeHtml(l.note || "Sem observação.")}</span>
    </div>
    <button class="secondary edit-log-btn" data-log-id="${escapeHtml(l.id)}">✏️ Editar</button>
  </div>
`).join("") : `<p class="meta">Nenhum registro ainda.</p>`}
      </div>
    </div>`;
  $("#backDashboard").onclick = async () => { showView("dashboard"); await renderDashboard(); };
  $("#addLogBtn").onclick = () => showLogModal(c,v,s.day,existingLog);
  if ($("#harvestBtn")) $("#harvestBtn").onclick = () => showHarvestModal(c,v,s.day);
document.querySelectorAll(".edit-log-btn").forEach(btn => {
  btn.onclick = () => {
    const log = logs.find(l => l.id === btn.dataset.logId);
    if (log) showLogModal(c, v, log.day, log);
  };
});  
}
function todayGuidance(v,s) {
  const out = [];
  if (s.phase === "germination") {
    out.push({title:"🌱 Observe a emergência",text:"Confira se as sementes estão germinando e mantenha a umidade uniforme."});
    out.push({title:"💧 Evite encharcar",text:"O objetivo é substrato úmido, não saturado."});
  } else if (s.phase === "transition") {
    out.push({title:"☀️ Prepare a luz",text:"Quando a germinação estiver estabelecida, retire a cobertura e forneça boa iluminação."});
    out.push({title:"🌬️ Aumente a circulação",text:"Comece a manter circulação de ar suave ao redor da bandeja."});
  } else if (s.phase === "growth") {
    out.push({title:"☀️ Mantenha boa iluminação",text:"Observe alongamento excessivo e crescimento direcionado para a luz."});
    out.push({title:"🌬️ Observe ventilação e umidade",text:"Evite ambiente abafado e excesso de água."});
  } else if (s.phase === "harvest") {
    out.push({title:"✂️ Avalie a colheita",text:"Compare altura, cor, firmeza e aparência com os sinais de colheita da variedade."});
  } else {
    out.push({title:"🔎 Cultivo além da janela estimada",text:"Avalie cuidadosamente a aparência antes de decidir pela colheita."});
  }
  return out;
}
function showLogModal(c, v, day, existing = null) {
  const val = key => existing?.[key] ?? "";
  const selected = (key, value) => val(key) === value ? "selected" : "";
  const checked = key => val(key) ? "checked" : "";
  const options=(items,key)=>items.map(([value,label])=>`<option value="${value}" ${selected(key,value)}>${label}</option>`).join("");
  const irrigation = Number.isFinite(Number(val("irrigationMl"))) ? val("irrigationMl") : "";
  const temperature = Number.isFinite(Number(val("temperature"))) ? val("temperature") : "";
  const humidity = val("humidity") || "adequada";
  const ventilation = val("ventilation") || "adequada";
  const condition = val("condition") || "Saudável";
  const note = val("note");
  const actions = v?.dailyEngine?.phases?.[getEnginePhase(v,day)]?.actions || [];
  const completed = Array.isArray(existing?.completedActions) ? existing.completedActions : [];
  const actionLabels = {
    check_emergence:"Observar emergência", monitor_humidity:"Verificar umidade", keep_cover_if_needed:"Manter cobertura se necessário",
    start_light_when_established:"Iniciar luz quando estabelecido", increase_airflow:"Aumentar circulação", provide_light:"Fornecer luz",
    control_humidity:"Controlar umidade", maintain_airflow:"Manter ventilação", check_for_mold:"Verificar mofo",
    check_for_leggy_growth:"Verificar alongamento", evaluate_harvest_signals:"Avaliar sinais de colheita", record_harvest_if_ready:"Registrar colheita se estiver pronto"
  };
  const conditionOpts=[["Saudável","Saudável"],["Seco","Seco"],["Muito úmido","Muito úmido"],["Alongado","Alongado"],["Suspeita de mofo","Suspeita de mofo"]];
  const humidityOpts=[["adequada","Adequada"],["muito_umida","Muito úmida"],["seca","Seca"]];
  const ventilationOpts=[["adequada","Adequada"],["baixa","Baixa"],["alta","Alta"]];
  const checkedActions = actions.map((a,i)=>`<label class="check-row"><input type="checkbox" data-action-index="${i}" ${completed.includes(a)?"checked":""}><span>${escapeHtml(actionLabels[a] || a.replaceAll("_"," "))}</span></label>`).join("");
  const conditionHtml=conditionOpts.map(([value,label])=>`<option value="${escapeHtml(value)}" ${condition===value?"selected":""}>${label}</option>`).join("");
  const humidityHtml=options(humidityOpts,"humidity");
  const ventilationHtml=options(ventilationOpts,"ventilation");
  const irrigationType=val("irrigationType")||"nenhuma";
  const irrigationOptions=[["nenhuma","Nenhuma"],["spray","Borrifador"],["regador","Regador"],["fundo","Por baixo"]].map(([x,l])=>`<option value="${x}" ${irrigationType===x?"selected":""}>${l}</option>`).join("");
  const photosHint = existing?.photoCount ? ` · ${existing.photoCount} foto(s)` : "";
  $("#modalContent").innerHTML=`<p class="eyebrow">DIÁRIO · DIA ${day}</p><h2>Registrar observação</h2>
    <form id="logForm" class="form-grid">
      <label>Condição do cultivo<select id="logCondition">${conditionHtml}</select></label>
      <label>Umidade<select id="logHumidity">${humidityHtml}</select></label>
      <label>Ventilação<select id="logVentilation">${ventilationHtml}</select></label>
      <label>Temperatura (°C)<input id="logTemperature" type="number" step="0.1" min="-10" max="60" value="${escapeHtml(temperature)}" placeholder="Ex.: 24,5"></label>
      <label>Irrigação<input id="logIrrigation" type="number" min="0" step="1" value="${escapeHtml(irrigation)}" placeholder="mL (opcional)"></label>
      <label>Como irrigou<select id="logIrrigationType">${irrigationOptions}</select></label>
      ${checkedActions ? `<div><strong>Checklist de hoje</strong><div class="check-list">${checkedActions}</div></div>` : ""}
      <label>Observação<textarea id="logNote" rows="4" placeholder="O que você observou hoje?">${escapeHtml(note)}</textarea></label>
      <button class="primary" type="submit">Salvar registro</button>
      <p class="meta">Fotos podem ser adicionadas na tela do cultivo${photosHint}.</p>
    </form>`;
  $("#modal").classList.remove("hidden");
  $("#logForm").onsubmit=async e=>{
    e.preventDefault();
    const record=existing || {id:uid("log"),cultivationId:c.id,day,date:new Date().toISOString(),createdAt:new Date().toISOString()};
    const completedActions=actions.filter((a,i)=>document.querySelector(`[data-action-index="${i}"]`)?.checked);
    await put("dailyLogs",{...record,condition:$("#logCondition").value,humidity:$("#logHumidity").value,ventilation:$("#logVentilation").value,temperature:$("#logTemperature").value?Number($("#logTemperature").value):null,irrigationMl:$("#logIrrigation").value?Number($("#logIrrigation").value):null,irrigationType:$("#logIrrigationType").value,note:$("#logNote").value.trim(),completedActions,completedActionsCount:completedActions.length,updatedAt:new Date().toISOString()});
    closeModal(); await renderCultivationDetail(c.id);
  };
}

function showHarvestModal(c,v,day) {
  $("#modalContent").innerHTML = `
    <p class="eyebrow">COLHEITA</p><h2>Registrar colheita</h2>
    <form id="harvestForm" class="form-grid">
      <label>Peso colhido (g)<input id="harvestWeight" type="number" min="0" step="0.1"></label>
      <label>Avaliação<select id="harvestRating"><option value="5">5 — excelente</option><option value="4">4 — muito bom</option><option value="3">3 — bom</option><option value="2">2 — abaixo do esperado</option><option value="1">1 — ruim</option></select></label>
      <label>Observação<textarea id="harvestNote" rows="3"></textarea></label>
      <button class="primary" type="submit">Salvar colheita</button>
    </form>`;
  $("#modal").classList.remove("hidden");
  $("#harvestForm").onsubmit = async e => {
    e.preventDefault();
    await add("harvests",{id:uid("harvest"),cultivationId:c.id,varietyId:v.id,day,date:new Date().toISOString(),weightGrams:Number($("#harvestWeight").value)||null,rating:Number($("#harvestRating").value),note:$("#harvestNote").value.trim(),createdAt:new Date().toISOString()});
    await put("cultivations",{...c,status:"harvested",harvestedAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
    closeModal(); showView("dashboard"); await renderDashboard();
  };
}
async function handleExport() {
  const backup = await exportData();
  const blob = new Blob([JSON.stringify(backup, null, 2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `meus-microverdes-backup-${todayISO()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

async function handleImportFile(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const backup = JSON.parse(await file.text());
    validateBackup(backup);
    await importData(backup);
    alert("Backup importado com sucesso.");
    await renderDashboard();
  } catch (err) {
    console.error(err);
    alert(`Não foi possível importar o backup: ${err.message}`);
  } finally {
    e.target.value = "";
  }
}

function closeModal(){ $("#modal").classList.add("hidden"); $("#modalContent").innerHTML=""; }
function startOfDay(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate())}
function todayISO(){return new Date().toISOString().slice(0,10)}
function formatDate(iso){return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(new Date(iso))}
function escapeHtml(s){return String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
