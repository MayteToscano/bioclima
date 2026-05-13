# EBV Feature View — Multilingual Attribute Definitions

Discovery layer for the OGC Building Blocks map viewer. Represents EBV phenology coverage statistics as GeoJSON Features with **semantically linked, multilingual property definitions**.

## Multilingual labels (EN · ES · 中文 · RO)

Each property has definitions in 4 languages via `x-jsonld-prefLabel` in the schema and `skos:prefLabel` in the EBV ontology:

| Property | EN | ES | 中文 | RO |
|----------|----|----|------|----|
| `entity_type` | Forest Entity Type | Tipo de Entidad Forestal | 森林实体类型 | Tip de Entitate Forestieră |
| `vap_doy` | Start of VAP (Day of Year) | Inicio del Período Activo de Vegetación | 植被活跃期起始 | Începutul Perioadei Active |
| `mean_doy` | Spatial Mean DOY | Media Espacial DOY | 空间平均年日数 | Media Spațială DOY |
| `trend_slope` | Linear Trend (days/year) | Tendencia Lineal (días/año) | 线性趋势（天/年） | Tendința Liniară (zile/an) |
| `sensor` | Source Sensor Platform | Plataforma Sensora | 源传感器平台 | Platforma Senzorului |
| `algorithm` | Derivation Algorithm | Algoritmo de Derivación | 推导算法 | Algoritmul de Derivare |
| `anomaly` | Annual Anomaly Status | Estado de Anomalía Anual | 年度异常状态 | Statusul Anomaliei |

## Real data from NetCDF (DOI: 10.25829/xf8ek6)

36 features = **18 years × 2 entities** with real pixel statistics from the MODIS grid (318×202 pixels):

| Year | Coniferous DOY | Deciduous DOY | Anomaly |
|------|---------------|---------------|---------|
| 2001 | 106 | 137 | normal |
| 2002 | **95** | 142 | **early** |
| 2007 | **97** | 139 | **early** |
| 2012 | **117** | 143 | **late** |
| 2014 | **92** | 139 | **early** |
| 2017 | 114 | **153** | normal / late |

## Properties → Building Block Links

| Property | Ontology URI | Block |
|----------|-------------|-------|
| `entity_type` | `ebv:entity_type` | [EBV Ontology](../ebv-ontology/) |
| `vap_doy` | `ebv:vap_doy` | [CovJSON Parameter](../covjson-parameter/) |
| `mean_doy`, `stddev` | `ebv:mean_doy` | [Phenology Indicators](../phenology-indicators/) |
| `crs` | `covjson:referenceSystem` | [CovJSON Reference System](../covjson-reference-system/) |
| `grid_width`, `grid_height` | `covjson:axisSize` | [CovJSON Axis](../covjson-axis/) |
| `sensor` | `prov:wasGeneratedBy` | [Data Provenance](../data-provenance/) |
| `algorithm` | `prov:used` | [Data Provenance](../data-provenance/) |
| `trend_slope`, `anomaly` | `ebv:trend_slope` | [Phenology Indicators](../phenology-indicators/) |

## [→ Interactive Raster Viewer with Real Pixel Values](../../viewer/)

Full 318×202 MODIS grid with click-to-inspect DOY values for every pixel.
