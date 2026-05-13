
# CovJSON Range (Schema)

`syke.ebv.phenology.covjson-range` *v1.0*

Container for data values of a single parameter. Contains NdArray (inline) or TiledNdArray (tiled/external).

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# CovJSON Range

The data values for one parameter. Either inline (NdArray) or tiled (TiledNdArray).

## UML
```
Range
├── 1..* NdArray (inline values)
└── 0..1 TiledNdArray (tiled via URI templates)
```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: CoverageJSON Range - data values container (NdArray or TiledNdArray)
type: object
oneOf:
- required:
  - type
  - dataType
  - axisNames
  - shape
  properties:
    type:
      type: string
      const: NdArray
    dataType:
      type: string
    axisNames:
      type: array
      items:
        type: string
    shape:
      type: array
      items:
        type: integer
    values:
      type: array
- required:
  - type
  - dataType
  - axisNames
  - shape
  - tileSets
  properties:
    type:
      type: string
      const: TiledNdArray
    dataType:
      type: string
    axisNames:
      type: array
      items:
        type: string
    shape:
      type: array
      items:
        type: integer
    tileSets:
      type: array

```

Links to the schema:

* YAML version: [schema.yaml](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/covjson-range/schema.json)
* JSON version: [schema.json](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/covjson-range/schema.yaml)

## Sources

* [OGC CoverageJSON 21-069r2 §9](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/covjson-range`

