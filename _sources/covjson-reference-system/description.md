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
