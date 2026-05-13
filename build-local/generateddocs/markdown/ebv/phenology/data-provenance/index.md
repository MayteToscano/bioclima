
# Data Provenance (Schema)

`syke.ebv.phenology.data-provenance` *v1.0*

Lineage and provenance information for EBV phenology datasets and derived phenology indicators.

[*Status*](http://www.opengis.net/def/status): Under development

## Description

# Data Provenance for Phenology Indicators

This Building Block documents the lineage of derived EBV phenology indicators.

The provenance example describes how national-scale annual phenology indicators were derived from the original NetCDF dataset for Finland. It records:

- source dataset metadata
- agents involved in creation, derivation and publication
- source, intermediate and derived entities
- processing activities
- methodological parameters
- quality and interpretation limitations

The provenance follows a PROV-O inspired structure using `prov:Entity`, `prov:Activity`, `prov:Agent`, `prov:used`, `prov:wasGeneratedBy`, `prov:wasAssociatedWith` and related concepts.

The example is designed to support transparency and reproducibility. It does not by itself make the derived indicators policy-grade evidence.

## Examples

### Provenance for Finland EBV phenology indicators
examples/finland-phenology-indicators-provenance.json
#### json
```json
{
  "type": "PhenologyIndicatorProvenance",
  "title": "Provenance for Finland EBV phenology indicators",
  "description": "Lineage record describing how the Phenology Indicators example was derived from the original NetCDF EBV phenology dataset using national-scale annual spatial aggregation and temporal analysis.",
  "source_dataset": {
    "id": "geobon-dataset-10-v2",
    "title": "Vegetation Phenology in Finland",
    "doi": "10.25829/xf8ek6",
    "product_version": "2",
    "date_created": "2020-11-04",
    "date_issued": "2023-07-18",
    "license": "https://creativecommons.org/licenses/by/4.0",
    "source_file": "/10/public/bottcher_ecofun_id10_20230718_v2.nc",
    "download": "portal.geobon.org/data/upload/10/public/bottcher_ecofun_id10_20230718_v2.nc",
    "metadata_json": "portal.geobon.org/data/upload/10/public/metadata_v2.json",
    "metadata_xml": "portal.geobon.org/data/upload/10/public/metadata_v2.xml",
    "spatial_scope": "Finland",
    "spatial_resolution": {
      "lat_resolution": "0.066428063829064 degree",
      "lon_resolution": "0.066428063829064 degree"
    },
    "geospatial_bounds": {
      "crs": "EPSG:4326",
      "lat_min": 57.7532613743371,
      "lat_max": 71.171730267808,
      "lon_min": 14.1011663430375,
      "lon_max": 35.2252906406799
    },
    "temporal_coverage": {
      "time_coverage_resolution": "P0001-00-00",
      "time_coverage_start": "2001-01-01",
      "time_coverage_end": "2018-01-01"
    },
    "ebv": {
      "class": "Ecosystem functioning",
      "name": "Ecosystem phenology",
      "domain": [
        "Terrestrial"
      ],
      "entity_type": "Ecosystems",
      "entity_scope": "Coniferous and deciduous forests",
      "entity_names": [
        "Coniferous",
        "Deciduous"
      ],
      "metric": {
        ":standard_name": "Start of the vegetation active period (VAP)",
        ":long_name": "The start of the vegetation active period (VAP) in coniferous forest (Day of Year) is defined as the day when the trees start to photosynthesize in spring. The data set was derived from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation of Fractional Snow Cover. The day when snow cover decreases during spring melt was used as a proxy indicator for the beginning of the start of the vegetation active period. The start of the vegetation active period (VAP) in deciduous vegetation (Day of Year) is defined as the day when deciduous trees unfold new leaves in spring. It is also often referred to as the green-up or greening day. The data set was derived from time series of the Normalized Difference Water Index (NDWI) calculated from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation.",
        ":units": "Day of year"
      }
    }
  },
  "agents": [
    {
      "id": "agent:syke",
      "type": "Organization",
      "name": "Finnish Environment Institute (SYKE)",
      "role": "original data creator and publisher"
    },
    {
      "id": "agent:kristin-bottcher",
      "type": "Person",
      "name": "Kristin Böttcher",
      "institution": "The Finnish Environment Institute (SYKE)",
      "role": "dataset creator"
    },
    {
      "id": "agent:modis-terra",
      "type": "InstrumentPlatform",
      "name": "MODIS Terra",
      "role": "satellite observation source"
    },
    {
      "id": "agent:phenology-indicator-script",
      "type": "SoftwareAgent",
      "name": "Phenology indicator derivation script",
      "role": "derivation of temporal phenology indicators from the NetCDF cube"
    },
    {
      "id": "agent:ogc-bblocks-workflow",
      "type": "SoftwareAgent",
      "name": "OGC Building Blocks workflow",
      "role": "validation, annotation and publication of Building Block examples"
    }
  ],
  "entities": [
    {
      "id": "entity:modis-observations",
      "type": "prov:Entity",
      "label": "MODIS Terra satellite observations",
      "description": "Remote sensing observations used as source input for the original VAP products."
    },
    {
      "id": "entity:source-netcdf",
      "type": "prov:Entity",
      "label": "Original EBV phenology NetCDF cube",
      "format": "NetCDF",
      "path": "/10/public/bottcher_ecofun_id10_20230718_v2.nc",
      "wasAttributedTo": "agent:syke"
    },
    {
      "id": "entity:source-metadata-json",
      "type": "prov:Entity",
      "label": "Dataset metadata JSON",
      "format": "JSON",
      "path": "portal.geobon.org/data/upload/10/public/metadata_v2.json",
      "wasAttributedTo": "agent:syke"
    },
    {
      "id": "entity:annual-spatial-means",
      "type": "prov:Entity",
      "label": "Annual spatial means",
      "description": "Intermediate table with one national-scale annual mean VAP day-of-year per EBV entity."
    },
    {
      "id": "entity:phenology-indicators-json",
      "type": "prov:Entity",
      "label": "Derived phenology indicators JSON",
      "format": "JSON",
      "path": "_sources/phenology-indicators/examples/finland-phenology-indicators-full-series.json"
    },
    {
      "id": "entity:phenology-indicators-provenance",
      "type": "prov:Entity",
      "label": "Provenance record for derived phenology indicators",
      "format": "JSON",
      "path": "_sources/data-provenance/examples/finland-phenology-indicators-provenance.json"
    }
  ],
  "activities": [
    {
      "id": "activity:remote-sensing-acquisition",
      "type": "prov:Activity",
      "label": "Acquire MODIS observations",
      "generated": "entity:modis-observations",
      "wasAssociatedWith": "agent:modis-terra"
    },
    {
      "id": "activity:derive-vap-products",
      "type": "prov:Activity",
      "label": "Derive annual VAP raster products",
      "used": [
        "entity:modis-observations"
      ],
      "generated": "entity:source-netcdf",
      "wasAssociatedWith": "agent:syke",
      "method_summary": [
        "MODIS Level 1B data were calibrated to top-of-atmosphere reflectances.",
        "Fractional Snow Cover (FSC) and NDWI were calculated.",
        "Cloud covered observations were removed.",
        "For coniferous forest, FSC time series were used as proxy for VAP onset.",
        "For deciduous vegetation, NDWI time series were used.",
        "Yearly VAP maps were smoothed with a median filter and open water areas were masked."
      ]
    },
    {
      "id": "activity:read-source-cube",
      "type": "prov:Activity",
      "label": "Read EBV cube from NetCDF",
      "used": [
        "entity:source-netcdf",
        "entity:source-metadata-json"
      ],
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "source_variable": "metric_1/ebv_cube",
        "dimensions": [
          "entity",
          "time",
          "lat",
          "lon"
        ],
        "fill_value_handling": "Fill values were converted to null / NaN before aggregation."
      }
    },
    {
      "id": "activity:aggregate-annual-spatial-means",
      "type": "prov:Activity",
      "label": "Aggregate annual national-scale spatial means",
      "used": [
        "entity:source-netcdf"
      ],
      "generated": "entity:annual-spatial-means",
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "spatial_aggregation": "mean over valid raster cells",
        "spatial_scope": "Finland",
        "entities": [
          "Coniferous",
          "Deciduous"
        ],
        "years": [
          2001,
          2002,
          2003,
          2004,
          2005,
          2006,
          2007,
          2008,
          2009,
          2010,
          2011,
          2012,
          2013,
          2014,
          2015,
          2016,
          2017,
          2018
        ]
      }
    },
    {
      "id": "activity:compute-phenology-indicators",
      "type": "prov:Activity",
      "label": "Compute temporal phenology indicators",
      "used": [
        "entity:annual-spatial-means"
      ],
      "generated": "entity:phenology-indicators-json",
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "linear_trend": "Ordinary least squares regression of annual mean VAP day-of-year against year.",
        "anomaly_index": "Annual anomaly against a 2001–2010 baseline mean and standard deviation.",
        "change_point": "Two-segment linear regression selected by minimum sum of squared errors, with at least five years per segment.",
        "acceleration": "Quadratic fit to annual mean VAP day-of-year."
      }
    },
    {
      "id": "activity:publish-building-block-examples",
      "type": "prov:Activity",
      "label": "Publish Building Block examples",
      "used": [
        "entity:phenology-indicators-json",
        "entity:phenology-indicators-provenance"
      ],
      "wasAssociatedWith": "agent:ogc-bblocks-workflow"
    }
  ],
  "lineage": [
    {
      "subject": "entity:modis-observations",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:remote-sensing-acquisition"
    },
    {
      "subject": "entity:source-netcdf",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:derive-vap-products"
    },
    {
      "subject": "activity:derive-vap-products",
      "predicate": "prov:used",
      "object": "entity:modis-observations"
    },
    {
      "subject": "entity:annual-spatial-means",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:aggregate-annual-spatial-means"
    },
    {
      "subject": "activity:aggregate-annual-spatial-means",
      "predicate": "prov:used",
      "object": "entity:source-netcdf"
    },
    {
      "subject": "entity:phenology-indicators-json",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:compute-phenology-indicators"
    },
    {
      "subject": "activity:compute-phenology-indicators",
      "predicate": "prov:used",
      "object": "entity:annual-spatial-means"
    }
  ],
  "derived_indicator_summary": [
    {
      "entity": "ConiferousForest",
      "entity_label": "Coniferous",
      "linear_trend": {
        "slope_days_per_year": 0.0939,
        "intercept": -81.7329,
        "r_squared": 0.0051,
        "p_value": 0.77892,
        "interpretation": {
          "climate_signal": "stable_or_weak_trend",
          "confidence": "low",
          "summary": "Negative slope means earlier VAP onset over time; positive slope means later VAP onset. This is a national-scale spatial mean over valid cells."
        }
      },
      "change_point": {
        "change_point_year": 2013,
        "method": "two_segment_linear_sse",
        "sse_improvement_vs_single_trend": 0.2079,
        "before_slope_days_per_year": 0.6458,
        "after_slope_days_per_year": 2.3334,
        "confidence": "low"
      },
      "acceleration": {
        "quadratic_coefficient": -0.012569,
        "acceleration_days_per_year2": -0.025137,
        "r_squared": 0.007,
        "interpretation": {
          "summary": "The acceleration indicator is based on a quadratic fit to the annual spatial mean. It should be interpreted cautiously for an 18-year series.",
          "confidence": "low"
        }
      }
    },
    {
      "entity": "DeciduousForest",
      "entity_label": "Deciduous",
      "linear_trend": {
        "slope_days_per_year": 0.086,
        "intercept": -32.662,
        "r_squared": 0.0115,
        "p_value": 0.67173,
        "interpretation": {
          "climate_signal": "stable_or_weak_trend",
          "confidence": "low",
          "summary": "Negative slope means earlier VAP onset over time; positive slope means later VAP onset. This is a national-scale spatial mean over valid cells."
        }
      },
      "change_point": {
        "change_point_year": 2009,
        "method": "two_segment_linear_sse",
        "sse_improvement_vs_single_trend": 0.1274,
        "before_slope_days_per_year": 0.4032,
        "after_slope_days_per_year": 0.6396,
        "confidence": "low"
      },
      "acceleration": {
        "quadratic_coefficient": 0.028646,
        "acceleration_days_per_year2": 0.057292,
        "r_squared": 0.0388,
        "interpretation": {
          "summary": "The acceleration indicator is based on a quadratic fit to the annual spatial mean. It should be interpreted cautiously for an 18-year series.",
          "confidence": "low"
        }
      }
    }
  ],
  "quality_and_limitations": {
    "representativeness": "The indicator derivation uses national-scale spatial means. It is suitable for demonstrating temporal indicator structure, but it does not represent local spatial heterogeneity.",
    "uncertainty": "The provenance record documents method and source lineage, but does not propagate pixel-level uncertainty.",
    "policy_use": "The record supports transparency and reproducibility. Policy-grade interpretation would require formal uncertainty assessment, validation and explicit alignment with reporting requirements."
  }
}
```

#### jsonld
```jsonld
{
  "@context": "http://localhost:9090/register/build-local/annotated/ebv/phenology/data-provenance/context.jsonld",
  "type": "PhenologyIndicatorProvenance",
  "title": "Provenance for Finland EBV phenology indicators",
  "description": "Lineage record describing how the Phenology Indicators example was derived from the original NetCDF EBV phenology dataset using national-scale annual spatial aggregation and temporal analysis.",
  "source_dataset": {
    "id": "geobon-dataset-10-v2",
    "title": "Vegetation Phenology in Finland",
    "doi": "10.25829/xf8ek6",
    "product_version": "2",
    "date_created": "2020-11-04",
    "date_issued": "2023-07-18",
    "license": "https://creativecommons.org/licenses/by/4.0",
    "source_file": "/10/public/bottcher_ecofun_id10_20230718_v2.nc",
    "download": "portal.geobon.org/data/upload/10/public/bottcher_ecofun_id10_20230718_v2.nc",
    "metadata_json": "portal.geobon.org/data/upload/10/public/metadata_v2.json",
    "metadata_xml": "portal.geobon.org/data/upload/10/public/metadata_v2.xml",
    "spatial_scope": "Finland",
    "spatial_resolution": {
      "lat_resolution": "0.066428063829064 degree",
      "lon_resolution": "0.066428063829064 degree"
    },
    "geospatial_bounds": {
      "crs": "EPSG:4326",
      "lat_min": 57.7532613743371,
      "lat_max": 71.171730267808,
      "lon_min": 14.1011663430375,
      "lon_max": 35.2252906406799
    },
    "temporal_coverage": {
      "time_coverage_resolution": "P0001-00-00",
      "time_coverage_start": "2001-01-01",
      "time_coverage_end": "2018-01-01"
    },
    "ebv": {
      "class": "Ecosystem functioning",
      "name": "Ecosystem phenology",
      "domain": [
        "Terrestrial"
      ],
      "entity_type": "Ecosystems",
      "entity_scope": "Coniferous and deciduous forests",
      "entity_names": [
        "Coniferous",
        "Deciduous"
      ],
      "metric": {
        ":standard_name": "Start of the vegetation active period (VAP)",
        ":long_name": "The start of the vegetation active period (VAP) in coniferous forest (Day of Year) is defined as the day when the trees start to photosynthesize in spring. The data set was derived from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation of Fractional Snow Cover. The day when snow cover decreases during spring melt was used as a proxy indicator for the beginning of the start of the vegetation active period. The start of the vegetation active period (VAP) in deciduous vegetation (Day of Year) is defined as the day when deciduous trees unfold new leaves in spring. It is also often referred to as the green-up or greening day. The data set was derived from time series of the Normalized Difference Water Index (NDWI) calculated from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation.",
        ":units": "Day of year"
      }
    }
  },
  "agents": [
    {
      "id": "agent:syke",
      "type": "Organization",
      "name": "Finnish Environment Institute (SYKE)",
      "role": "original data creator and publisher"
    },
    {
      "id": "agent:kristin-bottcher",
      "type": "Person",
      "name": "Kristin B\u00f6ttcher",
      "institution": "The Finnish Environment Institute (SYKE)",
      "role": "dataset creator"
    },
    {
      "id": "agent:modis-terra",
      "type": "InstrumentPlatform",
      "name": "MODIS Terra",
      "role": "satellite observation source"
    },
    {
      "id": "agent:phenology-indicator-script",
      "type": "SoftwareAgent",
      "name": "Phenology indicator derivation script",
      "role": "derivation of temporal phenology indicators from the NetCDF cube"
    },
    {
      "id": "agent:ogc-bblocks-workflow",
      "type": "SoftwareAgent",
      "name": "OGC Building Blocks workflow",
      "role": "validation, annotation and publication of Building Block examples"
    }
  ],
  "entities": [
    {
      "id": "entity:modis-observations",
      "type": "prov:Entity",
      "label": "MODIS Terra satellite observations",
      "description": "Remote sensing observations used as source input for the original VAP products."
    },
    {
      "id": "entity:source-netcdf",
      "type": "prov:Entity",
      "label": "Original EBV phenology NetCDF cube",
      "format": "NetCDF",
      "path": "/10/public/bottcher_ecofun_id10_20230718_v2.nc",
      "wasAttributedTo": "agent:syke"
    },
    {
      "id": "entity:source-metadata-json",
      "type": "prov:Entity",
      "label": "Dataset metadata JSON",
      "format": "JSON",
      "path": "portal.geobon.org/data/upload/10/public/metadata_v2.json",
      "wasAttributedTo": "agent:syke"
    },
    {
      "id": "entity:annual-spatial-means",
      "type": "prov:Entity",
      "label": "Annual spatial means",
      "description": "Intermediate table with one national-scale annual mean VAP day-of-year per EBV entity."
    },
    {
      "id": "entity:phenology-indicators-json",
      "type": "prov:Entity",
      "label": "Derived phenology indicators JSON",
      "format": "JSON",
      "path": "_sources/phenology-indicators/examples/finland-phenology-indicators-full-series.json"
    },
    {
      "id": "entity:phenology-indicators-provenance",
      "type": "prov:Entity",
      "label": "Provenance record for derived phenology indicators",
      "format": "JSON",
      "path": "_sources/data-provenance/examples/finland-phenology-indicators-provenance.json"
    }
  ],
  "activities": [
    {
      "id": "activity:remote-sensing-acquisition",
      "type": "prov:Activity",
      "label": "Acquire MODIS observations",
      "generated": "entity:modis-observations",
      "wasAssociatedWith": "agent:modis-terra"
    },
    {
      "id": "activity:derive-vap-products",
      "type": "prov:Activity",
      "label": "Derive annual VAP raster products",
      "used": [
        "entity:modis-observations"
      ],
      "generated": "entity:source-netcdf",
      "wasAssociatedWith": "agent:syke",
      "method_summary": [
        "MODIS Level 1B data were calibrated to top-of-atmosphere reflectances.",
        "Fractional Snow Cover (FSC) and NDWI were calculated.",
        "Cloud covered observations were removed.",
        "For coniferous forest, FSC time series were used as proxy for VAP onset.",
        "For deciduous vegetation, NDWI time series were used.",
        "Yearly VAP maps were smoothed with a median filter and open water areas were masked."
      ]
    },
    {
      "id": "activity:read-source-cube",
      "type": "prov:Activity",
      "label": "Read EBV cube from NetCDF",
      "used": [
        "entity:source-netcdf",
        "entity:source-metadata-json"
      ],
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "source_variable": "metric_1/ebv_cube",
        "dimensions": [
          "entity",
          "time",
          "lat",
          "lon"
        ],
        "fill_value_handling": "Fill values were converted to null / NaN before aggregation."
      }
    },
    {
      "id": "activity:aggregate-annual-spatial-means",
      "type": "prov:Activity",
      "label": "Aggregate annual national-scale spatial means",
      "used": [
        "entity:source-netcdf"
      ],
      "generated": "entity:annual-spatial-means",
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "spatial_aggregation": "mean over valid raster cells",
        "spatial_scope": "Finland",
        "entities": [
          "Coniferous",
          "Deciduous"
        ],
        "years": [
          2001,
          2002,
          2003,
          2004,
          2005,
          2006,
          2007,
          2008,
          2009,
          2010,
          2011,
          2012,
          2013,
          2014,
          2015,
          2016,
          2017,
          2018
        ]
      }
    },
    {
      "id": "activity:compute-phenology-indicators",
      "type": "prov:Activity",
      "label": "Compute temporal phenology indicators",
      "used": [
        "entity:annual-spatial-means"
      ],
      "generated": "entity:phenology-indicators-json",
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "linear_trend": "Ordinary least squares regression of annual mean VAP day-of-year against year.",
        "anomaly_index": "Annual anomaly against a 2001\u20132010 baseline mean and standard deviation.",
        "change_point": "Two-segment linear regression selected by minimum sum of squared errors, with at least five years per segment.",
        "acceleration": "Quadratic fit to annual mean VAP day-of-year."
      }
    },
    {
      "id": "activity:publish-building-block-examples",
      "type": "prov:Activity",
      "label": "Publish Building Block examples",
      "used": [
        "entity:phenology-indicators-json",
        "entity:phenology-indicators-provenance"
      ],
      "wasAssociatedWith": "agent:ogc-bblocks-workflow"
    }
  ],
  "lineage": [
    {
      "subject": "entity:modis-observations",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:remote-sensing-acquisition"
    },
    {
      "subject": "entity:source-netcdf",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:derive-vap-products"
    },
    {
      "subject": "activity:derive-vap-products",
      "predicate": "prov:used",
      "object": "entity:modis-observations"
    },
    {
      "subject": "entity:annual-spatial-means",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:aggregate-annual-spatial-means"
    },
    {
      "subject": "activity:aggregate-annual-spatial-means",
      "predicate": "prov:used",
      "object": "entity:source-netcdf"
    },
    {
      "subject": "entity:phenology-indicators-json",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:compute-phenology-indicators"
    },
    {
      "subject": "activity:compute-phenology-indicators",
      "predicate": "prov:used",
      "object": "entity:annual-spatial-means"
    }
  ],
  "derived_indicator_summary": [
    {
      "entity": "ConiferousForest",
      "entity_label": "Coniferous",
      "linear_trend": {
        "slope_days_per_year": 0.0939,
        "intercept": -81.7329,
        "r_squared": 0.0051,
        "p_value": 0.77892,
        "interpretation": {
          "climate_signal": "stable_or_weak_trend",
          "confidence": "low",
          "summary": "Negative slope means earlier VAP onset over time; positive slope means later VAP onset. This is a national-scale spatial mean over valid cells."
        }
      },
      "change_point": {
        "change_point_year": 2013,
        "method": "two_segment_linear_sse",
        "sse_improvement_vs_single_trend": 0.2079,
        "before_slope_days_per_year": 0.6458,
        "after_slope_days_per_year": 2.3334,
        "confidence": "low"
      },
      "acceleration": {
        "quadratic_coefficient": -0.012569,
        "acceleration_days_per_year2": -0.025137,
        "r_squared": 0.007,
        "interpretation": {
          "summary": "The acceleration indicator is based on a quadratic fit to the annual spatial mean. It should be interpreted cautiously for an 18-year series.",
          "confidence": "low"
        }
      }
    },
    {
      "entity": "DeciduousForest",
      "entity_label": "Deciduous",
      "linear_trend": {
        "slope_days_per_year": 0.086,
        "intercept": -32.662,
        "r_squared": 0.0115,
        "p_value": 0.67173,
        "interpretation": {
          "climate_signal": "stable_or_weak_trend",
          "confidence": "low",
          "summary": "Negative slope means earlier VAP onset over time; positive slope means later VAP onset. This is a national-scale spatial mean over valid cells."
        }
      },
      "change_point": {
        "change_point_year": 2009,
        "method": "two_segment_linear_sse",
        "sse_improvement_vs_single_trend": 0.1274,
        "before_slope_days_per_year": 0.4032,
        "after_slope_days_per_year": 0.6396,
        "confidence": "low"
      },
      "acceleration": {
        "quadratic_coefficient": 0.028646,
        "acceleration_days_per_year2": 0.057292,
        "r_squared": 0.0388,
        "interpretation": {
          "summary": "The acceleration indicator is based on a quadratic fit to the annual spatial mean. It should be interpreted cautiously for an 18-year series.",
          "confidence": "low"
        }
      }
    }
  ],
  "quality_and_limitations": {
    "representativeness": "The indicator derivation uses national-scale spatial means. It is suitable for demonstrating temporal indicator structure, but it does not represent local spatial heterogeneity.",
    "uncertainty": "The provenance record documents method and source lineage, but does not propagate pixel-level uncertainty.",
    "policy_use": "The record supports transparency and reproducibility. Policy-grade interpretation would require formal uncertainty assessment, validation and explicit alignment with reporting requirements."
  }
}
```

#### ttl
```ttl
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix ebv: <https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#> .
@prefix prov: <http://www.w3.org/ns/prov#> .

[] a "PhenologyIndicatorProvenance" ;
    dcterms:description "Lineage record describing how the Phenology Indicators example was derived from the original NetCDF EBV phenology dataset using national-scale annual spatial aggregation and temporal analysis." ;
    dcterms:source [ dcterms:title "Vegetation Phenology in Finland" ;
            ebv: [ ] ] ;
    dcterms:title "Provenance for Finland EBV phenology indicators" ;
    prov:Activity [ a "prov:Activity" ],
        [ a "prov:Activity" ],
        [ a "prov:Activity" ],
        [ a "prov:Activity" ],
        [ a "prov:Activity" ],
        [ a "prov:Activity" ] ;
    prov:Agent [ a "InstrumentPlatform" ],
        [ a "SoftwareAgent" ],
        [ a "SoftwareAgent" ],
        [ a "Organization" ],
        [ a "Person" ] ;
    prov:Entity [ a "prov:Entity" ],
        [ a "prov:Entity" ],
        [ a "prov:Entity" ],
        [ a "prov:Entity" ],
        [ a "prov:Entity" ;
            dcterms:description "Remote sensing observations used as source input for the original VAP products." ],
        [ a "prov:Entity" ;
            dcterms:description "Intermediate table with one national-scale annual mean VAP day-of-year per EBV entity." ] ;
    prov:wasDerivedFrom [ ],
        [ ],
        [ ],
        [ ],
        [ ],
        [ ],
        [ ] ;
    ebv:derived_indicator_summary [ ],
        [ ] ;
    ebv:quality_and_limitations [ ] .


```


### Provenance for Finland EBV phenology indicators (JSON-LD)
examples/finland-phenology-indicators-provenance.jsonld
#### json
```json
{
  "@context": {
    "prov": "http://www.w3.org/ns/prov#",
    "dcterms": "http://purl.org/dc/terms/",
    "schema": "https://schema.org/",
    "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
    "type": "@type",
    "id": "@id",
    "title": "dcterms:title",
    "description": "dcterms:description",
    "source_dataset": "dcterms:source",
    "agents": "prov:Agent",
    "entities": "prov:Entity",
    "activities": "prov:Activity",
    "used": {
      "@id": "prov:used",
      "@type": "@id"
    },
    "generated": {
      "@id": "prov:generated",
      "@type": "@id"
    },
    "wasAssociatedWith": {
      "@id": "prov:wasAssociatedWith",
      "@type": "@id"
    },
    "wasAttributedTo": {
      "@id": "prov:wasAttributedTo",
      "@type": "@id"
    },
    "lineage": "prov:wasDerivedFrom",
    "parameters": "ebv:method_parameters",
    "method_summary": "ebv:method_summary",
    "derived_indicator_summary": "ebv:derived_indicator_summary",
    "quality_and_limitations": "ebv:quality_and_limitations"
  },
  "type": "PhenologyIndicatorProvenance",
  "title": "Provenance for Finland EBV phenology indicators",
  "description": "Lineage record describing how the Phenology Indicators example was derived from the original NetCDF EBV phenology dataset using national-scale annual spatial aggregation and temporal analysis.",
  "source_dataset": {
    "id": "geobon-dataset-10-v2",
    "title": "Vegetation Phenology in Finland",
    "doi": "10.25829/xf8ek6",
    "product_version": "2",
    "date_created": "2020-11-04",
    "date_issued": "2023-07-18",
    "license": "https://creativecommons.org/licenses/by/4.0",
    "source_file": "/10/public/bottcher_ecofun_id10_20230718_v2.nc",
    "download": "portal.geobon.org/data/upload/10/public/bottcher_ecofun_id10_20230718_v2.nc",
    "metadata_json": "portal.geobon.org/data/upload/10/public/metadata_v2.json",
    "metadata_xml": "portal.geobon.org/data/upload/10/public/metadata_v2.xml",
    "spatial_scope": "Finland",
    "spatial_resolution": {
      "lat_resolution": "0.066428063829064 degree",
      "lon_resolution": "0.066428063829064 degree"
    },
    "geospatial_bounds": {
      "crs": "EPSG:4326",
      "lat_min": 57.7532613743371,
      "lat_max": 71.171730267808,
      "lon_min": 14.1011663430375,
      "lon_max": 35.2252906406799
    },
    "temporal_coverage": {
      "time_coverage_resolution": "P0001-00-00",
      "time_coverage_start": "2001-01-01",
      "time_coverage_end": "2018-01-01"
    },
    "ebv": {
      "class": "Ecosystem functioning",
      "name": "Ecosystem phenology",
      "domain": [
        "Terrestrial"
      ],
      "entity_type": "Ecosystems",
      "entity_scope": "Coniferous and deciduous forests",
      "entity_names": [
        "Coniferous",
        "Deciduous"
      ],
      "metric": {
        ":standard_name": "Start of the vegetation active period (VAP)",
        ":long_name": "The start of the vegetation active period (VAP) in coniferous forest (Day of Year) is defined as the day when the trees start to photosynthesize in spring. The data set was derived from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation of Fractional Snow Cover. The day when snow cover decreases during spring melt was used as a proxy indicator for the beginning of the start of the vegetation active period. The start of the vegetation active period (VAP) in deciduous vegetation (Day of Year) is defined as the day when deciduous trees unfold new leaves in spring. It is also often referred to as the green-up or greening day. The data set was derived from time series of the Normalized Difference Water Index (NDWI) calculated from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation.",
        ":units": "Day of year"
      }
    }
  },
  "agents": [
    {
      "id": "agent:syke",
      "type": "Organization",
      "name": "Finnish Environment Institute (SYKE)",
      "role": "original data creator and publisher"
    },
    {
      "id": "agent:kristin-bottcher",
      "type": "Person",
      "name": "Kristin Böttcher",
      "institution": "The Finnish Environment Institute (SYKE)",
      "role": "dataset creator"
    },
    {
      "id": "agent:modis-terra",
      "type": "InstrumentPlatform",
      "name": "MODIS Terra",
      "role": "satellite observation source"
    },
    {
      "id": "agent:phenology-indicator-script",
      "type": "SoftwareAgent",
      "name": "Phenology indicator derivation script",
      "role": "derivation of temporal phenology indicators from the NetCDF cube"
    },
    {
      "id": "agent:ogc-bblocks-workflow",
      "type": "SoftwareAgent",
      "name": "OGC Building Blocks workflow",
      "role": "validation, annotation and publication of Building Block examples"
    }
  ],
  "entities": [
    {
      "id": "entity:modis-observations",
      "type": "prov:Entity",
      "label": "MODIS Terra satellite observations",
      "description": "Remote sensing observations used as source input for the original VAP products."
    },
    {
      "id": "entity:source-netcdf",
      "type": "prov:Entity",
      "label": "Original EBV phenology NetCDF cube",
      "format": "NetCDF",
      "path": "/10/public/bottcher_ecofun_id10_20230718_v2.nc",
      "wasAttributedTo": "agent:syke"
    },
    {
      "id": "entity:source-metadata-json",
      "type": "prov:Entity",
      "label": "Dataset metadata JSON",
      "format": "JSON",
      "path": "portal.geobon.org/data/upload/10/public/metadata_v2.json",
      "wasAttributedTo": "agent:syke"
    },
    {
      "id": "entity:annual-spatial-means",
      "type": "prov:Entity",
      "label": "Annual spatial means",
      "description": "Intermediate table with one national-scale annual mean VAP day-of-year per EBV entity."
    },
    {
      "id": "entity:phenology-indicators-json",
      "type": "prov:Entity",
      "label": "Derived phenology indicators JSON",
      "format": "JSON",
      "path": "_sources/phenology-indicators/examples/finland-phenology-indicators-full-series.json"
    },
    {
      "id": "entity:phenology-indicators-provenance",
      "type": "prov:Entity",
      "label": "Provenance record for derived phenology indicators",
      "format": "JSON",
      "path": "_sources/data-provenance/examples/finland-phenology-indicators-provenance.json"
    }
  ],
  "activities": [
    {
      "id": "activity:remote-sensing-acquisition",
      "type": "prov:Activity",
      "label": "Acquire MODIS observations",
      "generated": "entity:modis-observations",
      "wasAssociatedWith": "agent:modis-terra"
    },
    {
      "id": "activity:derive-vap-products",
      "type": "prov:Activity",
      "label": "Derive annual VAP raster products",
      "used": [
        "entity:modis-observations"
      ],
      "generated": "entity:source-netcdf",
      "wasAssociatedWith": "agent:syke",
      "method_summary": [
        "MODIS Level 1B data were calibrated to top-of-atmosphere reflectances.",
        "Fractional Snow Cover (FSC) and NDWI were calculated.",
        "Cloud covered observations were removed.",
        "For coniferous forest, FSC time series were used as proxy for VAP onset.",
        "For deciduous vegetation, NDWI time series were used.",
        "Yearly VAP maps were smoothed with a median filter and open water areas were masked."
      ]
    },
    {
      "id": "activity:read-source-cube",
      "type": "prov:Activity",
      "label": "Read EBV cube from NetCDF",
      "used": [
        "entity:source-netcdf",
        "entity:source-metadata-json"
      ],
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "source_variable": "metric_1/ebv_cube",
        "dimensions": [
          "entity",
          "time",
          "lat",
          "lon"
        ],
        "fill_value_handling": "Fill values were converted to null / NaN before aggregation."
      }
    },
    {
      "id": "activity:aggregate-annual-spatial-means",
      "type": "prov:Activity",
      "label": "Aggregate annual national-scale spatial means",
      "used": [
        "entity:source-netcdf"
      ],
      "generated": "entity:annual-spatial-means",
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "spatial_aggregation": "mean over valid raster cells",
        "spatial_scope": "Finland",
        "entities": [
          "Coniferous",
          "Deciduous"
        ],
        "years": [
          2001,
          2002,
          2003,
          2004,
          2005,
          2006,
          2007,
          2008,
          2009,
          2010,
          2011,
          2012,
          2013,
          2014,
          2015,
          2016,
          2017,
          2018
        ]
      }
    },
    {
      "id": "activity:compute-phenology-indicators",
      "type": "prov:Activity",
      "label": "Compute temporal phenology indicators",
      "used": [
        "entity:annual-spatial-means"
      ],
      "generated": "entity:phenology-indicators-json",
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "linear_trend": "Ordinary least squares regression of annual mean VAP day-of-year against year.",
        "anomaly_index": "Annual anomaly against a 2001–2010 baseline mean and standard deviation.",
        "change_point": "Two-segment linear regression selected by minimum sum of squared errors, with at least five years per segment.",
        "acceleration": "Quadratic fit to annual mean VAP day-of-year."
      }
    },
    {
      "id": "activity:publish-building-block-examples",
      "type": "prov:Activity",
      "label": "Publish Building Block examples",
      "used": [
        "entity:phenology-indicators-json",
        "entity:phenology-indicators-provenance"
      ],
      "wasAssociatedWith": "agent:ogc-bblocks-workflow"
    }
  ],
  "lineage": [
    {
      "subject": "entity:modis-observations",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:remote-sensing-acquisition"
    },
    {
      "subject": "entity:source-netcdf",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:derive-vap-products"
    },
    {
      "subject": "activity:derive-vap-products",
      "predicate": "prov:used",
      "object": "entity:modis-observations"
    },
    {
      "subject": "entity:annual-spatial-means",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:aggregate-annual-spatial-means"
    },
    {
      "subject": "activity:aggregate-annual-spatial-means",
      "predicate": "prov:used",
      "object": "entity:source-netcdf"
    },
    {
      "subject": "entity:phenology-indicators-json",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:compute-phenology-indicators"
    },
    {
      "subject": "activity:compute-phenology-indicators",
      "predicate": "prov:used",
      "object": "entity:annual-spatial-means"
    }
  ],
  "derived_indicator_summary": [
    {
      "entity": "ConiferousForest",
      "entity_label": "Coniferous",
      "linear_trend": {
        "slope_days_per_year": 0.0939,
        "intercept": -81.7329,
        "r_squared": 0.0051,
        "p_value": 0.77892,
        "interpretation": {
          "climate_signal": "stable_or_weak_trend",
          "confidence": "low",
          "summary": "Negative slope means earlier VAP onset over time; positive slope means later VAP onset. This is a national-scale spatial mean over valid cells."
        }
      },
      "change_point": {
        "change_point_year": 2013,
        "method": "two_segment_linear_sse",
        "sse_improvement_vs_single_trend": 0.2079,
        "before_slope_days_per_year": 0.6458,
        "after_slope_days_per_year": 2.3334,
        "confidence": "low"
      },
      "acceleration": {
        "quadratic_coefficient": -0.012569,
        "acceleration_days_per_year2": -0.025137,
        "r_squared": 0.007,
        "interpretation": {
          "summary": "The acceleration indicator is based on a quadratic fit to the annual spatial mean. It should be interpreted cautiously for an 18-year series.",
          "confidence": "low"
        }
      }
    },
    {
      "entity": "DeciduousForest",
      "entity_label": "Deciduous",
      "linear_trend": {
        "slope_days_per_year": 0.086,
        "intercept": -32.662,
        "r_squared": 0.0115,
        "p_value": 0.67173,
        "interpretation": {
          "climate_signal": "stable_or_weak_trend",
          "confidence": "low",
          "summary": "Negative slope means earlier VAP onset over time; positive slope means later VAP onset. This is a national-scale spatial mean over valid cells."
        }
      },
      "change_point": {
        "change_point_year": 2009,
        "method": "two_segment_linear_sse",
        "sse_improvement_vs_single_trend": 0.1274,
        "before_slope_days_per_year": 0.4032,
        "after_slope_days_per_year": 0.6396,
        "confidence": "low"
      },
      "acceleration": {
        "quadratic_coefficient": 0.028646,
        "acceleration_days_per_year2": 0.057292,
        "r_squared": 0.0388,
        "interpretation": {
          "summary": "The acceleration indicator is based on a quadratic fit to the annual spatial mean. It should be interpreted cautiously for an 18-year series.",
          "confidence": "low"
        }
      }
    }
  ],
  "quality_and_limitations": {
    "representativeness": "The indicator derivation uses national-scale spatial means. It is suitable for demonstrating temporal indicator structure, but it does not represent local spatial heterogeneity.",
    "uncertainty": "The provenance record documents method and source lineage, but does not propagate pixel-level uncertainty.",
    "policy_use": "The record supports transparency and reproducibility. Policy-grade interpretation would require formal uncertainty assessment, validation and explicit alignment with reporting requirements."
  }
}
```

#### jsonld
```jsonld
{
  "@context": [
    "http://localhost:9090/register/build-local/annotated/ebv/phenology/data-provenance/context.jsonld",
    {
      "prov": "http://www.w3.org/ns/prov#",
      "dcterms": "http://purl.org/dc/terms/",
      "schema": "https://schema.org/",
      "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
      "type": "@type",
      "id": "@id",
      "title": "dcterms:title",
      "description": "dcterms:description",
      "source_dataset": "dcterms:source",
      "agents": "prov:Agent",
      "entities": "prov:Entity",
      "activities": "prov:Activity",
      "used": {
        "@id": "prov:used",
        "@type": "@id"
      },
      "generated": {
        "@id": "prov:generated",
        "@type": "@id"
      },
      "wasAssociatedWith": {
        "@id": "prov:wasAssociatedWith",
        "@type": "@id"
      },
      "wasAttributedTo": {
        "@id": "prov:wasAttributedTo",
        "@type": "@id"
      },
      "lineage": "prov:wasDerivedFrom",
      "parameters": "ebv:method_parameters",
      "method_summary": "ebv:method_summary",
      "derived_indicator_summary": "ebv:derived_indicator_summary",
      "quality_and_limitations": "ebv:quality_and_limitations"
    }
  ],
  "type": "PhenologyIndicatorProvenance",
  "title": "Provenance for Finland EBV phenology indicators",
  "description": "Lineage record describing how the Phenology Indicators example was derived from the original NetCDF EBV phenology dataset using national-scale annual spatial aggregation and temporal analysis.",
  "source_dataset": {
    "id": "geobon-dataset-10-v2",
    "title": "Vegetation Phenology in Finland",
    "doi": "10.25829/xf8ek6",
    "product_version": "2",
    "date_created": "2020-11-04",
    "date_issued": "2023-07-18",
    "license": "https://creativecommons.org/licenses/by/4.0",
    "source_file": "/10/public/bottcher_ecofun_id10_20230718_v2.nc",
    "download": "portal.geobon.org/data/upload/10/public/bottcher_ecofun_id10_20230718_v2.nc",
    "metadata_json": "portal.geobon.org/data/upload/10/public/metadata_v2.json",
    "metadata_xml": "portal.geobon.org/data/upload/10/public/metadata_v2.xml",
    "spatial_scope": "Finland",
    "spatial_resolution": {
      "lat_resolution": "0.066428063829064 degree",
      "lon_resolution": "0.066428063829064 degree"
    },
    "geospatial_bounds": {
      "crs": "EPSG:4326",
      "lat_min": 57.7532613743371,
      "lat_max": 71.171730267808,
      "lon_min": 14.1011663430375,
      "lon_max": 35.2252906406799
    },
    "temporal_coverage": {
      "time_coverage_resolution": "P0001-00-00",
      "time_coverage_start": "2001-01-01",
      "time_coverage_end": "2018-01-01"
    },
    "ebv": {
      "class": "Ecosystem functioning",
      "name": "Ecosystem phenology",
      "domain": [
        "Terrestrial"
      ],
      "entity_type": "Ecosystems",
      "entity_scope": "Coniferous and deciduous forests",
      "entity_names": [
        "Coniferous",
        "Deciduous"
      ],
      "metric": {
        ":standard_name": "Start of the vegetation active period (VAP)",
        ":long_name": "The start of the vegetation active period (VAP) in coniferous forest (Day of Year) is defined as the day when the trees start to photosynthesize in spring. The data set was derived from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation of Fractional Snow Cover. The day when snow cover decreases during spring melt was used as a proxy indicator for the beginning of the start of the vegetation active period. The start of the vegetation active period (VAP) in deciduous vegetation (Day of Year) is defined as the day when deciduous trees unfold new leaves in spring. It is also often referred to as the green-up or greening day. The data set was derived from time series of the Normalized Difference Water Index (NDWI) calculated from Moderate Resolution Imaging Spetroradiometer (MODIS) satellite observation.",
        ":units": "Day of year"
      }
    }
  },
  "agents": [
    {
      "id": "agent:syke",
      "type": "Organization",
      "name": "Finnish Environment Institute (SYKE)",
      "role": "original data creator and publisher"
    },
    {
      "id": "agent:kristin-bottcher",
      "type": "Person",
      "name": "Kristin B\u00f6ttcher",
      "institution": "The Finnish Environment Institute (SYKE)",
      "role": "dataset creator"
    },
    {
      "id": "agent:modis-terra",
      "type": "InstrumentPlatform",
      "name": "MODIS Terra",
      "role": "satellite observation source"
    },
    {
      "id": "agent:phenology-indicator-script",
      "type": "SoftwareAgent",
      "name": "Phenology indicator derivation script",
      "role": "derivation of temporal phenology indicators from the NetCDF cube"
    },
    {
      "id": "agent:ogc-bblocks-workflow",
      "type": "SoftwareAgent",
      "name": "OGC Building Blocks workflow",
      "role": "validation, annotation and publication of Building Block examples"
    }
  ],
  "entities": [
    {
      "id": "entity:modis-observations",
      "type": "prov:Entity",
      "label": "MODIS Terra satellite observations",
      "description": "Remote sensing observations used as source input for the original VAP products."
    },
    {
      "id": "entity:source-netcdf",
      "type": "prov:Entity",
      "label": "Original EBV phenology NetCDF cube",
      "format": "NetCDF",
      "path": "/10/public/bottcher_ecofun_id10_20230718_v2.nc",
      "wasAttributedTo": "agent:syke"
    },
    {
      "id": "entity:source-metadata-json",
      "type": "prov:Entity",
      "label": "Dataset metadata JSON",
      "format": "JSON",
      "path": "portal.geobon.org/data/upload/10/public/metadata_v2.json",
      "wasAttributedTo": "agent:syke"
    },
    {
      "id": "entity:annual-spatial-means",
      "type": "prov:Entity",
      "label": "Annual spatial means",
      "description": "Intermediate table with one national-scale annual mean VAP day-of-year per EBV entity."
    },
    {
      "id": "entity:phenology-indicators-json",
      "type": "prov:Entity",
      "label": "Derived phenology indicators JSON",
      "format": "JSON",
      "path": "_sources/phenology-indicators/examples/finland-phenology-indicators-full-series.json"
    },
    {
      "id": "entity:phenology-indicators-provenance",
      "type": "prov:Entity",
      "label": "Provenance record for derived phenology indicators",
      "format": "JSON",
      "path": "_sources/data-provenance/examples/finland-phenology-indicators-provenance.json"
    }
  ],
  "activities": [
    {
      "id": "activity:remote-sensing-acquisition",
      "type": "prov:Activity",
      "label": "Acquire MODIS observations",
      "generated": "entity:modis-observations",
      "wasAssociatedWith": "agent:modis-terra"
    },
    {
      "id": "activity:derive-vap-products",
      "type": "prov:Activity",
      "label": "Derive annual VAP raster products",
      "used": [
        "entity:modis-observations"
      ],
      "generated": "entity:source-netcdf",
      "wasAssociatedWith": "agent:syke",
      "method_summary": [
        "MODIS Level 1B data were calibrated to top-of-atmosphere reflectances.",
        "Fractional Snow Cover (FSC) and NDWI were calculated.",
        "Cloud covered observations were removed.",
        "For coniferous forest, FSC time series were used as proxy for VAP onset.",
        "For deciduous vegetation, NDWI time series were used.",
        "Yearly VAP maps were smoothed with a median filter and open water areas were masked."
      ]
    },
    {
      "id": "activity:read-source-cube",
      "type": "prov:Activity",
      "label": "Read EBV cube from NetCDF",
      "used": [
        "entity:source-netcdf",
        "entity:source-metadata-json"
      ],
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "source_variable": "metric_1/ebv_cube",
        "dimensions": [
          "entity",
          "time",
          "lat",
          "lon"
        ],
        "fill_value_handling": "Fill values were converted to null / NaN before aggregation."
      }
    },
    {
      "id": "activity:aggregate-annual-spatial-means",
      "type": "prov:Activity",
      "label": "Aggregate annual national-scale spatial means",
      "used": [
        "entity:source-netcdf"
      ],
      "generated": "entity:annual-spatial-means",
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "spatial_aggregation": "mean over valid raster cells",
        "spatial_scope": "Finland",
        "entities": [
          "Coniferous",
          "Deciduous"
        ],
        "years": [
          2001,
          2002,
          2003,
          2004,
          2005,
          2006,
          2007,
          2008,
          2009,
          2010,
          2011,
          2012,
          2013,
          2014,
          2015,
          2016,
          2017,
          2018
        ]
      }
    },
    {
      "id": "activity:compute-phenology-indicators",
      "type": "prov:Activity",
      "label": "Compute temporal phenology indicators",
      "used": [
        "entity:annual-spatial-means"
      ],
      "generated": "entity:phenology-indicators-json",
      "wasAssociatedWith": "agent:phenology-indicator-script",
      "parameters": {
        "linear_trend": "Ordinary least squares regression of annual mean VAP day-of-year against year.",
        "anomaly_index": "Annual anomaly against a 2001\u20132010 baseline mean and standard deviation.",
        "change_point": "Two-segment linear regression selected by minimum sum of squared errors, with at least five years per segment.",
        "acceleration": "Quadratic fit to annual mean VAP day-of-year."
      }
    },
    {
      "id": "activity:publish-building-block-examples",
      "type": "prov:Activity",
      "label": "Publish Building Block examples",
      "used": [
        "entity:phenology-indicators-json",
        "entity:phenology-indicators-provenance"
      ],
      "wasAssociatedWith": "agent:ogc-bblocks-workflow"
    }
  ],
  "lineage": [
    {
      "subject": "entity:modis-observations",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:remote-sensing-acquisition"
    },
    {
      "subject": "entity:source-netcdf",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:derive-vap-products"
    },
    {
      "subject": "activity:derive-vap-products",
      "predicate": "prov:used",
      "object": "entity:modis-observations"
    },
    {
      "subject": "entity:annual-spatial-means",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:aggregate-annual-spatial-means"
    },
    {
      "subject": "activity:aggregate-annual-spatial-means",
      "predicate": "prov:used",
      "object": "entity:source-netcdf"
    },
    {
      "subject": "entity:phenology-indicators-json",
      "predicate": "prov:wasGeneratedBy",
      "object": "activity:compute-phenology-indicators"
    },
    {
      "subject": "activity:compute-phenology-indicators",
      "predicate": "prov:used",
      "object": "entity:annual-spatial-means"
    }
  ],
  "derived_indicator_summary": [
    {
      "entity": "ConiferousForest",
      "entity_label": "Coniferous",
      "linear_trend": {
        "slope_days_per_year": 0.0939,
        "intercept": -81.7329,
        "r_squared": 0.0051,
        "p_value": 0.77892,
        "interpretation": {
          "climate_signal": "stable_or_weak_trend",
          "confidence": "low",
          "summary": "Negative slope means earlier VAP onset over time; positive slope means later VAP onset. This is a national-scale spatial mean over valid cells."
        }
      },
      "change_point": {
        "change_point_year": 2013,
        "method": "two_segment_linear_sse",
        "sse_improvement_vs_single_trend": 0.2079,
        "before_slope_days_per_year": 0.6458,
        "after_slope_days_per_year": 2.3334,
        "confidence": "low"
      },
      "acceleration": {
        "quadratic_coefficient": -0.012569,
        "acceleration_days_per_year2": -0.025137,
        "r_squared": 0.007,
        "interpretation": {
          "summary": "The acceleration indicator is based on a quadratic fit to the annual spatial mean. It should be interpreted cautiously for an 18-year series.",
          "confidence": "low"
        }
      }
    },
    {
      "entity": "DeciduousForest",
      "entity_label": "Deciduous",
      "linear_trend": {
        "slope_days_per_year": 0.086,
        "intercept": -32.662,
        "r_squared": 0.0115,
        "p_value": 0.67173,
        "interpretation": {
          "climate_signal": "stable_or_weak_trend",
          "confidence": "low",
          "summary": "Negative slope means earlier VAP onset over time; positive slope means later VAP onset. This is a national-scale spatial mean over valid cells."
        }
      },
      "change_point": {
        "change_point_year": 2009,
        "method": "two_segment_linear_sse",
        "sse_improvement_vs_single_trend": 0.1274,
        "before_slope_days_per_year": 0.4032,
        "after_slope_days_per_year": 0.6396,
        "confidence": "low"
      },
      "acceleration": {
        "quadratic_coefficient": 0.028646,
        "acceleration_days_per_year2": 0.057292,
        "r_squared": 0.0388,
        "interpretation": {
          "summary": "The acceleration indicator is based on a quadratic fit to the annual spatial mean. It should be interpreted cautiously for an 18-year series.",
          "confidence": "low"
        }
      }
    }
  ],
  "quality_and_limitations": {
    "representativeness": "The indicator derivation uses national-scale spatial means. It is suitable for demonstrating temporal indicator structure, but it does not represent local spatial heterogeneity.",
    "uncertainty": "The provenance record documents method and source lineage, but does not propagate pixel-level uncertainty.",
    "policy_use": "The record supports transparency and reproducibility. Policy-grade interpretation would require formal uncertainty assessment, validation and explicit alignment with reporting requirements."
  }
}
```

#### ttl
```ttl
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix ebv: <https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#> .
@prefix prov: <http://www.w3.org/ns/prov#> .

<activity:aggregate-annual-spatial-means> a prov:Activity ;
    prov:generated <entity:annual-spatial-means> ;
    prov:used <entity:source-netcdf> ;
    prov:wasAssociatedWith <agent:phenology-indicator-script> ;
    ebv:method_parameters [ prov:Entity "Coniferous",
                "Deciduous" ] .

<activity:compute-phenology-indicators> a prov:Activity ;
    prov:generated <entity:phenology-indicators-json> ;
    prov:used <entity:annual-spatial-means> ;
    prov:wasAssociatedWith <agent:phenology-indicator-script> ;
    ebv:method_parameters [ ] .

<activity:derive-vap-products> a prov:Activity ;
    prov:generated <entity:source-netcdf> ;
    prov:used <entity:modis-observations> ;
    prov:wasAssociatedWith <agent:syke> ;
    ebv:method_summary "Cloud covered observations were removed.",
        "For coniferous forest, FSC time series were used as proxy for VAP onset.",
        "For deciduous vegetation, NDWI time series were used.",
        "Fractional Snow Cover (FSC) and NDWI were calculated.",
        "MODIS Level 1B data were calibrated to top-of-atmosphere reflectances.",
        "Yearly VAP maps were smoothed with a median filter and open water areas were masked." .

<activity:publish-building-block-examples> a prov:Activity ;
    prov:used <entity:phenology-indicators-json>,
        <entity:phenology-indicators-provenance> ;
    prov:wasAssociatedWith <agent:ogc-bblocks-workflow> .

<activity:read-source-cube> a prov:Activity ;
    prov:used <entity:source-metadata-json>,
        <entity:source-netcdf> ;
    prov:wasAssociatedWith <agent:phenology-indicator-script> ;
    ebv:method_parameters [ ] .

<activity:remote-sensing-acquisition> a prov:Activity ;
    prov:generated <entity:modis-observations> ;
    prov:wasAssociatedWith <agent:modis-terra> .

<agent:kristin-bottcher> a <file:///workspace/Person> .

<file:///workspace/geobon-dataset-10-v2> dcterms:title "Vegetation Phenology in Finland" ;
    ebv: [ ] .

<agent:modis-terra> a <file:///workspace/InstrumentPlatform> .

<agent:ogc-bblocks-workflow> a <file:///workspace/SoftwareAgent> .

<entity:phenology-indicators-provenance> a prov:Entity .

<entity:source-metadata-json> a prov:Entity ;
    prov:wasAttributedTo <agent:syke> .

<entity:annual-spatial-means> a prov:Entity ;
    dcterms:description "Intermediate table with one national-scale annual mean VAP day-of-year per EBV entity." .

<entity:modis-observations> a prov:Entity ;
    dcterms:description "Remote sensing observations used as source input for the original VAP products." .

<entity:phenology-indicators-json> a prov:Entity .

<agent:phenology-indicator-script> a <file:///workspace/SoftwareAgent> .

<agent:syke> a <file:///workspace/Organization> .

<entity:source-netcdf> a prov:Entity ;
    prov:wasAttributedTo <agent:syke> .

[] a <file:///workspace/PhenologyIndicatorProvenance> ;
    dcterms:description "Lineage record describing how the Phenology Indicators example was derived from the original NetCDF EBV phenology dataset using national-scale annual spatial aggregation and temporal analysis." ;
    dcterms:source <file:///workspace/geobon-dataset-10-v2> ;
    dcterms:title "Provenance for Finland EBV phenology indicators" ;
    prov:Activity <activity:aggregate-annual-spatial-means>,
        <activity:compute-phenology-indicators>,
        <activity:derive-vap-products>,
        <activity:publish-building-block-examples>,
        <activity:read-source-cube>,
        <activity:remote-sensing-acquisition> ;
    prov:Agent <agent:kristin-bottcher>,
        <agent:modis-terra>,
        <agent:ogc-bblocks-workflow>,
        <agent:phenology-indicator-script>,
        <agent:syke> ;
    prov:Entity <entity:annual-spatial-means>,
        <entity:modis-observations>,
        <entity:phenology-indicators-json>,
        <entity:phenology-indicators-provenance>,
        <entity:source-metadata-json>,
        <entity:source-netcdf> ;
    prov:wasDerivedFrom [ ],
        [ ],
        [ ],
        [ ],
        [ ],
        [ ],
        [ ] ;
    ebv:derived_indicator_summary [ ],
        [ ] ;
    ebv:quality_and_limitations [ ] .


```

## Schema

```yaml
$schema: https://json-schema.org/draft/2020-12/schema
description: Data provenance and lineage information for EBV phenology products and
  derived phenology indicators.
type: object
properties:
  type:
    type: string
    x-jsonld-id: http://www.w3.org/1999/02/22-rdf-syntax-ns#type
  title:
    type: string
    x-jsonld-id: http://purl.org/dc/terms/title
  description:
    type: string
    x-jsonld-id: http://purl.org/dc/terms/description
  source_dataset:
    type: object
    x-jsonld-id: http://purl.org/dc/terms/source
  agents:
    type: array
    x-jsonld-id: http://www.w3.org/ns/prov#Agent
  entities:
    type: array
    x-jsonld-id: http://www.w3.org/ns/prov#Entity
  activities:
    type: array
    x-jsonld-id: http://www.w3.org/ns/prov#Activity
  lineage:
    type: array
    x-jsonld-id: http://www.w3.org/ns/prov#wasDerivedFrom
  derived_indicator_summary:
    type: array
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#derived_indicator_summary
  quality_and_limitations:
    type: object
    x-jsonld-id: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#quality_and_limitations
required:
- type
- title
- source_dataset
- agents
- entities
- activities
- lineage
x-jsonld-prefixes:
  dcterms: http://purl.org/dc/terms/
  prov: http://www.w3.org/ns/prov#
  ebv: https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#

```

Links to the schema:

* YAML version: [schema.yaml](http://localhost:9090/register/build-local/annotated/ebv/phenology/data-provenance/schema.json)
* JSON version: [schema.json](http://localhost:9090/register/build-local/annotated/ebv/phenology/data-provenance/schema.yaml)


# JSON-LD Context

```jsonld
{
  "@context": {
    "type": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
    "title": "dcterms:title",
    "description": "dcterms:description",
    "source_dataset": "dcterms:source",
    "agents": "prov:Agent",
    "entities": "prov:Entity",
    "activities": "prov:Activity",
    "lineage": "prov:wasDerivedFrom",
    "derived_indicator_summary": "ebv:derived_indicator_summary",
    "quality_and_limitations": "ebv:quality_and_limitations",
    "dcterms": "http://purl.org/dc/terms/",
    "prov": "http://www.w3.org/ns/prov#",
    "ebv": "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#",
    "@version": 1.1
  }
}
```

You can find the full JSON-LD context here:
[context.jsonld](http://localhost:9090/register/build-local/annotated/ebv/phenology/data-provenance/context.jsonld)

## Sources

* [W3C PROV-O](https://www.w3.org/TR/prov-o/)

# For developers

The source code for this Building Block can be found in the following repository:

* URL: [https://github.com/ogcincubator/bblocks-ebv-bioclima](https://github.com/ogcincubator/bblocks-ebv-bioclima)
* Path: `_sources/data-provenance`

