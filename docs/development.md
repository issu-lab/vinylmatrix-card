# Development and validation


Use Node.js 24 and pnpm 11.19.0 (the package manager version is pinned). The application requires Node 22.18+ for direct TypeScript unit tests; the pinned package manager may have a higher runtime requirement, so Node 24 is the supported development environment.

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm build
pnpm test:distribution
pnpm dev --port 5177 --strictPort
```

Open `http://127.0.0.1:5177`. Add `?theme=minimal`, `?theme=classic` or `?theme=cassette` for a focused, interactive preview. The preview uses the generated bundle and two simulated players. It has no connection to Home Assistant. Rebuild after source changes. The only dependency allowed to run an installation build script is esbuild.

Browser checks, with the preview server running:

```sh
pnpm exec playwright install --with-deps chromium webkit --only-shell
pnpm test:browser
pnpm test:webkit
```

`PREVIEW_URL` can override the preview URL. `PLAYWRIGHT_MODULE` and `PLAYWRIGHT_BROWSERS_PATH` support an existing external test runtime. Chromium checks call `tests/screenshots.mjs` to regenerate six equal 640 × 640 previews in `assets/`, using the original sample SVG in `dev/cover.svg`. Each real card is centered and scaled proportionally within its frame; no content is cropped or stretched. The README presents one row per theme, with Light and Dark columns. WebKit checks verify Minimal geometry in both colors from 240 to 900 px, visibility across player states and missing artwork, and play/pause. Both browser suites also run `tests/tonearm.mjs`, measuring the actual SVG stylus against the grooves and label at five progress positions, three widths and both colors. They cover seeking, clock updates, player handover, parking, missing timeline data, smooth transitions and reduced motion. `tests/cassette.mjs` runs in both engines, covering 10 size/color combinations, reel rotation, head lift/parking, essential controls, active-player handover, artwork fallback, service errors and reduced motion. These simulated checks do not replace validation on a physical iOS device or in Home Assistant.

### Structure

```text
src/player.ts             selection, capabilities, progress and safe artwork URLs
src/vinylmatrix-card.ts   rendering, animation lifecycle and guarded service calls
src/editor.ts            visual configuration editor
src/styles.ts            shared styles
src/minimal-styles.ts     reference proportions and Minimal styling
src/classic-styles.ts     turntable base and responsive Classic controls
src/classic-graphics.ts   dotted platter and S-shaped arm
src/cassette-graphics.ts  transparent shell, reels, tape path and lifting heads
src/cassette-styles.ts    flat Cassette colors, motion and responsive controls
src/graphics.ts          Minimal tonearm and shared icons
src/i18n.ts              English and Italian interface text
tests/                   unit and browser tests
dev/                     original development-only artwork
dist/vinylmatrix-card.js self-contained distribution bundle
```

## Distribution checks

Build from this project directory as the repository root. The validation workflow runs unit tests, TypeScript checks, bundle comparison, browser scenarios and HACS checks. It does not publish releases. HACS checks run against the standalone GitHub repository. Publish the built `dist/vinylmatrix-card.js` as a release asset after validation passes. Version 1.0.0 is promoted from 0.4.1 following the maintainer’s report of regular, trouble-free Home Assistant use on 2026-09-27. This is user-reported live experience, separate from the simulated browser checks; it does not establish a full device or Home Assistant version compatibility matrix.

For stable releases, retain the documented real-world validation basis and verify any behavior changes against it. For every release, review screenshots and configuration examples, verify the README on GitHub and Marketplace/HACS, and configure the repository social preview using `assets/vinylmatrix-social-preview.png`.

## Marketplace readiness

Audit date: 2026-10-21. Prepared version: **1.0.1, not published**. The public version remains 1.0.0 at commit `5e838b2ddc89d90ae191c138ec97a3b4f6da3ee7`; its latest [validation run](https://github.com/issu-lab/vinylmatrix-card/actions/runs/36299663148) passed. That older run is not validation of this local update.

The documented 2026.11 distribution contract already matches this card: root `hacs.json`, explicit `vinylmatrix-card.js`, built single-file module in `dist`, and the same asset attached to releases. Lit is bundled. Keep `content_in_root` unset so release/dist lookup works. `render_readme` is retained for legacy HACS; Marketplace ignores unrecognized keys. No new minimum Home Assistant version is imposed because the card itself does not use a 2026.11-only API.

The README now distinguishes Marketplace and legacy HACS, includes both repository buttons, and explains `/local/community/` alongside the compatible `/hacsfiles/` path. The new distribution tests catch a missing/wrongly located module and a stale version in the build. CI runs them after building and adds a daily schedule to the existing push, pull request and manual checks. The HACS job keeps `category: plugin`, skips no checks, and disables PR comments so read-only permissions suffice. Hassfest is for integrations and is not applicable to this dashboard module.

Local verification: 13 player tests, 6 documentation/branding checks, 2 distribution checks, TypeScript and production build passed. The built module differs from stable 1.0.0 only in the version label. Chromium and WebKit suites were attempted but stopped at launch: the required `chromium_headless_shell-1234` and `webkit-2336` executables are absent. No dependencies or browsers were installed. No live Home Assistant or Marketplace installation was performed, and the updated workflow has not run remotely. See the [roadmap](../ROADMAP.md) for release gates.

Official sources checked for this audit:

- [Marketplace behavior and migration](https://contributors.home-assistant.io/marketplace/how-it-works/)
- [Dashboard packaging and resource registration](https://contributors.home-assistant.io/marketplace/guides/dashboard/)
- [Manifest keys](https://contributors.home-assistant.io/marketplace/reference/hacs-json/)
- [Validation action and install checks](https://contributors.home-assistant.io/marketplace/reference/validation/)
- [Catalog and old/new My Home Assistant links](https://contributors.home-assistant.io/marketplace/guides/catalog/)

## Branding sources

The editable banner and social preview are in `source/`. Their generator uses the approved Exo 2 Bold (700) and Inter Semibold (600) fonts. The iSSU wordmark is an unchanged crop from the canonical banner; the Open Homelab footer asset is copied unchanged. See `source/README.md` for regeneration.

## Player selection validation

The editor uses `ha-selector` with `entity.filter.domain: media_player` and excludes players selected in other rows. It accepts `value-changed` only for media-player IDs. If native selector components are not loaded, a searchable native input/select pair filters friendly names and IDs. Browser tests cover this fallback and the properties/events passed to the native selector; they do not substitute for live Home Assistant rendering.

## Technical references


- [Home Assistant entity selector source](https://github.com/home-assistant/frontend/blob/dev/src/components/ha-selector/ha-selector-entity.ts)
- [Home Assistant custom cards](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/)
- [Media player entity contract](https://developers.home-assistant.io/docs/core/entity/media-player/)
- [Media player actions](https://www.home-assistant.io/integrations/media_player/)
- [Marketplace dashboard repository requirements](https://contributors.home-assistant.io/marketplace/guides/dashboard/)
- [Marketplace validation and HACS action](https://contributors.home-assistant.io/marketplace/reference/validation/)


[Back to the project overview](../README.md)
