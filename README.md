# Meus Microverdes — PWA inicial

## Estrutura

- `index.html` — interface principal
- `styles.css` — estilos
- `app.js` — interface e motor diário inicial
- `db.js` — camada IndexedDB V2 + exportação/importação
- `sw.js` — Service Worker / cache offline
- `manifest.webmanifest` — configuração PWA
- `data/varieties.js` — catálogo em JavaScript
- `data/varieties.json` — catálogo em JSON

## Como testar

O Service Worker exige um contexto seguro. No GitHub Pages ele funcionará normalmente.

Para desenvolvimento local, use um servidor HTTP, por exemplo:

```bash
python3 -m http.server 8000
```

Depois abra:

http://localhost:8000

## IndexedDB

O banco `meus-microverdes` possui:

- `cultivations`
- `dailyLogs`
- `harvests`
- `settings`

A próxima evolução deve adicionar exportação/importação completa dos dados em JSON.

## Backup e restauração

A tela inicial possui **Exportar backup** e **Importar backup**. O backup contém `cultivations`, `dailyLogs`, `harvests` e `settings`. O catálogo de variedades não é exportado. O arquivo possui `formatVersion: 1` para permitir evolução futura.


## Motor diário V3

O aplicativo agora usa o campo `dailyEngine` de cada variedade para gerar um checklist contextual.

O motor:
- calcula o dia do cultivo;
- determina a fase pela estratégia da variedade;
- monta as ações do dia;
- permite marcar cada ação como concluída;
- salva o checklist no `dailyLogs`;
- usa a última observação para destacar alertas;
- indica o próximo passo;
- mostra progresso em relação à janela máxima estimada de colheita.

O motor não trata o calendário como uma regra absoluta: os textos orientam o usuário a observar o estado real das plantas.


## Registro de cultivo V4

O diário agora registra:
- 💧 irrigação;
- 💦 umidade do substrato;
- 🌡️ temperatura;
- 🌬️ ventilação;
- 📝 observação estruturada;
- 📷 fotos por dia/cultivo.

As fotos são redimensionadas no navegador antes de serem armazenadas no IndexedDB, reduzindo o consumo de espaço. Elas também fazem parte do backup JSON, portanto backups com muitas fotos podem ficar maiores.


## Experiência V5

A V5 reorganiza a experiência em torno da pergunta **"o que eu preciso fazer hoje?"**.

Inclui:
- dashboard diário;
- cards dos cultivos ativos;
- status inteligente;
- tarefas pendentes;
- janela de colheita;
- alertas de atenção;
- planejamento dos próximos 7 dias;
- atividade recente;
- acesso rápido a catálogo, backup e novo cultivo;
- navegação inferior otimizada para uso em celular;
- layout responsivo para PWA.


## Inteligência agronômica V6

O aplicativo analisa padrões recentes dos registros do usuário e gera sugestões contextualizadas.

Exemplos:
- umidade alta repetida + ventilação baixa;
- umidade baixa repetida;
- crescimento alongado;
- temperatura média fora da faixa de referência da variedade;
- entrada na janela estimada de colheita;
- suspeita de mofo.

A inteligência é **heurística e orientativa**: não substitui avaliação visual, conhecimento agronômico ou diagnóstico profissional. O objetivo é ajudar o usuário a perceber padrões nos próprios registros.


## V6.1

Ajuste visual de espaçamento interno dos cards de Inteligência e Atividade no dashboard, com padding responsivo para desktop e mobile.

## V6.2 — correção de acompanhamento

Corrigido o motor de status diário usado pelo dashboard e pelo detalhe do cultivo, incluindo cálculo do dia, fase, janela de colheita e leitura dos registros do diário.
