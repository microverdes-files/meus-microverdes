import { varieties, getVarietyById } from "./data/varieties.js";
import { add, put, getAll, getByIndex, exportData, importData, validateBackup } from "./db.js";

const $ = (s) => document.querySelector(s);
const uid = (prefix) => `${prefix}_${crypto.randomUUID()}`;

let selectedVariety = null;
let deferredInstallPrompt = null;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindNavigation();
  bindActions();
  renderCatalog();
  await renderDashboard();

  if ("serviceWorker" in navigator) {
    try { await navigator.serviceWorker.register("./sw.js"); } catch (e) { console.warn("SW:", e); }
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#installBtn").classList.remove("hidden");
  });
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#installBtn").addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    deferredInstallPrompt = null;
    $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#installBtn").classList.add("hidden");
  });
}

function bindNavigation() {
  document.querySelectorAll(".nav-btn").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view)));
}
function showView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };`#${name}`).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === name));
}
function bindActions() {
  document.querySelectorAll("[data-nav]").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-nav]").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    showView(btn.dataset.nav);
    if (btn.dataset.nav === "dashboard") renderDashboard();
  }));
  $("#navNew")?.addEventListener("click", () => showNewCultivationModal());

  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#newCultivationBtn").addEventListener("click", () => showNewCultivationModal());
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#closeModal").addEventListener("click", closeModal);
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#difficultyFilter").addEventListener("change", renderCatalog);
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#exportBtn").addEventListener("click", handleExport);
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#importBtn").addEventListener("click", () => $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#importFile").click());
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#importFile").addEventListener("change", handleImportFile);
}

function renderCatalog() {
  const filter = $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#difficultyFilter").value;
  const items = varieties.filter(v => filter === "all" || v.difficulty === filter);
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#catalogList").innerHTML = items.map(v => `
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

function getCultivationAttention(c, v, log, day) {
  const status = dailyStatus(c, log);
  if (status.afterWindow) return { level: "warning", label: "Passou da janela", icon: "⚠️" };
  if (status.harvestWindow) return { level: "ready", label: "Avaliar colheita", icon: "✂️" };
  if (log?.condition === "Suspeita de mofo") return { level: "danger", label: "Atenção", icon: "🚨" };
  if (log?.humidity === "muito_umida") return { level: "warning", label: "Umidade alta", icon: "💦" };
  if (log?.humidity === "seca") return { level: "warning", label: "Verificar umidade", icon: "💧" };
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
    const s = dailyStatus(c, latestLogForDay(logs, dailyStatus(c).day));
    const log = latestLogForDay(logs, s.day);
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
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#dashboard").innerHTML = `
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
          ${items.filter(x=>x.attention.level!=="ok").slice(0,4).map(x=>`
            <button class="insight-row" data-cultivation-id="${escapeHtml(x.c.id)}">
              <span class="insight-icon ${x.attention.level}">${x.attention.icon}</span>
              <span><strong>${escapeHtml(x.c.name)}</strong><small>${escapeHtml(x.attention.label)} · Dia ${x.s.day}</small></span>
              <b>›</b>
            </button>`).join("") || `<div class="good-state">✨ <strong>Tudo tranquilo.</strong><span>Nenhum alerta importante no momento.</span></div>`}
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

  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#quickNew").onclick=()=>showNewCultivationModal();
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#emptyNew")?.addEventListener("click",()=>showNewCultivationModal());
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#quickCatalog").onclick=()=>showView("catalog");
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#toolCatalog").onclick=()=>showView("catalog");
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#quickBackup").onclick=()=>handleExport();
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#toolBackup").onclick=()=>handleExport();
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#toolSettings").onclick=()=>alert("As configurações serão adicionadas em uma próxima versão.");
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#seeAllCultivations").onclick=()=>showView("cultivations");
}

function showNewCultivationModal(preselectedId = null) {
  selectedVariety = preselectedId || varieties[0].id;
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#modalContent").innerHTML = `
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
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#modal").classList.remove("hidden");
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#newCultivationForm").addEventListener("submit", createCultivation);
}
async function createCultivation(e) {
  e.preventDefault();
  const varietyId = $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#varietySelect").value;
  const v = getVarietyById(varietyId);
  const started = $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#startedAt").value || todayISO();
  const cultivation = {
    id: uid("cult"),
    varietyId,
    name: $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#cultivationName").value.trim() || `Cultivo de ${v.name}`,
    startedAt: new Date(`${started}T00:00:00`).toISOString(),
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    settings: { substrate: "", tray: "", seedAmount: null },
    notes: $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#initialNote").value.trim()
  };
  await add("cultivations", cultivation);
  if (cultivation.notes) {
    await add("dailyLogs", { id: uid("log"), cultivationId: cultivation.id, day: 0, date: cultivation.startedAt, note: cultivation.notes, createdAt: new Date().toISOString() });
  }
  closeModal();
  await renderDashboard();
  await renderCultivationDetail(cultivation.id);
}
async function renderCultivationDetail(id) {
  const all = await getAll("cultivations");
  const c = all.find(x => x.id === id);
  if (!c) return;
  const v = getVarietyById(c.varietyId);
  const s = dailyStatus(c);
  const logs = (await getByIndex("dailyLogs","cultivationId",id)).sort((a,b)=>b.day-a.day);
  showView("cultivation");
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#cultivationDetail").innerHTML = `
    <button class="back" id="backDashboard">← Voltar</button>
    <div class="detail">
      <div class="card">
        <span class="badge">${escapeHtml(s.phaseLabel)}</span>
        <h2>${escapeHtml(c.name)}</h2>
        <p class="meta">${escapeHtml(v.name)} · Dia ${s.day}</p>
        <div class="actions">
          <button class="primary" id="addLogBtn">+ Registrar hoje</button>
          ${s.harvestWindow ? `<button class="secondary" id="harvestBtn">✂️ Registrar colheita</button>` : ""}
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
        ${logs.length ? logs.map(l=>`<div class="timeline-item"><strong>Dia ${l.day} · ${formatDate(l.date)}</strong><span>${escapeHtml(l.note || "Sem observação.")}</span></div>`).join("") : `<p class="meta">Nenhum registro ainda.</p>`}
      </div>
    </div>`;
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#backDashboard").onclick = async () => { showView("dashboard"); await renderDashboard(); };
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#addLogBtn").onclick = () => showLogModal(c,v,s.day);
  if ($("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#harvestBtn")) $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#harvestBtn").onclick = () => showHarvestModal(c,v,s.day);
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
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#modalContent").innerHTML = `
    <p class="eyebrow">DIÁRIO · DIA ${day}</p>
    <h2>Registrar observação</h2>
    <form id="logForm" class="form-grid">
      <label>Condição do cultivo
        <select id="logCondition">
          ${["Saudável","Seco","Muito úmido","Alongado","Suspeita de mofo"].map(x => `<option ${existing?.condition === x ? "selected" : ""}>${x}</option>`).join("")}
        </select>
      </label>
      <label>Observação
        <textarea id="logNote" rows="4" placeholder="O que você observou hoje?">${escapeHtml(existing?.note || "")}</textarea>
      </label>
      <button class="primary" type="submit">Salvar registro</button>
    </form>`;

  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#modal").classList.remove("hidden");

  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#logForm").onsubmit = async e => {
    e.preventDefault();
    const record = existing || {
      id: uid("log"),
      cultivationId: c.id,
      day,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    await put("dailyLogs", {
      ...record,
      condition: $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#logCondition").value,
      note: $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#logNote").value.trim(),
      updatedAt: new Date().toISOString()
    });

    closeModal();
    await renderCultivationDetail(c.id);
  };
}

function showHarvestModal(c,v,day) {
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#modalContent").innerHTML = `
    <p class="eyebrow">COLHEITA</p><h2>Registrar colheita</h2>
    <form id="harvestForm" class="form-grid">
      <label>Peso colhido (g)<input id="harvestWeight" type="number" min="0" step="0.1"></label>
      <label>Avaliação<select id="harvestRating"><option value="5">5 — excelente</option><option value="4">4 — muito bom</option><option value="3">3 — bom</option><option value="2">2 — abaixo do esperado</option><option value="1">1 — ruim</option></select></label>
      <label>Observação<textarea id="harvestNote" rows="3"></textarea></label>
      <button class="primary" type="submit">Salvar colheita</button>
    </form>`;
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#modal").classList.remove("hidden");
  $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#harvestForm").onsubmit = async e => {
    e.preventDefault();
    await add("harvests",{id:uid("harvest"),cultivationId:c.id,varietyId:v.id,day,date:new Date().toISOString(),weightGrams:Number($("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#harvestWeight").value)||null,rating:Number($("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#harvestRating").value),note:$("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#harvestNote").value.trim(),createdAt:new Date().toISOString()});
    await put("cultivations",{...c,status:"harvested",harvestedAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
    closeModal(); showView("dashboard"); await renderDashboard();
  };
}
function closeModal(){ $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#modal").classList.add("hidden"); $("#seeAllCultivations").onclick=async ()=>{
    const view=$("#cultivations");
    if(!view){ return; }
    const list=items=>items.map(cultivationCard).join("");
    view.innerHTML=`<div class="app-shell"><button class="back" id="backDashAll">← Dashboard</button><div class="section-title"><div><span class="eyebrow">ACOMPANHAMENTO</span><h2>Todos os cultivos</h2></div></div><div class="cultivation-list">${cultivations.length?list(await getTodayOverview(cultivations)):`<p class="meta">Nenhum cultivo.</p>`}</div></div>`;
    showView("cultivations");
    view.querySelector("#backDashAll").onclick=()=>renderDashboard();
    view.querySelectorAll("[data-cultivation-id]").forEach(el=>el.onclick=()=>renderCultivationDetail(el.dataset.cultivationId));
  };"#modalContent").innerHTML=""; }
function startOfDay(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate())}
function todayISO(){return new Date().toISOString().slice(0,10)}
function formatDate(iso){return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(new Date(iso))}
function escapeHtml(s){return String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
