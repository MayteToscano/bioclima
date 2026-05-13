
# CovJSON TiledNdArray (Schema)

`syke.ebv.phenology.covjson-tiled-ndarray` *v1.0*

Tiled range encoding that partitions data spatially/temporally via URI templates, enabling efficient partial loading.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# CovJSON TiledNdArray

Partitions the NdArray into spatial/temporal tiles loaded via URI templates. Enables efficient partial loading for large datasets.

## UML: Range → 0..1 TiledNdArray → 1..* NdArray

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: CoverageJSON TiledNdArray for partitioned range data
type: object
required:
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
    items:
      type: object
      properties:
        tileShape:
          type: array
          items:
            type: integer
        urlTemplate:
          type: string

```

Links to the schema:

* YAML version: [schema.yaml](http://localhost:9090/register/build-local/annotated/ebv/phenology/covjson-tiled-ndarray/schema.json)
* JSON version: [schema.json](http://localhost:9090/register/build-local/annotated/ebv/phenology/covjson-tiled-ndarray/schema.yaml)

## Sources

* [OGC CoverageJSON 21-069r2 §9.2](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/covjson-tiled-ndarray`

