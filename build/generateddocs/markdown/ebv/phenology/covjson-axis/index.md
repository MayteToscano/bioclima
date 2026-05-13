
# CovJSON Axis (Schema)

`syke.ebv.phenology.covjson-axis` *v1.0*

Single coordinate axis of a coverage domain: spatial (x,y,z) or temporal (t). Defines start, stop, num for regular axes or explicit values.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# CovJSON Axis

A single coordinate axis. Two forms:

**Regular axis** (evenly spaced): `{"start": 14.10, "stop": 35.23, "num": 320}`

**Irregular axis** (explicit values): `{"values": ["2001", "2002", ..., "2018"]}`

## Finland Phenology Axes
- **x** (longitude): start=14.10, stop=35.23, num=320
- **y** (latitude): start=57.75, stop=71.17, num=200
- **t** (time): values=["2001", "2002", ..., "2018"]

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: CoverageJSON Axis - regular or irregular coordinate axis
type: object
properties:
  start:
    type: number
  stop:
    type: number
  num:
    type: integer
  values:
    type: array
    items:
      oneOf:
      - type: number
      - type: string
  bounds:
    type: array
    items:
      type: number

```

Links to the schema:

* YAML version: [schema.yaml](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/covjson-axis/schema.json)
* JSON version: [schema.json](https://ogcincubator.github.io/bblocks-ebv-bioclima/build/annotated/ebv/phenology/covjson-axis/schema.yaml)

## Sources

* [OGC CoverageJSON 21-069r2 §7.2](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/covjson-axis`

