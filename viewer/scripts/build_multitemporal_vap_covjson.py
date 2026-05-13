#!/usr/bin/env python3
"""
Build multitemporal CoverageJSON observations from the annual binary VAP layers.

Inputs expected:
  viewer/data/summary.json
  viewer/data/bin/coniferous_2001.bin ... coniferous_2018.bin
  viewer/data/bin/deciduous_2001.bin ... deciduous_2018.bin

Outputs:
  data/observations/finland-vap-coniferous-2001-2018.covjson
  data/observations/finland-vap-deciduous-2001-2018.covjson
"""

from __future__ import annotations

import json
import struct
from pathlib import Path


VOCAB = "https://maytetoscano.github.io/bblock-ebv-bioclima/vocab/#"


def main() -> None:
    summary_path = Path("viewer/data/summary.json")
    if not summary_path.exists():
        raise FileNotFoundError("Missing viewer/data/summary.json")

    summary = json.loads(summary_path.read_text(encoding="utf-8"))

    for entity in ["coniferous", "deciduous"]:
        coverage = build_coverage(summary, entity)
        output = Path(f"data/observations/finland-vap-{entity}-2001-2018.covjson")
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(coverage, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        print(f"Wrote {output}")


def build_coverage(summary: dict, entity: str) -> dict:
    years = summary["years"]
    width = int(summary["width"])
    height = int(summary["height"])
    bounds = summary["bounds"]
    fill_value = int(summary.get("fillValue", -32768))
    lat_min, lon_min = bounds[0]
    lat_max, lon_max = bounds[1]

    values = []
    for year in years:
        path = Path(f"viewer/data/bin/{entity}_{year}.bin")
        raw = path.read_bytes()
        layer = list(struct.unpack("<" + "h" * (len(raw) // 2), raw))
        if len(layer) != width * height:
            raise ValueError(f"Unexpected size for {path}: {len(layer)}")
        values.extend(layer)

    label_en = f"VAP {entity} 2001-2018 time series"
    label_es = f"VAP {'coníferas' if entity == 'coniferous' else 'caducifolias'} 2001-2018 serie temporal"

    return {
        "type": "Coverage",
        "domain": {
            "type": "Domain",
            "domainType": "Grid",
            "axes": {
                "t": {"values": [f"{year}-01-01T00:00:00Z" for year in years]},
                "y": {"start": lat_min, "stop": lat_max, "num": height},
                "x": {"start": lon_min, "stop": lon_max, "num": width}
            },
            "referencing": [
                {
                    "coordinates": ["y", "x"],
                    "system": {
                        "type": "GeographicCRS",
                        "id": "http://www.opengis.net/def/crs/EPSG/0/4326"
                    }
                },
                {
                    "coordinates": ["t"],
                    "system": {
                        "type": "TemporalRS",
                        "calendar": "Gregorian"
                    }
                }
            ]
        },
        "parameters": {
            "vap_doy": {
                "type": "Parameter",
                "observedProperty": {
                    "id": VOCAB + "vap_doy",
                    "label": {
                        "en": "Start of VAP (Day of Year)",
                        "es": "Inicio del periodo activo de vegetación (día del año)"
                    }
                },
                "unit": {
                    "label": {
                        "en": "Day of year",
                        "es": "Día del año"
                    }
                }
            }
        },
        "ranges": {
            "vap_doy": {
                "type": "NdArray",
                "dataType": "integer",
                "axisNames": ["t", "y", "x"],
                "shape": [len(years), height, width],
                "values": values,
                "nodata": fill_value
            }
        },
        "metadata": {
            "title": {"en": label_en, "es": label_es},
            "entity": entity,
            "years": years
        }
    }


if __name__ == "__main__":
    main()
