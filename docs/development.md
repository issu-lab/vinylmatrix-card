# Development and validation


Use Node.js 24 and pnpm 11.19.0 (the package manager version is pinned). The application requires Node 22.18+ for direct TypeScript unit tests; the pinned package manager may have a higher runtime requirement, so Node 24 is the supported development environment.

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm build
pnpm dev --port 5177 --strictPort
```

Open `http://127.0.0.1:5177`. Add `?theme=minimal` or `?theme=classic` for a focused, interactive preview. The preview uses the generated bundle and two simulated players. It has no connection to Home Assistant. Rebuild after source changes. The only dependency allowed to run an installation build script is esbuild.

Browser checks, with the preview server running:

```sh
pnpm exec playwright install --with-deps chromium webkit --only-shell
pnpm test:browser
pnpm test:webkit
```

`PREVIEW_URL` can override the preview URL. `PLAYWRIGHT_MODULE` and `PLAYWRIGHT_BROWSERS_PATH` support an existing external test runtime. Chromium checks regenerate the screenshots in `assets/` using the original sample SVG in `dev/cover.svg`. WebKit checks verify Minimal geometry in both colors from 240 to 900 px, visibility across player states and missing artwork, and play/pause. These simulated checks do not replace validation on a physical iOS device or in Home Assistant.

### Structure

```text
src/player.ts             selection, capabilities, progress and safe artwork URLs
src/vinylmatrix-card.ts   rendering, animation lifecycle and guarded service calls
src/editor.ts            visual configuration editor
src/styles.ts            shared styles
src/minimal-styles.ts     reference proportions and Minimal styling
src/classic-styles.ts     turntable base and responsive Classic controls
src/classic-graphics.ts   dotted platter and S-shaped arm
src/graphics.ts          Minimal tonearm and shared icons
src/i18n.ts              English and Italian interface text
tests/                   unit and browser tests
dev/                     original development-only artwork
dist/vinylmatrix-card.js self-contained distribution bundle
```

## Distribution checks

Build from this project directory as the repository root. The validation workflow runs unit tests, TypeScript checks, bundle comparison, browser scenarios and HACS checks. It does not publish releases. HACS checks run against the standalone GitHub repository. Publish the built `dist/vinylmatrix-card.js` as a release asset after validation passes. Experimental releases must keep the live-validation warning until testing on Home Assistant is complete.

Before a stable release, validate the card on Home Assistant. For every release, review screenshots and configuration examples, verify the README on GitHub and HACS, and configure the repository social preview using `assets/vinylmatrix-social-preview.png`.

## Branding sources

The editable banner and social preview are in `source/`. Their generator uses the approved Exo 2 Bold (700) and Inter Semibold (600) fonts. The iSSU wordmark is an unchanged crop from the canonical banner; the Open Homelab footer asset is copied unchanged. See `source/README.md` for regeneration.

## Player selection validation

The editor uses `ha-selector` with `entity.filter.domain: media_player` and excludes players selected in other rows. It accepts `value-changed` only for media-player IDs. If native selector components are not loaded, a searchable native input/select pair filters friendly names and IDs. Browser tests cover this fallback and the properties/events passed to the native selector; they do not substitute for live Home Assistant rendering.

## Technical references


- [Home Assistant entity selector source](https://github.com/home-assistant/frontend/blob/dev/src/components/ha-selector/ha-selector-entity.ts)
- [Home Assistant custom cards](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/)
- [Media player entity contract](https://developers.home-assistant.io/docs/core/entity/media-player/)
- [Media player actions](https://www.home-assistant.io/integrations/media_player/)
- [HACS dashboard repository requirements](https://www.hacs.xyz/docs/publish/plugin/)
- [HACS validation action](https://www.hacs.xyz/docs/publish/action/)


[Back to the project overview](../README.md)
