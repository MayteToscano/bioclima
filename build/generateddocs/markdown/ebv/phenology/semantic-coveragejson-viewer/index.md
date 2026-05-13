
# Semantic CoverageJSON map viewer (Schema)

`syke.ebv.phenology.semantic-coveragejson-viewer` *v1.0*

Catalog-driven map viewer that renders CoverageJSON grids and resolves parameter attributes against a multilingual ontology index.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Semantic CoverageJSON map viewer

Catalog-driven map viewer that renders CoverageJSON grids and resolves parameter attributes against a multilingual ontology index.

This block makes the executable workflow visible in the Building Blocks register. The numerical or software execution remains in code, while the block records the semantic inputs, outputs, method, implementation file and ontology links.

The viewer is no longer ad hoc: new coverages are registered through `data/catalog.json`, while labels and definitions are resolved from `data/ontology-index.json`.

## Examples

### Semantic CoverageJSON map viewer definition
examples/semantic-coveragejson-viewer.jsonld
#### json
```json
{
  "@context": {
    "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
    "prov": "http://www.w3.org/ns/prov#",
    "dct": "http://purl.org/dc/terms/"
  },
  "@id": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#SemanticCoverageJSONViewer",
  "@type": [
    "ebv:SemanticCoverageJSONViewer",
    "prov:SoftwareAgent"
  ],
  "title": {
    "en": "Semantic CoverageJSON map viewer",
    "es": "Visor cartográfico semántico de CoverageJSON",
    "fi": "Semanttinen CoverageJSON-karttakatselin"
  },
  "description": {
    "en": "The viewer loads data/catalog.json, reads CoverageJSON parameters, resolves observedProperty.id against data/ontology-index.json and selects the interface language from the browser locale with manual override.",
    "es": "El visor carga data/catalog.json, lee los parámetros CoverageJSON, resuelve observedProperty.id contra data/ontology-index.json y selecciona el idioma de la interfaz a partir del idioma del navegador con opción de cambio manual.",
    "fi": "Katselin lataa data/catalog.json-tiedoston, lukee CoverageJSON-parametrit, yhdistää observedProperty.id-arvon data/ontology-index.json-tiedostoon ja valitsee käyttöliittymän kielen selaimen kieliasetuksen perusteella manuaalisella ohituksella."
  },
  "usesOntology": "data/ontology-index.json",
  "input": [
    "data/catalog.json",
    "CoverageJSON files"
  ],
  "output": [
    "interactive map layer",
    "multilingual semantic description"
  ],
  "implementedBy": {
    "language": "javascript/html/css",
    "path": "viewer/",
    "role": "browser application"
  }
}
```

#### javascript
```javascript
const UI = {
  en: {appTitle:'BioClima CoverageJSON Viewer',appSubtitle:'Generic catalog-driven viewer for observations, indicators and categorical coverages encoded as CoverageJSON.',language:'Language',coverage:'Coverage',parameter:'Parameter',opacity:'Opacity',semanticDescription:'Semantic description',semanticUri:'Semantic URI',ontologyClass:'Ontology type',unit:'Unit',buildingBlock:'Building Block',layerSummary:'Layer summary',type:'Type',validCells:'Valid cells',min:'Min',mean:'Mean',max:'Max',legend:'Legend',hint:'To add a new observation or indicator, add its CoverageJSON file to data/ and register it in data/catalog.json. The viewer will detect the parameters automatically.',categories:'categories',noData:'No data',value:'Value',cell:'Cell',coordinates:'Coordinates'},
  es: {appTitle:'Visor CoverageJSON BioClima',appSubtitle:'Visor genérico basado en catálogo para observaciones, indicadores y coberturas categóricas codificadas como CoverageJSON.',language:'Idioma',coverage:'Cobertura',parameter:'Parámetro',opacity:'Opacidad',semanticDescription:'Descripción semántica',semanticUri:'URI semántica',ontologyClass:'Tipo ontológico',unit:'Unidad',buildingBlock:'Building Block',layerSummary:'Resumen de la capa',type:'Tipo',validCells:'Celdas válidas',min:'Mínimo',mean:'Media',max:'Máximo',legend:'Leyenda',hint:'Para añadir una nueva observación o indicador, añade su archivo CoverageJSON a data/ y regístralo en data/catalog.json. El visor detectará los parámetros automáticamente.',categories:'categorías',noData:'Sin datos',value:'Valor',cell:'Celda',coordinates:'Coordenadas'},
  fi: {appTitle:'BioClima CoverageJSON -katselin',appSubtitle:'Yleiskäyttöinen luettelo-ohjattu katselin CoverageJSON-muotoisille havainnoille, indikaattoreille ja luokitelluille kattavuuksille.',language:'Kieli',coverage:'Kattavuus',parameter:'Parametri',opacity:'Läpinäkyvyys',semanticDescription:'Semanttinen kuvaus',semanticUri:'Semanttinen URI',ontologyClass:'Ontologinen tyyppi',unit:'Yksikkö',buildingBlock:'Building Block',layerSummary:'Tason yhteenveto',type:'Tyyppi',validCells:'Kelvolliset solut',min:'Minimi',mean:'Keskiarvo',max:'Maksimi',legend:'Selite',hint:'Lisää uusi havainto tai indikaattori lisäämällä CoverageJSON-tiedosto data/-kansioon ja rekisteröimällä se data/catalog.json-tiedostossa. Katselin tunnistaa parametrit automaattisesti.',categories:'luokat',noData:'Ei dataa',value:'Arvo',cell:'Solu',coordinates:'Koordinaatit'},
  ro: {appTitle:'Vizualizator CoverageJSON BioClima',appSubtitle:'Vizualizator generic bazat pe catalog pentru observații, indicatori și acoperiri categoriale codificate ca CoverageJSON.',language:'Limbă',coverage:'Acoperire',parameter:'Parametru',opacity:'Opacitate',semanticDescription:'Descriere semantică',semanticUri:'URI semantic',ontologyClass:'Tip ontologic',unit:'Unitate',buildingBlock:'Building Block',layerSummary:'Rezumat strat',type:'Tip',validCells:'Celule valide',min:'Minim',mean:'Medie',max:'Maxim',legend:'Legendă',hint:'Pentru a adăuga o observație sau un indicator nou, adăugați fișierul CoverageJSON în data/ și înregistrați-l în data/catalog.json. Vizualizatorul va detecta automat parametrii.',categories:'categorii',noData:'Fără date',value:'Valoare',cell:'Celulă',coordinates:'Coordonate'},
  zh: {appTitle:'BioClima CoverageJSON 查看器',appSubtitle:'用于以 CoverageJSON 编码的观测、指标和分类覆盖的通用目录驱动查看器。',language:'语言',coverage:'覆盖',parameter:'参数',opacity:'不透明度',semanticDescription:'语义描述',semanticUri:'语义 URI',ontologyClass:'本体类型',unit:'单位',buildingBlock:'Building Block',layerSummary:'图层摘要',type:'类型',validCells:'有效单元格',min:'最小值',mean:'平均值',max:'最大值',legend:'图例',hint:'要添加新的观测或指标，请将 CoverageJSON 文件添加到 data/ 并在 data/catalog.json 中注册。查看器将自动检测参数。',categories:'类别',noData:'无数据',value:'值',cell:'单元格',coordinates:'坐标'}
};
const state = { catalog:null, ontology:null, lang:'en', coverage:null, entry:null, map:null, overlay:null, currentValues:null, currentShape:null, currentBounds:null, stats:null };
const els = {
  coverage: document.getElementById('coverageSelect'), parameter: document.getElementById('parameterSelect'), language: document.getElementById('languageSelect'), opacity: document.getElementById('opacity'),
  semanticTitle: document.getElementById('semanticTitle'), semanticDescription: document.getElementById('semanticDescription'), semanticLink: document.getElementById('semanticLink'), ontologyType: document.getElementById('ontologyType'), unitLabel: document.getElementById('unitLabel'), buildingBlock: document.getElementById('buildingBlock'),
  kind: document.getElementById('kind'), validCells: document.getElementById('validCells'), minVal: document.getElementById('minVal'), meanVal: document.getElementById('meanVal'), maxVal: document.getElementById('maxVal'), legend: document.getElementById('legend'), legendMin: document.getElementById('legendMin'), legendMax: document.getElementById('legendMax')
};
function supported(){ return state.catalog?.languagePolicy?.supportedLanguages || state.ontology?.supportedLanguages || Object.keys(UI); }
function detectLang(){ const params=new URLSearchParams(location.search); const q=params.get('lang'); const langs=q?[q]:(navigator.languages||[navigator.language||'en']); const allowed=supported(); for(const l of langs){ const base=String(l||'').toLowerCase().split('-')[0]; if(allowed.includes(base)) return base; } return state.ontology?.defaultLanguage || 'en'; }
function t(key){ return (UI[state.lang]&&UI[state.lang][key]) || UI.en[key] || key; }
function text(obj){ if(!obj) return '—'; if(typeof obj === 'string') return obj; return obj[state.lang] || obj.en || obj.es || Object.values(obj)[0] || '—'; }
function relUrlFromViewer(url){ return '../data/' + url; }
async function fetchJson(url){ const r = await fetch(url); if(!r.ok) throw new Error(`Cannot load ${url}`); return await r.json(); }
function ontologyTerm(uri){ return uri && state.ontology?.terms ? state.ontology.terms[uri] : null; }
function termLabel(uri, fallback){ const term=ontologyTerm(uri); return text(term?.label || fallback); }
function termDefinition(uri, fallback){ const term=ontologyTerm(uri); return text(term?.definition || fallback); }
function unitLabel(unit){ if(!unit) return '—'; if(unit.label) return text(unit.label); if(unit.symbol?.value) return unit.symbol.value; return '—'; }
function applyI18n(){ document.documentElement.lang=state.lang; document.querySelectorAll('[data-i18n]').forEach(el=>{ el.textContent=t(el.dataset.i18n); }); rebuildCoverageOptions(); rebuildParameterOptions(); if(state.coverage) updateLayer(); }
function setupLanguageSelector(){ els.language.innerHTML=''; const names={en:'English',es:'Español',fi:'Suomi',ro:'Română',zh:'中文'}; for(const lang of supported()){ const opt=document.createElement('option'); opt.value=lang; opt.textContent=names[lang]||lang; els.language.appendChild(opt); } state.lang=detectLang(); els.language.value=state.lang; els.language.addEventListener('change',()=>{ state.lang=els.language.value; const u=new URL(location.href); u.searchParams.set('lang',state.lang); history.replaceState(null,'',u); applyI18n(); }); }
function axisValues(axis){ if(axis.values) return axis.values; if(axis.start!==undefined && axis.stop!==undefined && axis.num!==undefined){ const out=[]; const step=(axis.stop-axis.start)/(axis.num-1); for(let i=0;i<axis.num;i++) out.push(axis.start+i*step); return out; } throw new Error('Unsupported axis encoding'); }
function cellStep(vals){ if(vals.length<2) return 0; const diffs=[]; for(let i=1;i<vals.length;i++) diffs.push(Math.abs(Number(vals[i])-Number(vals[i-1]))); diffs.sort((a,b)=>a-b); return diffs[Math.floor(diffs.length/2)]||0; }
function coverageBounds(cov){ const xs=axisValues(cov.domain.axes.x).map(Number); const ys=axisValues(cov.domain.axes.y).map(Number); const dx=cellStep(xs), dy=cellStep(ys); const west=Math.min(...xs)-dx/2, east=Math.max(...xs)+dx/2; const south=Math.min(...ys)-dy/2, north=Math.max(...ys)+dy/2; return [[south, west], [north, east]]; }
function rangeFor(cov, param){ const r=cov.ranges[param]; if(!r) throw new Error(`No range for parameter ${param}`); return r; }
function valuesForRange(r){ return r.values; }
function stats(values){ let n=0, sum=0, min=Infinity, max=-Infinity; for(const v of values){ if(v!==null && v!==undefined && Number.isFinite(Number(v))){ const x=Number(v); n++; sum+=x; if(x<min)min=x; if(x>max)max=x; } } return {n, min:n?min:null, max:n?max:null, mean:n?sum/n:null}; }
function palette(t){ t=Math.max(0,Math.min(1,t)); const stops=[[44,123,182],[171,217,233],[255,255,191],[253,174,97],[215,25,28]]; const scaled=t*(stops.length-1); const i=Math.min(stops.length-2, Math.floor(scaled)); const f=scaled-i; const a=stops[i], b=stops[i+1]; return [Math.round(a[0]+(b[0]-a[0])*f), Math.round(a[1]+(b[1]-a[1])*f), Math.round(a[2]+(b[2]-a[2])*f), 215]; }
function categoricalColor(v){ const colors=[[46,125,50],[124,179,66],[251,192,45],[142,68,173],[84,110,122],[230,126,34]]; if(v===null || v===undefined || !Number.isFinite(Number(v))) return [0,0,0,0]; const idx=(Math.round(Number(v))-1) % colors.length; const c=colors[idx<0?0:idx]; return [c[0],c[1],c[2],215]; }
function renderLegend(min,max,isCategorical){ const ctx=els.legend.getContext('2d'); const w=els.legend.width, h=els.legend.height; const img=ctx.createImageData(w,h); for(let x=0;x<w;x++){ const c=isCategorical?categoricalColor(1+Math.floor(x/(w/4))):palette(x/(w-1)); for(let y=0;y<h;y++){ const i=(y*w+x)*4; img.data[i]=c[0]; img.data[i+1]=c[1]; img.data[i+2]=c[2]; img.data[i+3]=c[3]; } } ctx.putImageData(img,0,0); els.legendMin.textContent = isCategorical ? t('categories') : (min===null?'—':Number(min).toFixed(2)); els.legendMax.textContent = isCategorical ? '' : (max===null?'—':Number(max).toFixed(2)); }
function renderImage(cov, param){ const r=rangeFor(cov,param); const axisNames=r.axisNames || ['y','x']; const shape=r.shape; const yIdx=axisNames.indexOf('y'), xIdx=axisNames.indexOf('x'); if(yIdx<0 || xIdx<0) throw new Error('Only ranges with x/y axes are supported by this viewer'); const rows=shape[yIdx], cols=shape[xIdx]; const values=valuesForRange(r); const st=stats(values); const canvas=document.createElement('canvas'); canvas.width=cols; canvas.height=rows; const ctx=canvas.getContext('2d'); const img=ctx.createImageData(cols,rows); const parameter=cov.parameters[param]||{}; const isCategorical = Boolean(parameter.categories || parameter.categoryEncoding);
  for(let row=0; row<rows; row++){ for(let col=0; col<cols; col++){ const idx=row*cols+col; const v=values[idx]; let c; if(v===null || v===undefined || !Number.isFinite(Number(v))) c=[0,0,0,0]; else if(isCategorical) c=categoricalColor(v); else c=palette((Number(v)-st.min)/(st.max-st.min || 1)); const p=idx*4; img.data[p]=c[0]; img.data[p+1]=c[1]; img.data[p+2]=c[2]; img.data[p+3]=c[3]; } }
  ctx.putImageData(img,0,0); state.currentValues=values; state.currentShape=[rows,cols]; state.stats=st; renderLegend(st.min, st.max, isCategorical); return canvas.toDataURL('image/png'); }
function updateStats(param){ const s=state.stats; els.kind.textContent=state.entry.kind || 'coverage'; els.validCells.textContent=s.n.toLocaleString(); els.minVal.textContent=s.min===null?'—':Number(s.min).toFixed(4); els.meanVal.textContent=s.mean===null?'—':Number(s.mean).toFixed(4); els.maxVal.textContent=s.max===null?'—':Number(s.max).toFixed(4); const p=state.coverage.parameters[param]||{}; const uri=p.observedProperty?.id || state.entry.observedProperty; const term=ontologyTerm(uri); els.semanticTitle.textContent=termLabel(uri, p.observedProperty?.label || param); els.semanticDescription.textContent=termDefinition(uri, p.description || p.observedProperty?.description); els.semanticLink.href=uri || '#'; els.semanticLink.textContent=uri || '—'; els.ontologyType.textContent=term?.type || '—'; els.unitLabel.textContent=unitLabel(p.unit); els.buildingBlock.textContent=state.entry.buildingBlock || '—'; }
function latLngToCell(latlng){ const b=state.currentBounds; const rows=state.currentShape[0], cols=state.currentShape[1]; const south=b[0][0], west=b[0][1], north=b[1][0], east=b[1][1]; if(latlng.lat<south||latlng.lat>north||latlng.lng<west||latlng.lng>east) return null; const col=Math.floor((latlng.lng-west)/(east-west)*cols); const row=Math.floor((north-latlng.lat)/(north-south)*rows); if(row<0||row>=rows||col<0||col>=cols)return null; return {row,col,index:row*cols+col}; }
function popupHtml(latlng){ const cell=latLngToCell(latlng); if(!cell||!state.currentValues)return `<strong>${t('noData')}</strong>`; const param=els.parameter.value; const v=state.currentValues[cell.index]; const p=state.coverage.parameters[param]||{}; const uri=p.observedProperty?.id; return `<table class="popup-table"><tr><th>${t('coverage')}</th><td>${text(state.entry.title)}</td></tr><tr><th>${t('parameter')}</th><td>${termLabel(uri,param)}</td></tr><tr><th>${t('value')}</th><td>${v===null?t('noData'):v}</td></tr><tr><th>${t('cell')}</th><td>row ${cell.row}, col ${cell.col}</td></tr><tr><th>${t('coordinates')}</th><td>${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}</td></tr>${uri?`<tr><th>${t('semanticUri')}</th><td><a href="${uri}" target="_blank">${uri}</a></td></tr>`:''}</table>`; }
function rebuildCoverageOptions(){ if(!state.catalog) return; const old=els.coverage.value; els.coverage.innerHTML=''; for(const entry of state.catalog.coverages){ const opt=document.createElement('option'); opt.value=entry.id; opt.textContent=`[${entry.kind}] ${text(entry.title)}`; els.coverage.appendChild(opt); } if(old) els.coverage.value=old; }
function rebuildParameterOptions(){ if(!state.coverage) return; const old=els.parameter.value; els.parameter.innerHTML=''; for(const key of Object.keys(state.coverage.parameters||{})){ const p=state.coverage.parameters[key]||{}; const uri=p.observedProperty?.id; const opt=document.createElement('option'); opt.value=key; opt.textContent=termLabel(uri, p.observedProperty?.label || key); els.parameter.appendChild(opt); } if(old) els.parameter.value=old; }
async function loadCoverage(entry){ state.entry=entry; state.coverage=await fetchJson(relUrlFromViewer(entry.url)); state.currentBounds=coverageBounds(state.coverage); rebuildParameterOptions(); if(!els.parameter.value) els.parameter.value=Object.keys(state.coverage.ranges||{})[0]; if(!state.map){ state.map=L.map('map',{preferCanvas:true}); L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:12,attribution:'&copy; OpenStreetMap contributors'}).addTo(state.map); state.map.on('click', e=>L.popup().setLatLng(e.latlng).setContent(popupHtml(e.latlng)).openOn(state.map)); }
  state.map.fitBounds(state.currentBounds); updateLayer(); }
function updateLayer(){ if(!state.coverage)return; const param=els.parameter.value; const url=renderImage(state.coverage,param); if(state.overlay) state.map.removeLayer(state.overlay); state.overlay=L.imageOverlay(url,state.currentBounds,{opacity:Number(els.opacity.value),interactive:false}).addTo(state.map); updateStats(param); }
async function init(){ state.catalog=await fetchJson('../data/catalog.json'); state.ontology=await fetchJson(relUrlFromViewer(state.catalog.ontologyIndex || 'ontology-index.json')); setupLanguageSelector(); applyI18n(); els.coverage.addEventListener('change',()=>loadCoverage(state.catalog.coverages.find(e=>e.id===els.coverage.value))); els.parameter.addEventListener('change',updateLayer); els.opacity.addEventListener('input',()=>{ if(state.overlay) state.overlay.setOpacity(Number(els.opacity.value)); }); await loadCoverage(state.catalog.coverages[0]); }
init().catch(err=>{ console.error(err); document.body.insertAdjacentHTML('afterbegin', `<div style="padding:1rem;background:#fdecea;color:#922b21">${err.message}</div>`); });

```

#### html
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BioClima CoverageJSON Viewer</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="topbar">
    <div>
      <h1 data-i18n="appTitle">BioClima CoverageJSON Viewer</h1>
      <p data-i18n="appSubtitle">Generic catalog-driven viewer for observations, indicators and categorical coverages encoded as CoverageJSON.</p>
    </div>
    <div class="language-box">
      <label for="languageSelect" data-i18n="language">Language</label>
      <select id="languageSelect" aria-label="Language"></select>
    </div>
  </header>
  <main class="layout">
    <aside class="panel">
      <label for="coverageSelect" data-i18n="coverage">Coverage</label>
      <select id="coverageSelect"></select>
      <label for="parameterSelect" data-i18n="parameter">Parameter</label>
      <select id="parameterSelect"></select>
      <label for="opacity" data-i18n="opacity">Opacity</label>
      <input id="opacity" type="range" min="0" max="1" value="0.78" step="0.02">
      <section class="card">
        <h2 data-i18n="semanticDescription">Semantic description</h2>
        <p id="semanticTitle" class="semantic-title">—</p>
        <p id="semanticDescription">—</p>
        <dl class="semantic-dl">
          <dt data-i18n="semanticUri">Semantic URI</dt><dd><a id="semanticLink" target="_blank" rel="noopener">—</a></dd>
          <dt data-i18n="ontologyClass">Ontology type</dt><dd id="ontologyType">—</dd>
          <dt data-i18n="unit">Unit</dt><dd id="unitLabel">—</dd>
          <dt data-i18n="buildingBlock">Building Block</dt><dd id="buildingBlock">—</dd>
        </dl>
      </section>
      <section class="card">
        <h2 data-i18n="layerSummary">Layer summary</h2>
        <dl>
          <dt data-i18n="type">Type</dt><dd id="kind">—</dd>
          <dt data-i18n="validCells">Valid cells</dt><dd id="validCells">—</dd>
          <dt data-i18n="min">Min</dt><dd id="minVal">—</dd>
          <dt data-i18n="mean">Mean</dt><dd id="meanVal">—</dd>
          <dt data-i18n="max">Max</dt><dd id="maxVal">—</dd>
        </dl>
      </section>
      <section class="card">
        <h2 data-i18n="legend">Legend</h2>
        <canvas id="legend" width="260" height="20"></canvas>
        <div class="legend-labels"><span id="legendMin">—</span><span id="legendMax">—</span></div>
      </section>
      <p class="hint" data-i18n="hint">To add a new observation or indicator, add its CoverageJSON file to data/ and register it in data/catalog.json. The viewer will detect the parameters automatically.</p>
    </aside>
    <section id="map" aria-label="CoverageJSON map"></section>
  </main>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="app.js"></script>
</body>
</html>

```

#### jsonld
```jsonld
{
  "@context": [
    "https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/semantic-coveragejson-viewer/context.jsonld",
    {
      "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
      "prov": "http://www.w3.org/ns/prov#",
      "dct": "http://purl.org/dc/terms/"
    }
  ],
  "@id": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#SemanticCoverageJSONViewer",
  "@type": [
    "ebv:SemanticCoverageJSONViewer",
    "prov:SoftwareAgent"
  ],
  "title": {
    "en": "Semantic CoverageJSON map viewer",
    "es": "Visor cartogr\u00e1fico sem\u00e1ntico de CoverageJSON",
    "fi": "Semanttinen CoverageJSON-karttakatselin"
  },
  "description": {
    "en": "The viewer loads data/catalog.json, reads CoverageJSON parameters, resolves observedProperty.id against data/ontology-index.json and selects the interface language from the browser locale with manual override.",
    "es": "El visor carga data/catalog.json, lee los par\u00e1metros CoverageJSON, resuelve observedProperty.id contra data/ontology-index.json y selecciona el idioma de la interfaz a partir del idioma del navegador con opci\u00f3n de cambio manual.",
    "fi": "Katselin lataa data/catalog.json-tiedoston, lukee CoverageJSON-parametrit, yhdist\u00e4\u00e4 observedProperty.id-arvon data/ontology-index.json-tiedostoon ja valitsee k\u00e4ytt\u00f6liittym\u00e4n kielen selaimen kieliasetuksen perusteella manuaalisella ohituksella."
  },
  "usesOntology": "data/ontology-index.json",
  "input": [
    "data/catalog.json",
    "CoverageJSON files"
  ],
  "output": [
    "interactive map layer",
    "multilingual semantic description"
  ],
  "implementedBy": {
    "language": "javascript/html/css",
    "path": "viewer/",
    "role": "browser application"
  }
}
```

#### ttl
```ttl
@prefix dct: <http://purl.org/dc/terms/> .
@prefix ebv: <https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#> .
@prefix prov: <http://www.w3.org/ns/prov#> .

ebv:SemanticCoverageJSONViewer a prov:SoftwareAgent,
        ebv:SemanticCoverageJSONViewer ;
    dct:description [ ] ;
    dct:title [ ] ;
    ebv:implementedBy [ dct:format "javascript/html/css" ;
            dct:identifier "viewer/" ;
            dct:type "browser application" ] ;
    ebv:input "CoverageJSON files",
        "data/catalog.json" ;
    ebv:output "interactive map layer",
        "multilingual semantic description" ;
    ebv:usesOntology "data/ontology-index.json" .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: Semantic process or software component definition encoded as JSON-LD.
type: object
required:
- '@context'
- '@id'
- '@type'
- title
- implementedBy
properties:
  '@context': {}
  '@id':
    type: string
  '@type': {}
  title:
    x-jsonld-id: http://purl.org/dc/terms/title
  description:
    x-jsonld-id: http://purl.org/dc/terms/description
  usesOntology:
    type: string
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#usesOntology
  input:
    type: array
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#input
  output:
    type: array
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#output
  implementedBy:
    type: object
    required:
    - language
    - path
    properties:
      language:
        type: string
        x-jsonld-id: http://purl.org/dc/terms/format
      path:
        type: string
        x-jsonld-id: http://purl.org/dc/terms/identifier
      role:
        type: string
        x-jsonld-id: http://purl.org/dc/terms/type
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#implementedBy
  method:
    type: string
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#method
  provenance:
    type: string
    x-jsonld-id: http://www.w3.org/ns/prov#wasGeneratedBy
additionalProperties: true
x-jsonld-prefixes:
  dct: http://purl.org/dc/terms/
  ebv: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#
  prov: http://www.w3.org/ns/prov#

```

Links to the schema:

* YAML version: [schema.yaml](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/semantic-coveragejson-viewer/schema.json)
* JSON version: [schema.json](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/semantic-coveragejson-viewer/schema.yaml)


# JSON-LD Context

```jsonld
{
  "@context": {
    "title": "dct:title",
    "description": "dct:description",
    "usesOntology": "ebv:usesOntology",
    "input": "ebv:input",
    "output": "ebv:output",
    "implementedBy": {
      "@context": {
        "language": "dct:format",
        "path": "dct:identifier",
        "role": "dct:type"
      },
      "@id": "ebv:implementedBy"
    },
    "method": "ebv:method",
    "provenance": "prov:wasGeneratedBy",
    "dct": "http://purl.org/dc/terms/",
    "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
    "prov": "http://www.w3.org/ns/prov#",
    "@version": 1.1
  }
}
```

You can find the full JSON-LD context here:
[context.jsonld](https://maytetoscano.github.io/bioclima/build/annotated/ebv/phenology/semantic-coveragejson-viewer/context.jsonld)

## Sources

* [W3C PROV](https://www.w3.org/TR/prov-o/)
* [CoverageJSON](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/MayteToscano/bioclima](https://github.com/MayteToscano/bioclima)
* Path: `_sources/semantic-coveragejson-viewer`

