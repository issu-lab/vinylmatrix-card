# VinylMatrix Card roadmap

## Prepared 1.0.1 — Marketplace transition

- Keep this update local until Home Assistant 2026.11 stable is available and its Marketplace migration can be tested; public 1.0.0 remains the recommended release meanwhile.

- Run Chromium/WebKit suites when the matching browser executables are available; the local 2026-10-21 attempt stopped before scenarios because they are absent. Do not treat the passing 1.0.0 workflow as proof for this update.
- Validate installation/update, single resource registration, the visual editor and README rendering on Home Assistant 2026.11 Marketplace, including custom-repository and migrated HACS paths.
- After user approval, publish from a fresh standalone checkout, require a passing updated workflow without ignored HACS checks, attach the built module and compare the downloaded asset. No push or release is currently authorized.

## Presentation

- Activate the supplied `assets/vinylmatrix-social-preview.png` in GitHub repository settings under **Social preview**. The image is published, but the custom preview is not yet configured.
