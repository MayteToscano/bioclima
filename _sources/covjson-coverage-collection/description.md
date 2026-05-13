# CovJSON Coverage Collection

Groups multiple coverages = EBV Data Cube.

## [→ Open Interactive Viewer](../../viewer/)

## UML: CoverageCollection 0..1 ← 1..* Coverage
```
CoverageCollection (EBV Data Cube)
├── Coverage: Coniferous VAP (320×200×18)
├── Coverage: Deciduous VAP (320×200×18)
└── ParameterGroup: "Ecosystem Phenology"
    ├── member: VAP_coniferous
    └── member: VAP_deciduous
```

## 4 Dimensions of the EBV Cube
1. **x** (longitude): 14.10° – 35.23°
2. **y** (latitude): 57.75° – 71.17°
3. **t** (time): 2001–2018 annual
4. **entity**: Coniferous, Deciduous (one Coverage per entity)
