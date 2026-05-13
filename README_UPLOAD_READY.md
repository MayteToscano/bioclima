# BIoClima final upload-ready package

This folder contains the final files to upload to GitHub.

## Upload / replace these folders in the repository

```text
viewer/
data/
scripts/
.github/workflows/pages.yml
```

Important: `.github` is a hidden folder on macOS Finder. If you do not see it after unzipping, use:

```text
Cmd + Shift + .
```

or open the folder from VS Code / GitHub web editor.

A visible copy of the workflow is also included here:

```text
VISIBLE_COPY_OF_WORKFLOW/pages.yml
```

If you cannot see `.github`, manually create this path in GitHub:

```text
.github/workflows/pages.yml
```

and paste the content from:

```text
VISIBLE_COPY_OF_WORKFLOW/pages.yml
```

## What is included

### Viewer

```text
viewer/index.html
viewer/app.js
viewer/style.css
viewer/ontology.html
```

The viewer now includes:

- Time slider;
- Play/Pause button for temporal CoverageJSON;
- Semantic link on the parameter/attribute name itself;
- Ontology term page.

### Data

```text
data/catalog.json
data/ontology-index.json
data/observations/finland-vap-coniferous-2001-2018.covjson
data/observations/finland-vap-deciduous-2001-2018.covjson
data/indicators/
data/categorical/
```

The Play/Pause button only appears for:

```text
finland-vap-coniferous-2001-2018
finland-vap-deciduous-2001-2018
```

because those files have a temporal `t` axis.

### Scripts

```text
scripts/build_ontology_index.py
scripts/build_multitemporal_vap_covjson.py
```

## After deployment

Open:

```text
https://maytetoscano.github.io/bioclima/viewer/?coverage=finland-vap-coniferous-2001-2018&parameter=vap_doy&lang=en
```

Then force refresh:

```text
Cmd + Shift + R
```

## Checks

These URLs must contain the new code/data:

```text
https://maytetoscano.github.io/bioclima/viewer/app.js
```

It must contain:

```text
playButton
timeControls
semanticInfoForParameter
```

And:

```text
https://maytetoscano.github.io/bioclima/data/catalog.json
```

It must contain:

```text
finland-vap-coniferous-2001-2018
finland-vap-deciduous-2001-2018
```
