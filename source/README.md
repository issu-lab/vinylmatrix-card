# Branding source files

The repository banner follows the shared iSSU Open Homelab geometry:

- White 5120 × 1280 canvas.
- Unchanged iSSU wordmark crop at x=0, y=400, width=850, height=520.
- Original vinyl-and-tonearm project mark in the project logo area.
- Exo 2 Bold (700), 250 px title at x=1650, baseline y=685.
- Inter Semibold (600), 88 px subtitle at x=1650, baseline y=835.
- Three functional icons centered at x=4200/4480/4760, y=590, radius=70.
- Two lower-right purple quarter-circle arcs with the shared dimensions.

`issu-wordmark.png` is cropped without scaling from the approved ESPHome Update banner source. The shared footer in `assets/issu-open-homelab-badge.png` is copied unchanged from the approved ThermoPilot asset. Neither is redrawn.

`vinylmatrix-banner.svg` and `vinylmatrix-social-preview.svg` keep editable text and embedded brand imagery. Generated PNGs live in `assets/`. The social preview is 1280 × 640 and must be configured in GitHub repository settings after publication; adding the file alone does not activate it.

## Regeneration

Graphics tooling is separate from the card's runtime and regular build. Install `sharp` in the Node environment. Existing typography outlines are included in `typography.json`, so routine PNG regeneration does not require installing fonts.

```sh
node source/build-assets.cjs
```

If title or subtitle text changes, update both scripts and regenerate the outlines first. Install `fonttools` in the Python environment and supply a directory containing the approved `Exo2-Variable.ttf` and `Inter-Variable.ttf` files:

```sh
python3 source/outline-text.py /path/to/approved/fonts > source/typography.json
node source/build-assets.cjs
```

`PYTHONPATH` can point to an external fonttools installation and `NODE_PATH` can point to an existing sharp installation. No font binaries are copied into the application bundle.

The helper instantiates the exact variable-font weights and outlines glyphs before rasterization. The editable SVGs retain text, while exported PNG typography does not depend on system fallback fonts. Geometry and branding checks run in `tests/branding.test.mjs`.

The footer uses the public repository's absolute raw URL for HACS compatibility. Verify that URL after publishing and inspect the footer on GitHub and HACS; local asset checks alone do not prove remote rendering.
