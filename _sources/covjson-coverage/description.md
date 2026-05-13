# CovJSON Coverage

The core CoverageJSON object. Composes all primitives from the UML:

## [→ Open Interactive Viewer](../../viewer/)

## UML Composition
```
Coverage
├── 1 Domain (→ 1..* Axis + * ReferenceSystem)
├── * ParameterGroup (→ 1..* Parameter)
├── 1..* Parameter (→ observedProperty → Ontology)
└── 1..* Range (→ NdArray or TiledNdArray)
```

## Finland Coniferous VAP Coverage
- **Domain**: Grid 320×200×18 (lon 14.10-35.23, lat 57.75-71.17, years 2001-2018)
- **Parameter**: VAP in Day of Year, 4-language descriptions, linked to ontology
- **Range**: NdArray integer [18, 200, 320] = 1,152,000 pixel values
- **CRS**: OGC CRS84 (WGS-84) + Gregorian calendar

## Band Statistics (from original dataset)
| Year | Min DOY | Max DOY | Mean DOY | StdDev | Valid % |
|------|---------|---------|----------|--------|---------|
| 2001 | 65 | 138 | 106.4 | 12.5 | 19.44% |
| 2002 | 64 | 124 | 94.7 | 8.5 | 11.09% |
| 2003 | 65 | 134 | 111.4 | 13.9 | 19.44% |

## Semantic Link
`observedProperty.id` → `https://w3id.org/ogc/hosted/ebv-phenology/StartOfVAP`
