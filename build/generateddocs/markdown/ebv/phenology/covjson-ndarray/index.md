
# CovJSON NdArray (Schema)

`syke.ebv.phenology.covjson-ndarray` *v1.0*

N-dimensional array holding actual coverage data values. Defines dataType, shape, axisNames, and the flat values array.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# CovJSON NdArray

The actual data values in a flat 1D array with shape metadata to reconstruct the N-dimensional grid.

## Finland VAP NdArray
```json
{
  "type": "NdArray",
  "dataType": "integer",
  "axisNames": ["t", "y", "x"],
  "shape": [18, 200, 320],
  "values": [106, 95, 111, ...]
}
```
18 years × 200 rows × 320 columns = 1,152,000 values.

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: CoverageJSON NdArray - n-dimensional data array
type: object
required:
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
    enum:
    - integer
    - float
    - string
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

```

Links to the schema:

* YAML version: [schema.yaml](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/covjson-ndarray/schema.json)
* JSON version: [schema.json](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/covjson-ndarray/schema.yaml)

## Sources

* [OGC CoverageJSON 21-069r2 §9](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/covjson-ndarray`

