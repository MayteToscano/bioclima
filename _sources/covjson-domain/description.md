# CovJSON Domain

The domain defines WHERE data exists — spatial and temporal extent.

## Composition (UML)
```
Domain
├── 1..* Axis (x, y, t, z)
└── * ReferenceSystem (CRS84, Gregorian, etc.)
```

## Finland Phenology Domain
```json
{
  "type": "Domain",
  "domainType": "Grid",
  "axes": {
    "x": {"start": 14.10, "stop": 35.23, "num": 320},
    "y": {"start": 57.75, "stop": 71.17, "num": 200},
    "t": {"values": ["2001","2002","...","2018"]}
  }
}
```
