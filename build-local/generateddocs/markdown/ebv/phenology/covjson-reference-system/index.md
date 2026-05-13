
# CovJSON Reference System (Schema)

`syke.ebv.phenology.covjson-reference-system` *v1.0*

Coordinate reference system binding axes to real-world coordinates. Supports GeographicCRS, ProjectedCRS, TemporalRS, VerticalCRS.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# CovJSON Reference System

Binds coordinate axes to real-world meaning.

| Type | Use | Example |
|------|-----|---------|
| GeographicCRS | lon/lat | OGC CRS84 |
| ProjectedCRS | projected coords | EPSG:3067 (Finland) |
| TemporalRS | time axis | Gregorian calendar |
| VerticalCRS | altitude/depth | EPSG:5714 |

## Finland Phenology
- **Spatial**: GeographicCRS, id=`http://www.opengis.net/def/crs/OGC/1.3/CRS84`
- **Temporal**: TemporalRS, calendar=Gregorian

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: CoverageJSON Reference System
type: object
required:
- type
properties:
  type:
    type: string
    enum:
    - GeographicCRS
    - ProjectedCRS
    - VerticalCRS
    - TemporalRS
    - IdentifierRS
  id:
    type: string
  calendar:
    type: string

```

Links to the schema:

* YAML version: [schema.yaml](http://localhost:9090/register/build-local/annotated/ebv/phenology/covjson-reference-system/schema.json)
* JSON version: [schema.json](http://localhost:9090/register/build-local/annotated/ebv/phenology/covjson-reference-system/schema.yaml)

## Sources

* [OGC CoverageJSON 21-069r2 §7.4](https://docs.ogc.org/cs/21-069r2/21-069r2.html)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/covjson-reference-system`

