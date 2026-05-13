/* BioClima CoverageJSON Semantic Viewer
 *
 * Generic CoverageJSON viewer driven by:
 * - ../data/catalog.json
 * - ../data/ontology-index.json
 *
 * Main behaviour:
 * - Loads observations, indicators and categorical coverages from the catalogue.
 * - Detects CoverageJSON parameters dynamically.
 * - Paints Grid CoverageJSON values as a raster overlay on Leaflet.
 * - Resolves observedProperty.id against ontology-index.json.
 * - Shows value + semantic definition when clicking a map cell.
 * - Opens a local readable ontology term page through viewer/ontology.html.
 */

const CONFIG = {
  catalogUrl: "data/catalog.json",
  ontologyUrl: "data/ontology-index.json",
  defaultMapCenter: [64.8, 26.0],
  defaultZoom: 5,
  noDataValues: [-32768, -9999, -99999],
  supportedLanguages: [
    { code: "es", label: "Español" },
    { code: "en", label: "English" },
    { code: "fi", label: "Suomi" },
    { code: "ro", label: "Română" },
    { code: "zh", label: "中文" }
  ]
};

const I18N = {
  es: {
    appTitle: "BioClima CoverageJSON Viewer",
    appSubtitle: "Visor genérico basado en catálogo para observaciones, indicadores y coberturas categóricas codificadas como CoverageJSON.",
    language: "Idioma",
    coverage: "Cobertura",
    parameter: "Parámetro",
    opacity: "Opacidad",
    time: "Tiempo",
    play: "Reproducir",
    pause: "Pausar",
    semanticDescription: "Descripción semántica",
    semanticUri: "URI semántica",
    ontologyClass: "Tipo ontológico",
    unit: "Unidad",
    buildingBlock: "Building Block",
    layerSummary: "Resumen de la capa",
    type: "Tipo",
    validCells: "Celdas válidas",
    min: "Mínimo",
    mean: "Media",
    max: "Máximo",
    legend: "Leyenda",
    value: "Valor",
    cell: "Celda",
    coordinates: "Coordenadas",
    definition: "Definición",
    ontologyType: "Tipo ontológico",
    openOntology: "Abrir definición en la ontología",
    noData: "Sin datos",
    notAvailable: "No disponible",
    loading: "Cargando...",
    error: "Error",
    hint: "Para añadir una nueva observación o indicador, añade su archivo CoverageJSON a data/ y regístralo en data/catalog.json. El visor detectará los parámetros automáticamente."
  },
  en: {
    appTitle: "BioClima CoverageJSON Viewer",
    appSubtitle: "Generic catalogue-based viewer for observations, indicators and categorical coverages encoded as CoverageJSON.",
    language: "Language",
    coverage: "Coverage",
    parameter: "Parameter",
    opacity: "Opacity",
    time: "Time",
    play: "Play",
    pause: "Pause",
    semanticDescription: "Semantic description",
    semanticUri: "Semantic URI",
    ontologyClass: "Ontology type",
    unit: "Unit",
    buildingBlock: "Building Block",
    layerSummary: "Layer summary",
    type: "Type",
    validCells: "Valid cells",
    min: "Minimum",
    mean: "Mean",
    max: "Maximum",
    legend: "Legend",
    value: "Value",
    cell: "Cell",
    coordinates: "Coordinates",
    definition: "Definition",
    ontologyType: "Ontology type",
    openOntology: "Open definition in ontology",
    noData: "No data",
    notAvailable: "Not available",
    loading: "Loading...",
    error: "Error",
    hint: "To add a new observation or indicator, add its CoverageJSON file to data/ and register it in data/catalog.json. The viewer will detect the parameters automatically."
  },
  fi: {
    appTitle: "BioClima CoverageJSON -karttakatselin",
    appSubtitle: "Luettelopohjainen katselin CoverageJSON-muotoisille havainnoille, indikaattoreille ja luokitelluille kattavuuksille.",
    language: "Kieli",
    coverage: "Kattavuus",
    parameter: "Parametri",
    opacity: "Peittävyys",
    time: "Aika",
    play: "Toista",
    pause: "Tauko",
    semanticDescription: "Semanttinen kuvaus",
    semanticUri: "Semanttinen URI",
    ontologyClass: "Ontologinen tyyppi",
    unit: "Yksikkö",
    buildingBlock: "Building Block",
    layerSummary: "Tason yhteenveto",
    type: "Tyyppi",
    validCells: "Kelvolliset solut",
    min: "Minimi",
    mean: "Keskiarvo",
    max: "Maksimi",
    legend: "Selite",
    value: "Arvo",
    cell: "Solu",
    coordinates: "Koordinaatit",
    definition: "Määritelmä",
    ontologyType: "Ontologinen tyyppi",
    openOntology: "Avaa määritelmä ontologiassa",
    noData: "Ei tietoja",
    notAvailable: "Ei saatavilla",
    loading: "Ladataan...",
    error: "Virhe",
    hint: "Lisää uusi havainto tai indikaattori lisäämällä CoverageJSON-tiedosto data/-kansioon ja rekisteröimällä se data/catalog.json-tiedostoon."
  },
  ro: {
    appTitle: "Vizualizator CoverageJSON BioClima",
    appSubtitle: "Vizualizator generic bazat pe catalog pentru observații, indicatori și acoperiri categorice codificate ca CoverageJSON.",
    language: "Limbă",
    coverage: "Acoperire",
    parameter: "Parametru",
    opacity: "Opacitate",
    time: "Timp",
    play: "Redare",
    pause: "Pauză",
    semanticDescription: "Descriere semantică",
    semanticUri: "URI semantic",
    ontologyClass: "Tip ontologic",
    unit: "Unitate",
    buildingBlock: "Building Block",
    layerSummary: "Rezumatul stratului",
    type: "Tip",
    validCells: "Celule valide",
    min: "Minim",
    mean: "Medie",
    max: "Maxim",
    legend: "Legendă",
    value: "Valoare",
    cell: "Celulă",
    coordinates: "Coordonate",
    definition: "Definiție",
    ontologyType: "Tip ontologic",
    openOntology: "Deschide definiția în ontologie",
    noData: "Fără date",
    notAvailable: "Nu este disponibil",
    loading: "Se încarcă...",
    error: "Eroare",
    hint: "Pentru a adăuga o observație sau un indicator nou, adăugați fișierul CoverageJSON în data/ și înregistrați-l în data/catalog.json."
  },
  zh: {
    appTitle: "BioClima CoverageJSON 查看器",
    appSubtitle: "基于目录的通用查看器，用于以 CoverageJSON 编码的观测、指标和分类覆盖数据。",
    language: "语言",
    coverage: "覆盖数据",
    parameter: "参数",
    opacity: "透明度",
    time: "时间",
    play: "播放",
    pause: "暂停",
    semanticDescription: "语义描述",
    semanticUri: "语义 URI",
    ontologyClass: "本体类型",
    unit: "单位",
    buildingBlock: "Building Block",
    layerSummary: "图层摘要",
    type: "类型",
    validCells: "有效像元",
    min: "最小值",
    mean: "平均值",
    max: "最大值",
    legend: "图例",
    value: "值",
    cell: "像元",
    coordinates: "坐标",
    definition: "定义",
    ontologyType: "本体类型",
    openOntology: "在本体中打开定义",
    noData: "无数据",
    notAvailable: "不可用",
    loading: "加载中...",
    error: "错误",
    hint: "要添加新的观测或指标，请将 CoverageJSON 文件添加到 data/，并在 data/catalog.json 中注册。查看器会自动检测参数。"
  }
};

const state = {
  lang: detectInitialLanguage(),
  catalog: null,
  ontology: null,
  entry: null,
  coverage: null,
  currentParameterId: null,
  currentValues: null,
  currentStats: null,
  axes: null,
  temporal: { hasTime: false, values: [], count: 1 },
  currentTimeIndex: initialTimeIndex(),
  playTimer: null,
  map: null,
  imageLayer: null
};

const els = {};

/*
 * Local aliases used only when a CoverageJSON parameter uses a short internal key
 * while the ontology index uses a more explicit term name.
 * The viewer still gives priority to observedProperty.id when present.
 */
const ONTOLOGY_ALIASES = {
  vap_doy: ["vap_doy", "sos_doy", "start_of_vap"],
  sos_doy: ["sos_doy", "vap_doy", "start_of_season"],
  eos_doy: ["eos_doy", "end_of_season"],
  los_doy: ["los_doy", "length_of_season"],
  trend: ["phenological_trend", "trend"],
  anomaly: ["phenological_anomaly", "anomaly"],
  changepoint_year: ["changepoint_year", "change_point_year"],
  changepoint_pvalue: ["changepoint_pvalue", "change_point_pvalue", "pettitt_pvalue"],
  bioclimatic_zone: ["bioclimatic_zone", "finland_bioclimatic_zone"]
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  cacheElements();
  setupLanguageSelect();
  applyTranslations();
  initMap();

  try {
    const [catalog, ontology] = await Promise.all([
      loadJson(CONFIG.catalogUrl),
      loadJson(CONFIG.ontologyUrl)
    ]);

    state.catalog = normalizeCatalog(catalog);
    state.ontology = normalizeOntology(ontology);

    rebuildCoverageOptions();

    const requestedCoverage = new URLSearchParams(window.location.search).get("coverage");
    if (requestedCoverage) {
      const match = state.catalog.coverages.find(
        (item) => item.id === requestedCoverage || item.url === requestedCoverage
      );
      if (match) {
        els.coverageSelect.value = match.id;
      }
    }

    await loadSelectedCoverage();
  } catch (error) {
    showFatalError(error);
  }

  els.languageSelect.addEventListener("change", async () => {
    stopPlayback();
    state.lang = els.languageSelect.value;
    document.documentElement.lang = state.lang;
    applyTranslations();
    rebuildCoverageOptions();

    if (state.entry) {
      els.coverageSelect.value = state.entry.id;
    }

    if (state.coverage) {
      rebuildParameterOptions();

      if (state.currentParameterId && state.coverage.parameters?.[state.currentParameterId]) {
        els.parameterSelect.value = state.currentParameterId;
      }

      await updateSelectedParameter();
    }
  });

  els.coverageSelect.addEventListener("change", () => {
    stopPlayback();
    state.currentTimeIndex = 0;
    loadSelectedCoverage();
  });

  els.parameterSelect.addEventListener("change", () => {
    stopPlayback();
    state.currentTimeIndex = 0;
    updateSelectedParameter();
  });

  els.timeSlider.addEventListener("input", () => {
    stopPlayback();
    state.currentTimeIndex = Number(els.timeSlider.value);
    updateSelectedParameter(false);
  });

  els.timeSelect.addEventListener("change", () => {
    stopPlayback();
    state.currentTimeIndex = Number(els.timeSelect.value);
    updateSelectedParameter(false);
  });

  els.playButton.addEventListener("click", togglePlayback);

  els.opacity.addEventListener("input", () => {
    if (state.imageLayer) {
      state.imageLayer.setOpacity(Number(els.opacity.value));
    }
  });

  state.map.on("click", (event) => {
    if (!state.currentValues || !state.axes) {
      return;
    }

    L.popup({ maxWidth: 560 })
      .setLatLng(event.latlng)
      .setContent(popupHtml(event.latlng))
      .openOn(state.map);
  });
}

function cacheElements() {
  els.languageSelect = document.getElementById("languageSelect");
  els.coverageSelect = document.getElementById("coverageSelect");
  els.parameterSelect = document.getElementById("parameterSelect");
  els.timeControls = document.getElementById("timeControls");
  els.timeSlider = document.getElementById("timeSlider");
  els.timeSelect = document.getElementById("timeSelect");
  els.timeLabel = document.getElementById("timeLabel");
  els.playButton = document.getElementById("playButton");
  els.opacity = document.getElementById("opacity");

  els.semanticTitle = document.getElementById("semanticTitle");
  els.semanticDescription = document.getElementById("semanticDescriptionText");
  els.semanticLink = document.getElementById("semanticLink");
  els.ontologyType = document.getElementById("ontologyType");
  els.unitLabel = document.getElementById("unitLabel");
  els.buildingBlock = document.getElementById("buildingBlock");

  els.kind = document.getElementById("kind");
  els.validCells = document.getElementById("validCells");
  els.minVal = document.getElementById("minVal");
  els.meanVal = document.getElementById("meanVal");
  els.maxVal = document.getElementById("maxVal");

  els.legend = document.getElementById("legend");
  els.legendMin = document.getElementById("legendMin");
  els.legendMax = document.getElementById("legendMax");
}

function setupLanguageSelect() {
  els.languageSelect.innerHTML = "";

  for (const lang of CONFIG.supportedLanguages) {
    const option = document.createElement("option");
    option.value = lang.code;
    option.textContent = lang.label;
    els.languageSelect.appendChild(option);
  }

  els.languageSelect.value = state.lang;
  document.documentElement.lang = state.lang;
}

function initMap() {
  state.map = L.map("map", { preferCanvas: true }).setView(
    CONFIG.defaultMapCenter,
    CONFIG.defaultZoom
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(state.map);
}

function initialTimeIndex() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("timeIndex") || params.get("t");

  const parsed = Number(raw);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
}

function detectInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang");

  if (urlLang && I18N[urlLang]) {
    return urlLang;
  }

  const browserLanguages = navigator.languages || [navigator.language || "en"];

  for (const language of browserLanguages) {
    const short = String(language).split("-")[0].toLowerCase();
    if (I18N[short]) {
      return short;
    }
  }

  return "en";
}

function t(key) {
  return I18N[state.lang]?.[key] || I18N.en[key] || key;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    node.textContent = t(key);
  });
}

async function loadJson(url) {
  const candidates = resolveUrlCandidates(url);
  let lastError = null;

  for (const resolved of candidates) {
    try {
      const response = await fetch(resolved, { cache: "no-cache" });

      if (response.ok) {
        return response.json();
      }

      lastError = new Error(`Cannot load ${resolved}: ${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error(`Cannot load ${url}`);
}

function resolveUrl(url) {
  return resolveUrlCandidates(url)[0];
}

function resolveUrlCandidates(url) {
  if (!url) return [url];

  if (/^https?:\/\//i.test(url)) {
    return [url];
  }

  const candidates = [];
  const add = (candidate) => {
    if (candidate && !candidates.includes(candidate)) {
      candidates.push(candidate);
    }
  };

  const path = window.location.pathname;
  const viewerIndex = path.indexOf("/viewer/");
  const repoBase = viewerIndex >= 0 ? path.slice(0, viewerIndex) : path.replace(/\/[^/]*$/, "");
  const origin = window.location.origin;

  const clean = String(url).replace(/^\.?\//, "");

  if (clean.startsWith("data/")) {
    add(`${repoBase}/${clean}`);
    add(`../${clean}`);
    add(`./${clean}`);
    add(`/${clean}`);
    add(clean);
  } else if (
    clean.startsWith("observations/") ||
    clean.startsWith("indicators/") ||
    clean.startsWith("categorical/") ||
    clean.startsWith("methods/") ||
    clean.startsWith("provenance/")
  ) {
    add(`${repoBase}/data/${clean}`);
    add(`../data/${clean}`);
    add(`./data/${clean}`);
    add(`/data/${clean}`);
    add(clean);
  } else if (url.startsWith("../") || url.startsWith("./") || url.startsWith("/")) {
    add(url);
  } else {
    add(`${repoBase}/${clean}`);
    add(clean);
  }

  return candidates;
}


function normalizeCatalog(catalog) {
  const coverages = catalog.coverages || catalog.datasets || catalog.items || [];

  return {
    ...catalog,
    coverages: coverages.map((item, index) => ({
      id: item.id || item.name || `coverage-${index + 1}`,
      kind: item.kind || item.type || "coverage",
      title: item.title || item.label || item.name || item.id || `Coverage ${index + 1}`,
      description: item.description || item.abstract || "",
      url: item.url || item.href || item.path,
      buildingBlock: item.buildingBlock || item.bblock || item.block || "",
      ...item
    }))
  };
}

function normalizeOntology(ontology) {
  if (!ontology) {
    return { terms: {} };
  }

  if (ontology.terms && !Array.isArray(ontology.terms)) {
    return ontology;
  }

  if (Array.isArray(ontology.terms)) {
    const terms = {};
    ontology.terms.forEach((term) => {
      const id = term.id || term.uri || term["@id"];
      if (id) terms[id] = term;
    });
    return { ...ontology, terms };
  }

  if (Array.isArray(ontology)) {
    const terms = {};
    ontology.forEach((term) => {
      const id = term.id || term.uri || term["@id"];
      if (id) terms[id] = term;
    });
    return { terms };
  }

  return { terms: ontology };
}

function rebuildCoverageOptions() {
  els.coverageSelect.innerHTML = "";

  for (const entry of state.catalog.coverages) {
    const option = document.createElement("option");
    option.value = entry.id;
    option.textContent = `[${entry.kind}] ${text(entry.title)}`;
    els.coverageSelect.appendChild(option);
  }
}

async function loadSelectedCoverage() {
  const selectedId = els.coverageSelect.value;
  const entry = state.catalog.coverages.find((item) => item.id === selectedId);

  if (!entry) return;

  state.entry = entry;
  state.coverage = await loadJson(entry.url);

  rebuildParameterOptions();

  const requestedParameter = new URLSearchParams(window.location.search).get("parameter");
  if (requestedParameter && state.coverage.parameters?.[requestedParameter]) {
    els.parameterSelect.value = requestedParameter;
  }

  await updateSelectedParameter();
}

function rebuildParameterOptions() {
  els.parameterSelect.innerHTML = "";

  const parameters = state.coverage.parameters || {};

  Object.keys(parameters).forEach((parameterId) => {
    const parameter = parameters[parameterId];
    const option = document.createElement("option");

    option.value = parameterId;
    option.textContent = parameterDisplayLabel(parameterId, parameter);

    els.parameterSelect.appendChild(option);
  });
}

async function updateSelectedParameter(fitMap = true) {
  const parameterId = els.parameterSelect.value;

  if (!parameterId) return;

  state.currentParameterId = parameterId;

  const temporal = getTemporalInfo(state.coverage, parameterId);
  state.temporal = temporal;

  if (state.currentTimeIndex >= temporal.count) {
    state.currentTimeIndex = Math.max(0, temporal.count - 1);
  }

  configureTimeControls(temporal);

  const extracted = extractCoverageValues(state.coverage, parameterId, state.currentTimeIndex);
  state.currentValues = extracted.values;
  state.axes = extracted.axes;
  state.currentStats = computeStats(extracted.values);

  updateSemanticPanel(parameterId);
  updateSummaryPanel();
  updateLegend();
  renderRasterLayer(fitMap);
  updateUrlParams();
}

function updateUrlParams() {
  const params = new URLSearchParams(window.location.search);

  if (state.entry?.id) params.set("coverage", state.entry.id);
  if (state.currentParameterId) params.set("parameter", state.currentParameterId);

  if (state.temporal?.hasTime) {
    params.set("timeIndex", String(state.currentTimeIndex));
  } else {
    params.delete("timeIndex");
    params.delete("t");
  }

  params.set("lang", state.lang);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, "", newUrl);
}

function getTemporalInfo(coverage, parameterId) {
  const range = coverage.ranges?.[parameterId];
  const domainAxes = coverage.domain?.axes || {};
  const xValues = axisValues(domainAxes.x);
  const yValues = axisValues(domainAxes.y);
  const nx = xValues.length;
  const ny = yValues.length;

  if (!range) {
    return { hasTime: false, values: [], count: 1 };
  }

  const shape = range.shape || inferShape(range, nx, ny);
  const axisNames = range.axisNames || inferAxisNames(coverage, shape);
  const tAxisIndex = axisNames.indexOf("t");

  if (tAxisIndex < 0) {
    return { hasTime: false, values: [], count: 1 };
  }

  const count = shape[tAxisIndex] || axisRawValues(domainAxes.t).length || 1;
  let values = axisRawValues(domainAxes.t);

  if (!values.length || values.length !== count) {
    values = Array.from({ length: count }, (_, index) => index);
  }

  return {
    hasTime: count > 1,
    values,
    count,
    axisIndex: tAxisIndex
  };
}

function configureTimeControls(temporal) {
  if (!temporal?.hasTime) {
    els.timeControls.hidden = true;
    els.playButton.textContent = t("play");
    return;
  }

  els.timeControls.hidden = false;

  els.timeSlider.min = "0";
  els.timeSlider.max = String(temporal.count - 1);
  els.timeSlider.step = "1";
  els.timeSlider.value = String(state.currentTimeIndex);

  els.timeSelect.innerHTML = "";
  temporal.values.forEach((value, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = timeStepLabel(value, index);
    els.timeSelect.appendChild(option);
  });

  els.timeSelect.value = String(state.currentTimeIndex);
  els.timeLabel.textContent = timeStepLabel(temporal.values[state.currentTimeIndex], state.currentTimeIndex);
  els.playButton.textContent = state.playTimer ? t("pause") : t("play");
}

function togglePlayback() {
  if (!state.temporal?.hasTime) return;

  if (state.playTimer) {
    stopPlayback();
    return;
  }

  els.playButton.textContent = t("pause");

  state.playTimer = window.setInterval(() => {
    state.currentTimeIndex = (state.currentTimeIndex + 1) % state.temporal.count;
    updateSelectedParameter(false);
  }, 850);
}

function stopPlayback() {
  if (state.playTimer) {
    window.clearInterval(state.playTimer);
    state.playTimer = null;
  }

  if (els.playButton) {
    els.playButton.textContent = t("play");
  }
}

function timeStepLabel(value, index) {
  if (value === null || value === undefined || value === "") {
    return `t=${index}`;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  const textValue = String(value);

  const yearMatch = textValue.match(/^\d{4}/);
  if (yearMatch) {
    return yearMatch[0];
  }

  return textValue;
}

function axisRawValues(axis) {
  if (!axis) return [];

  if (Array.isArray(axis.values)) {
    return axis.values;
  }

  if (
    typeof axis.start === "number" &&
    typeof axis.stop === "number" &&
    typeof axis.num === "number"
  ) {
    const values = [];
    const step = axis.num === 1 ? 0 : (axis.stop - axis.start) / (axis.num - 1);

    for (let i = 0; i < axis.num; i += 1) {
      values.push(axis.start + i * step);
    }

    return values;
  }

  return [];
}

function parameterDisplayLabel(parameterId, parameter) {
  const semantic = semanticInfoForParameter(parameterId, parameter);

  return (
    text(semantic.term?.label) ||
    text(parameter?.observedProperty?.label) ||
    text(parameter?.label) ||
    parameterId
  );
}

function updateSemanticPanel(parameterId) {
  const parameter = state.coverage.parameters?.[parameterId] || {};
  const semantic = semanticInfoForParameter(parameterId, parameter);

  const title =
    text(semantic.term?.label) ||
    text(parameter.observedProperty?.label) ||
    text(parameter.label) ||
    parameterId;

  const definition =
    text(semantic.term?.definition) ||
    text(semantic.term?.description) ||
    text(parameter.observedProperty?.description) ||
    text(parameter.description) ||
    t("notAvailable");

  if (semantic.href) {
    // The attribute name itself is the ontology link.
    els.semanticTitle.innerHTML = `<a class="attribute-name-link" href="${escapeHtml(semantic.href)}" target="_blank" rel="noopener" title="${escapeHtml(semantic.uri || parameterId)}">${escapeHtml(title)} <span aria-hidden="true">↗</span></a>`;

    // The URI row is only the identifier, not the main action.
    els.semanticLink.removeAttribute("href");
    els.semanticLink.textContent = semantic.uri || parameterId;
    els.semanticLink.title = semantic.uri || parameterId;
  } else {
    els.semanticTitle.textContent = title;
    els.semanticLink.removeAttribute("href");
    els.semanticLink.textContent = "—";
  }

  els.semanticDescription.textContent = definition;
  els.ontologyType.textContent = semantic.term?.type || semantic.term?.["@type"] || "—";
  els.unitLabel.textContent = unitLabel(parameter.unit);
  els.buildingBlock.textContent =
    semantic.term?.buildingBlock ||
    parameter.buildingBlock ||
    state.entry?.buildingBlock ||
    "—";
}

function updateSummaryPanel() {
  const stats = state.currentStats || {};

  els.kind.textContent = state.entry?.kind || "coverage";
  els.validCells.textContent = stats.count ?? "—";
  els.minVal.textContent = formatNumber(stats.min);
  els.meanVal.textContent = formatNumber(stats.mean);
  els.maxVal.textContent = formatNumber(stats.max);
}

function updateLegend() {
  const canvas = els.legend;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const stats = state.currentStats;

  if (!stats || stats.count === 0) {
    els.legendMin.textContent = "—";
    els.legendMax.textContent = "—";
    return;
  }

  if (isCategoricalLayer()) {
    drawCategoricalLegend(ctx, width, height);
    els.legendMin.textContent = "";
    els.legendMax.textContent = "";
    return;
  }

  for (let x = 0; x < width; x += 1) {
    const ratio = x / Math.max(1, width - 1);
    ctx.fillStyle = colorRamp(ratio);
    ctx.fillRect(x, 0, 1, height);
  }

  els.legendMin.textContent = formatNumber(stats.min);
  els.legendMax.textContent = formatNumber(stats.max);
}

function drawCategoricalLegend(ctx, width, height) {
  const values = uniqueValidValues(state.currentValues).slice(0, 20);
  if (!values.length) return;

  const swatchWidth = width / values.length;

  values.forEach((value, index) => {
    ctx.fillStyle = categoricalColor(value);
    ctx.fillRect(index * swatchWidth, 0, swatchWidth, height);
  });
}

function renderRasterLayer(fitMap = true) {
  if (state.imageLayer) {
    state.map.removeLayer(state.imageLayer);
    state.imageLayer = null;
  }

  if (!state.currentValues || !state.axes) return;

  const { xValues, yValues, nx, ny } = state.axes;
  const stats = state.currentStats;

  if (!stats || stats.count === 0) return;

  const canvas = document.createElement("canvas");
  canvas.width = nx;
  canvas.height = ny;

  const ctx = canvas.getContext("2d");
  const image = ctx.createImageData(nx, ny);

  const yAscending = yValues[0] < yValues[yValues.length - 1];

  for (let row = 0; row < ny; row += 1) {
    for (let col = 0; col < nx; col += 1) {
      const sourceIndex = row * nx + col;
      const value = state.currentValues[sourceIndex];

      const targetRow = yAscending ? ny - 1 - row : row;
      const targetIndex = (targetRow * nx + col) * 4;

      if (!isValidValue(value)) {
        image.data[targetIndex + 0] = 0;
        image.data[targetIndex + 1] = 0;
        image.data[targetIndex + 2] = 0;
        image.data[targetIndex + 3] = 0;
        continue;
      }

      const color = isCategoricalLayer()
        ? parseCssColor(categoricalColor(value))
        : parseCssColor(colorForValue(value, stats.min, stats.max));

      image.data[targetIndex + 0] = color.r;
      image.data[targetIndex + 1] = color.g;
      image.data[targetIndex + 2] = color.b;
      image.data[targetIndex + 3] = Math.round(255 * Number(els.opacity.value));
    }
  }

  ctx.putImageData(image, 0, 0);

  const bounds = [
    [Math.min(...yValues), Math.min(...xValues)],
    [Math.max(...yValues), Math.max(...xValues)]
  ];

  state.imageLayer = L.imageOverlay(canvas.toDataURL("image/png"), bounds, {
    opacity: Number(els.opacity.value),
    interactive: true
  }).addTo(state.map);

  if (fitMap) {
    state.map.fitBounds(bounds, { padding: [20, 20] });
  }
}

function extractCoverageValues(coverage, parameterId, timeIndex = 0) {
  const range = coverage.ranges?.[parameterId];

  if (!range) {
    throw new Error(`Range not found for parameter: ${parameterId}`);
  }

  const domainAxes = coverage.domain?.axes || {};
  const xValues = axisValues(domainAxes.x);
  const yValues = axisValues(domainAxes.y);

  const nx = xValues.length;
  const ny = yValues.length;

  const rawValues = range.values || [];
  const shape = range.shape || inferShape(range, nx, ny);
  const axisNames = range.axisNames || inferAxisNames(coverage, shape);

  const xAxisIndex = axisNames.indexOf("x");
  const yAxisIndex = axisNames.indexOf("y");
  const tAxisIndex = axisNames.indexOf("t");

  if (xAxisIndex < 0 || yAxisIndex < 0) {
    throw new Error(`Range ${parameterId} does not expose x/y axes`);
  }

  const safeTimeIndex =
    tAxisIndex >= 0
      ? Math.max(0, Math.min(Number(timeIndex) || 0, (shape[tAxisIndex] || 1) - 1))
      : 0;

  const values = new Array(nx * ny);

  for (let row = 0; row < ny; row += 1) {
    for (let col = 0; col < nx; col += 1) {
      const indices = new Array(shape.length).fill(0);
      indices[xAxisIndex] = col;
      indices[yAxisIndex] = row;

      if (tAxisIndex >= 0) {
        indices[tAxisIndex] = safeTimeIndex;
      }

      const flatIndex = flattenIndex(indices, shape);
      values[row * nx + col] = normalizeValue(rawValues[flatIndex]);
    }
  }

  return {
    values,
    axes: {
      xValues,
      yValues,
      nx,
      ny,
      axisNames,
      shape,
      tValues: axisRawValues(coverage.domain?.axes?.t),
      timeIndex: safeTimeIndex
    }
  };
}

function axisValues(axis) {
  if (!axis) return [];

  if (Array.isArray(axis.values)) {
    return axis.values.map(Number);
  }

  if (
    typeof axis.start === "number" &&
    typeof axis.stop === "number" &&
    typeof axis.num === "number"
  ) {
    const values = [];
    const step = axis.num === 1 ? 0 : (axis.stop - axis.start) / (axis.num - 1);

    for (let i = 0; i < axis.num; i += 1) {
      values.push(axis.start + i * step);
    }

    return values;
  }

  return [];
}

function inferShape(range, nx, ny) {
  if (range.shape) return range.shape;

  const total = range.values?.length || 0;

  if (total === nx * ny) {
    return [ny, nx];
  }

  if (nx > 0 && ny > 0 && total % (nx * ny) === 0) {
    return [total / (nx * ny), ny, nx];
  }

  return [ny, nx];
}

function inferAxisNames(coverage, shape) {
  const domainAxisNames = Object.keys(coverage.domain?.axes || {});

  if (domainAxisNames.length === shape.length) {
    return domainAxisNames;
  }

  if (shape.length === 2) {
    return ["y", "x"];
  }

  if (shape.length === 3) {
    return ["t", "y", "x"];
  }

  return domainAxisNames;
}

function flattenIndex(indices, shape) {
  let offset = 0;
  let stride = 1;

  for (let i = shape.length - 1; i >= 0; i -= 1) {
    offset += indices[i] * stride;
    stride *= shape[i];
  }

  return offset;
}

function normalizeValue(value) {
  if (value === null || value === undefined) return null;

  const numeric = Number(value);

  if (!Number.isFinite(numeric)) return null;
  if (CONFIG.noDataValues.includes(numeric)) return null;

  return numeric;
}

function computeStats(values) {
  const valid = values.filter(isValidValue);

  if (!valid.length) {
    return { count: 0, min: null, max: null, mean: null };
  }

  const sum = valid.reduce((acc, value) => acc + value, 0);

  return {
    count: valid.length,
    min: Math.min(...valid),
    max: Math.max(...valid),
    mean: sum / valid.length
  };
}

function isValidValue(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function formatNumber(value) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) {
    return "—";
  }

  const numeric = Number(value);

  if (Math.abs(numeric) >= 1000) return numeric.toFixed(0);
  if (Math.abs(numeric) >= 100) return numeric.toFixed(2);
  if (Math.abs(numeric) >= 10) return numeric.toFixed(3);

  return numeric.toFixed(4);
}

function text(value) {
  if (value === null || value === undefined) return "";

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object") {
    return (
      value[state.lang] ||
      value.en ||
      value.es ||
      value.fi ||
      value.ro ||
      value.zh ||
      Object.values(value)[0] ||
      ""
    );
  }

  return String(value);
}

function semanticInfoForParameter(parameterId, parameter) {
  const candidates = semanticCandidates(parameterId, parameter);

  for (const candidate of candidates) {
    const term = ontologyTerm(candidate);

    if (term) {
      const uri =
        term.id ||
        term.uri ||
        term["@id"] ||
        parameter?.observedProperty?.id ||
        parameter?.id ||
        candidate;

      return {
        term,
        uri,
        href: localOntologyHref(uri)
      };
    }
  }

  const fallbackUri = parameter?.observedProperty?.id || parameter?.id || "";

  return {
    term: null,
    uri: fallbackUri,
    href: fallbackUri ? localOntologyHref(fallbackUri) : ""
  };
}

function semanticCandidates(parameterId, parameter) {
  const candidates = [];

  const add = (value) => {
    if (!value) return;

    const str = String(value);

    if (!candidates.includes(str)) {
      candidates.push(str);
    }

    const fragment = uriFragment(str);
    if (fragment && !candidates.includes(fragment)) {
      candidates.push(fragment);
    }
  };

  add(parameter?.observedProperty?.id);
  add(parameter?.id);
  add(parameterId);

  const aliases = ONTOLOGY_ALIASES[parameterId] || ONTOLOGY_ALIASES[uriFragment(parameter?.observedProperty?.id)] || [];
  aliases.forEach(add);

  return candidates;
}

function uriFragment(value) {
  if (!value) return "";
  const str = String(value);
  return str.includes("#") ? str.split("#").pop() : str.split("/").pop();
}

function ontologyTerm(uri) {
  if (!uri || !state.ontology?.terms) return null;

  const terms = state.ontology.terms;

  if (terms[uri]) {
    return terms[uri];
  }

  const fragment = uriFragment(uri);

  if (fragment && terms[fragment]) {
    return terms[fragment];
  }

  return (
    Object.values(terms).find((term) => {
      const id = term.id || term.uri || term["@id"];
      if (!id) return false;

      const idFragment = uriFragment(id);

      return (
        id === uri ||
        id === fragment ||
        idFragment === uri ||
        idFragment === fragment ||
        id.endsWith(`#${fragment}`) ||
        id.endsWith(`/${fragment}`)
      );
    }) ||
    null
  );
}

function unitLabel(unit) {
  if (!unit) return "—";
  if (typeof unit === "string") return unit;

  if (unit.label) return text(unit.label);

  if (unit.symbol) {
    if (typeof unit.symbol === "string") return unit.symbol;
    if (unit.symbol.value) return unit.symbol.value;
  }

  return "—";
}

function isCategoricalLayer() {
  const parameter = state.coverage?.parameters?.[state.currentParameterId] || {};

  if (state.entry?.kind === "categorical") return true;
  if (parameter.categories || parameter.categoryEncoding) return true;

  const unique = uniqueValidValues(state.currentValues || []);
  return unique.length > 0 && unique.length <= 12 && unique.every((value) => Number.isInteger(value));
}

function uniqueValidValues(values) {
  return [...new Set(values.filter(isValidValue))].sort((a, b) => a - b);
}

function colorForValue(value, min, max) {
  if (max === min) return colorRamp(0.5);

  const ratio = (value - min) / (max - min);
  return colorRamp(Math.max(0, Math.min(1, ratio)));
}

function colorRamp(ratio) {
  const stops = [
    { p: 0.0, c: [69, 117, 180] },
    { p: 0.5, c: [255, 255, 191] },
    { p: 1.0, c: [215, 48, 39] }
  ];

  const left = ratio <= 0.5 ? stops[0] : stops[1];
  const right = ratio <= 0.5 ? stops[1] : stops[2];
  const localRatio = (ratio - left.p) / (right.p - left.p);

  const r = Math.round(left.c[0] + (right.c[0] - left.c[0]) * localRatio);
  const g = Math.round(left.c[1] + (right.c[1] - left.c[1]) * localRatio);
  const b = Math.round(left.c[2] + (right.c[2] - left.c[2]) * localRatio);

  return `rgb(${r}, ${g}, ${b})`;
}

function categoricalColor(value) {
  const palette = [
    "rgb(31, 119, 180)",
    "rgb(255, 127, 14)",
    "rgb(44, 160, 44)",
    "rgb(214, 39, 40)",
    "rgb(148, 103, 189)",
    "rgb(140, 86, 75)",
    "rgb(227, 119, 194)",
    "rgb(127, 127, 127)",
    "rgb(188, 189, 34)",
    "rgb(23, 190, 207)"
  ];

  const index = Math.abs(Number(value)) % palette.length;
  return palette[index];
}

function parseCssColor(rgb) {
  const match = String(rgb).match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

  if (!match) {
    return { r: 0, g: 0, b: 0 };
  }

  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
}

function latLngToCell(latlng) {
  if (!state.axes) return null;

  const { xValues, yValues, nx, ny } = state.axes;

  const col = nearestIndex(xValues, latlng.lng);
  const row = nearestIndex(yValues, latlng.lat);

  if (col < 0 || row < 0 || col >= nx || row >= ny) {
    return null;
  }

  return {
    row,
    col,
    index: row * nx + col,
    x: xValues[col],
    y: yValues[row]
  };
}

function nearestIndex(values, target) {
  if (!values || !values.length) return -1;

  let bestIndex = 0;
  let bestDistance = Math.abs(values[0] - target);

  for (let i = 1; i < values.length; i += 1) {
    const distance = Math.abs(values[i] - target);

    if (distance < bestDistance) {
      bestIndex = i;
      bestDistance = distance;
    }
  }

  return bestIndex;
}

function localOntologyHref(uri) {
  return `./ontology.html?uri=${encodeURIComponent(uri)}&lang=${encodeURIComponent(state.lang)}`;
}

function popupHtml(latlng) {
  const cell = latLngToCell(latlng);

  if (!cell || !state.currentValues) {
    return `<div class="popup-card">${escapeHtml(t("noData"))}</div>`;
  }

  const parameterId = state.currentParameterId;
  const parameter = state.coverage.parameters?.[parameterId] || {};
  const semantic = semanticInfoForParameter(parameterId, parameter);
  const value = state.currentValues[cell.index];

  const label =
    text(semantic.term?.label) ||
    text(parameter.observedProperty?.label) ||
    text(parameter.label) ||
    parameterId;

  const definition =
    text(semantic.term?.definition) ||
    text(semantic.term?.description) ||
    text(parameter.observedProperty?.description) ||
    text(parameter.description) ||
    t("notAvailable");

  const ontologyType = semantic.term?.type || semantic.term?.["@type"] || "—";
  const unit = unitLabel(parameter.unit);
  const coverageTitle = text(state.entry?.title) || state.entry?.id || "—";

  const parameterCell = semantic.href
    ? `<a class="ontology-link attribute-name-link" href="${escapeHtml(semantic.href)}" target="_blank" rel="noopener" title="${escapeHtml(semantic.uri || parameterId)}">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`
    : escapeHtml(label);

  return `
    <div class="popup-card">
      <table class="popup-table">
        <tr>
          <th>${escapeHtml(t("coverage"))}</th>
          <td>${escapeHtml(coverageTitle)}</td>
        </tr>
        ${
          state.temporal?.hasTime
            ? `
              <tr>
                <th>${escapeHtml(t("time"))}</th>
                <td>${escapeHtml(timeStepLabel(state.temporal.values[state.currentTimeIndex], state.currentTimeIndex))}</td>
              </tr>
            `
            : ""
        }
        <tr>
          <th>${escapeHtml(t("parameter"))}</th>
          <td>${parameterCell}</td>
        </tr>
        <tr>
          <th>${escapeHtml(t("value"))}</th>
          <td>${isValidValue(value) ? escapeHtml(formatNumber(value)) : escapeHtml(t("noData"))}</td>
        </tr>
        <tr>
          <th>${escapeHtml(t("cell"))}</th>
          <td>row ${cell.row}, col ${cell.col}</td>
        </tr>
        <tr>
          <th>${escapeHtml(t("coordinates"))}</th>
          <td>${latlng.lat.toFixed(4)}, ${latlng.lng.toFixed(4)}</td>
        </tr>
        <tr>
          <th>${escapeHtml(t("definition"))}</th>
          <td class="definition-cell">${escapeHtml(definition)}</td>
        </tr>
        <tr>
          <th>${escapeHtml(t("ontologyType"))}</th>
          <td>${escapeHtml(ontologyType)}</td>
        </tr>
        <tr>
          <th>${escapeHtml(t("unit"))}</th>
          <td>${escapeHtml(unit)}</td>
        </tr>
        ${
          semantic.uri
            ? `
              <tr>
                <th>${escapeHtml(t("semanticUri"))}</th>
                <td>
                  <span class="raw-uri">${escapeHtml(semantic.uri)}</span>
                </td>
              </tr>
            `
            : ""
        }
      </table>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showFatalError(error) {
  console.error(error);

  const message = `
    <div class="error-banner">
      <strong>${escapeHtml(t("error"))}</strong><br />
      ${escapeHtml(error.message || error)}
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", message);
}
