# BioClima EBV Phenology Finland OGC Blocks — PCI-ready extension

This version includes a semantic CoverageJSON implementation of the Phenological Change Indicator (PCI), a generic catalog-driven CoverageJSON viewer and example indicator/categorical coverages. See `README_PCI_EXTENSION.md` and `HOW_TO_ADD_DATA.md`.

# EBV Phenology Finland — 17 OGC Building Blocks

Complete modelling of the **CoverageJSON UML** (OGC 21-069r2) plus **EBV-specific blocks**.

## [→ Interactive CoverageJSON Viewer](viewer/)

## CoverageJSON UML → Building Blocks (1:1 mapping)

```
CoverageCollection  →  covjson-coverage-collection
  └─ 1..* Coverage  →  covjson-coverage
       ├─ 1 Domain  →  covjson-domain
       │   ├─ 1..* Axis           →  covjson-axis
       │   └─ * ReferenceSystem   →  covjson-reference-system
       ├─ * ParameterGroup        →  covjson-parameter-group
       │   └─ 1..* Parameter      →  covjson-parameter
       └─ 1..* Range              →  covjson-range
            ├─ 1..* NdArray       →  covjson-ndarray
            └─ 0..1 TiledNdArray  →  covjson-tiled-ndarray
```

## EBV-Specific Blocks

| Block | Purpose |
|-------|---------|
| EBV Dataset Profile | GEO BON class/name/entities/scope |
| Phenology Indicators | Trends (-0.45 d/yr), anomalies, change points |
| Data Provenance | W3C PROV: MODIS → FSC/NDWI → VAP |
| Data Quality | ±9 days accuracy, ~3 days bias |
| EBV Phenology Ontology | OWL/SKOS in 4 languages (EN, ES, ZH, RO) |
| Policy Alignment | GBF Goal A, SDG 15, IPBES, NBSAP |
| Ecosystem Services Link | Pollination, carbon, water impacts |

## Dataset
Vegetation Phenology in Finland (2001–2018). DOI: [10.25829/xf8ek6](https://doi.org/10.25829/xf8ek6). CC BY 4.0.
