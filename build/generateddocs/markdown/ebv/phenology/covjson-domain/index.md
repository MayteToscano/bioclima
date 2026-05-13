
# CovJSON Domain (Schema)

`syke.ebv.phenology.covjson-domain` *v1.0*

Coverage domain defining spatial/temporal extent via axes and reference systems. Supports Grid, PointSeries, Trajectory and other domain types.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

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

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: CoverageJSON Domain with axes and referencing
type: object
required:
- type
- axes
properties:
  type:
    type: string
    const: Domain
  domainType:
    type: string
    enum:
    - Grid
    - PointSeries
    - Point
    - MultiPoint
    - Trajectory
    - Section
    - VerticalProfile
    - Polygon
    - MultiPolygon
  axes:
    type: object
    additionalProperties:
      type: object
  referencing:
    type: array
    items:
      type: object
      required:
      - coordinates
      - system
      properties:
        coordinates:
          type: array
          items:
            type: string
        system:
          type: object

```

Links to the schema:

* YAML version: [schema.yaml](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/covjson-domain/schema.json)
* JSON version: [schema.json](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/covjson-domain/schema.yaml)

## Sources

* [OGC CoverageJSON 21-069r2 §7](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/covjson-domain`

