# CovJSON Parameter

Describes WHAT is measured. Key feature: **native multi-language** via i18n objects + **semantic link** via `observedProperty.id` → ontology URI.

## Finland VAP Parameter
```json
{
  "type": "Parameter",
  "description": {
    "en": "Start of Vegetation Active Period for coniferous forests",
    "es": "Inicio del Periodo Activo de Vegetación para bosques de coníferas",
    "zh": "针叶林植被活跃期起始",
    "ro": "Începutul Perioadei Active a Vegetației pentru păduri de conifere"
  },
  "unit": {
    "label": {"en": "Day of Year", "es": "Día del Año"},
    "symbol": {"value": "d"}
  },
  "observedProperty": {
    "id": "https://w3id.org/ogc/hosted/ebv-phenology/StartOfVAP",
    "label": {"en": "Start of VAP", "es": "Inicio del PAV", "zh": "VAP起始", "ro": "Începutul VAP"}
  }
}
```

## observedProperty → Ontology (bidirectional)
The `id` URI points to an OWL class in the EBV Ontology. This creates a structural semantic link.
