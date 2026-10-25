# Development and validation


Use Node.js 24 and pnpm 11.19.0 (the package manager version is pinned). The application requires Node 22.18+ for direct TypeScript unit tests; the pinned package manager may have a higher runtime requirement, so Node 24 is the supported development environment.

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm build
pnpm test:distribution
pnpm dev --port 5177 --strictPort
```

Open `http://127.0.0.1:5177`. Add `?theme=minimal`, `?theme=classic`, `?theme=cassette` or `?theme=minimal_small` for a focused, interactive preview. The preview uses the generated bundle and two simulated players. It has no connection to Home Assistant. Rebuild after source changes. The only dependency allowed to run an installation build script is esbuild.

Browser checks, with the preview server running:

```sh
pnpm exec playwright install --with-deps chromium webkit --only-shell
pnpm test:browser
pnpm test:webkit
```

`PREVIEW_URL` can override the preview URL. `PLAYWRIGHT_MODULE` and `PLAYWRIGHT_BROWSERS_PATH` support an existing external test runtime. Chromium checks call `tests/screenshots.mjs` to regenerate eight equal 640 × 640 previews in `assets/`, using the original sample SVG in `dev/cover.svg`. Each real card is centered and scaled proportionally within its frame; no content is cropped or stretched. The README presents one row per theme, with Light and Dark columns. WebKit checks verify Minimal geometry in both colors from 240 to 900 px, visibility across player states and missing artwork, and play/pause. Both browser suites also run `tests/tonearm.mjs`, measuring the actual SVG stylus against the grooves and label at five progress positions, three widths and both colors. They cover seeking, clock updates, player handover, parking, missing timeline data, smooth transitions and reduced motion. `tests/cassette.mjs` runs in both engines, covering 10 size/color combinations, reel rotation, head lift/parking, essential controls, active-player handover, artwork fallback, service errors and reduced motion. These simulated checks do not replace validation on a physical iOS device or in Home Assistant.

### Structure

```text
src/player.ts             selection, capabilities, progress and safe artwork URLs
src/vinylmatrix-card.ts   rendering, animation lifecycle and guarded service calls
src/editor.ts            visual configuration editor
src/music-assistant.ts   registry targets, playlist response parsing and HA actions
src/playlists.ts         lazy playlist panel and asynchronous request guards
src/playlist-styles.ts   theme-aware playlist button and accessible panel
src/styles.ts            shared styles
src/minimal-styles.ts     reference proportions and Minimal styling
src/minimal-small-styles.ts compact sleeve, exposed vinyl and right-side controls
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

## Release 1.1.0

The maintainer authorized publishing the combined update on 2026-10-24, with live Home Assistant 2026.11 installation and migration checks deferred until their upgrade. Live playlist playback, selector rendering and non-admin/group behavior remain follow-up checks in the roadmap. No Home Assistant deployment is performed as part of this release.

Local release checks passed: 13 player tests, 7 Music Assistant tests, 6 documentation checks, 2 distribution checks, TypeScript and a reproducible production build. The first release workflow passed HACS and the full Chromium suite; WebKit exposed a timing-sensitive Minimal Small animation assertion. That check now samples actual CSS animation frames at known times, matching the existing cassette test, while still asserting running/paused states and reduced motion. The distributable is unchanged. The complete [release workflow](https://github.com/issu-lab/vinylmatrix-card/actions/runs/40174520068) subsequently passed on `bde482636222421a91b9623baab49386ed6f316c`: Chromium and WebKit both covered the original themes, Minimal Small and the playlist panel, and HACS validation passed without ignored checks.

[Version 1.1.0](https://github.com/issu-lab/vinylmatrix-card/releases/tag/v1.1.0) was published on 2026-10-25 from that tested commit as the latest stable release. The downloaded `vinylmatrix-card.js` matches the local build byte-for-byte: 98,109 bytes, SHA-256 `42fedc6ffa27b34ec5f21398be21758dac51b8edf6e8714bad7aad4c409b9a5c`. The README and public GitHub description now include all four themes and Music Assistant playlists. Live validation remains separate and pending as listed above.

The earlier preparation audit below is retained as historical evidence.

## Marketplace readiness

Historical pre-publication audit refreshed: 2026-10-24 (initial preparation: 2026-10-21). Originally prepared as 1.0.1; included at audit time in **1.1.0, then unpublished**, alongside the theme changes dated 2026-10-24. At audit time the public version was 1.0.0 at commit `5e838b2ddc89d90ae191c138ec97a3b4f6da3ee7`; its recorded [validation run](https://github.com/issu-lab/vinylmatrix-card/actions/runs/36299663148) passed. That older run is not validation of this local update.

The documented 2026.11 distribution contract already matches this card: root `hacs.json`, explicit `vinylmatrix-card.js`, built single-file module in `dist`, and the same asset attached to releases. Lit is bundled. Keep `content_in_root` unset so release/dist lookup works. `render_readme` is retained for legacy HACS; Marketplace ignores unrecognized keys. No new minimum Home Assistant version is imposed because the card itself does not use a 2026.11-only API.

The README now distinguishes Marketplace and legacy HACS, includes both repository buttons, and explains `/local/community/` alongside the compatible `/hacsfiles/` path. The new distribution tests catch a missing/wrongly located module and a stale version in the build. CI runs them after building and adds a daily schedule to the existing push, pull request and manual checks. The HACS job keeps `category: plugin`, skips no checks, and disables PR comments so read-only permissions suffice. Hassfest is for integrations and is not applicable to this dashboard module.

At the original 1.0.1 preparation: 13 player tests, 6 documentation/branding checks, 2 distribution checks, TypeScript and production build passed. That earlier module differed from stable 1.0.0 only in its version label; the current 1.1.0 module also includes the new theme and rotation changes. Chromium and WebKit suites were attempted but stopped at launch: the required `chromium_headless_shell-1234` and `webkit-2336` executables are absent. No dependencies or browsers were installed. No live Home Assistant or Marketplace installation was performed, and the updated workflow has not run remotely. See the [roadmap](../ROADMAP.md) for release gates.

Readiness recheck on 2026-10-24, against the prepared 1.1.0 at `df3f14f`:

| Check | Result |
|---|---|
| Manifest and layout | Root `hacs.json`, `filename: vinylmatrix-card.js`, no root-only or ZIP override; category `plugin` in links and validation. No manifest changes needed. |
| Built module | TypeScript and production build passed; rebuilding reproduced the committed bundle byte-for-byte. The 98,109-byte file parses as an ES module with no external static imports. |
| Automated packaging/documentation | 2 distribution and 6 README/branding checks passed. |
| Installation badges | Both official SVG badge URLs returned HTTP 200 with `image/svg+xml`. Both My Home Assistant links returned HTTP 200 and the expected repository-link pages, with `owner=issu-lab`, `repository=vinylmatrix-card`, `category=plugin`. This verifies link availability, not installation in a user's instance. |
| README | Marketplace 2026.11 instructions, legacy HACS path, migration and single resource registration agree with the official docs. The README explicitly separates public 1.0.0 from unpublished 1.1.0. |
| GitHub release and catalog | Public latest release is v1.0.0 with its `vinylmatrix-card.js` asset. Repository is public, active, has topics and issues enabled. It is not present in `hacs/default`'s `plugin` list. |
| Remaining validation | Updated remote CI, live Marketplace install/update, migrated HACS resource registration and live playlist playback are still pending. This audit does not certify those paths. |

The reviewed module SHA-256 is `42fedc6ffa27b34ec5f21398be21758dac51b8edf6e8714bad7aad4c409b9a5c`. Its public release asset must be rebuilt and compared again when publishing. No remote metadata, Home Assistant configuration or releases were changed by this audit.

Official sources checked for this audit:

- [Marketplace behavior and migration](https://contributors.home-assistant.io/marketplace/how-it-works/)
- [Dashboard packaging and resource registration](https://contributors.home-assistant.io/marketplace/guides/dashboard/)
- [Manifest keys](https://contributors.home-assistant.io/marketplace/reference/hacs-json/)
- [Validation action and install checks](https://contributors.home-assistant.io/marketplace/reference/validation/)
- [Catalog and old/new My Home Assistant links](https://contributors.home-assistant.io/marketplace/guides/catalog/)

## Minimal Small verification — 2026-10-24

Prepared 1.1.0 adds the compact theme and sets the default vinyl period to 12 seconds. `tests/minimal-small.mjs` is shared by Chromium/WebKit and an optional Firefox smoke runner. It checks all three vinyl defaults, ten width/color layouts from 240 to 900 px, a stationary square sleeve and exposed record, actual rotation, five stopped states, playback/seek/volume commands, missing artwork, streams and player handover. Chromium/WebKit also check reduced motion.

The shared scenarios passed in the system Firefox using simulated players. Two actual Minimal Small screenshots were captured as matching 640 × 640 frames. Player tests (13), documentation checks (6), distribution checks (2), TypeScript and the build pass. Full Chromium/WebKit suites remain pending because their matching executables are absent; no browser or dependency installation was performed. Neither the new theme nor playlist playback has been deployed to Home Assistant. The playlist chooser was subsequently added as described below.

For the optional Firefox runner, use a fresh disposable profile and the loopback [WebDriver BiDi endpoint](https://developer.mozilla.org/en-US/docs/Web/WebDriver/How_to/Create_BiDi_connection):

```sh
mkdir -p /tmp/vinylmatrix-firefox-profile
firefox --headless --no-remote --profile /tmp/vinylmatrix-firefox-profile --remote-debugging-port 9222
# In a second terminal, with the preview server running:
node tests/firefox-smoke.mjs
# Optionally regenerate only the two compact-theme previews:
CAPTURE_SMALL=1 node tests/firefox-smoke.mjs
```

Close the disposable Firefox process after testing. `FIREFOX_BIDI_URL` overrides the endpoint. This smoke check complements rather than replaces the full Playwright regression suites.

## Music Assistant playlist contract

The picker uses Home Assistant's authenticated connection, with no direct Music Assistant server credentials. Opening the panel reads `config/entity_registry/list` and intersects enabled `music_assistant` entities with the card's configured IDs plus optional `playlist_entity`. The registry's `config_entry_id` scopes library reads. Explicit destinations never silently fall back, and active-player changes do not retarget an open panel.

`callWS` sends `call_service` for `music_assistant.get_library`, with `return_response: true`, `media_type: playlist`, a page size of 25, offset, name ordering and optional search. Home Assistant's WebSocket result uses `response.items` (the REST envelope is different). Names, URI and top-level `image` are read from each item. Images pass the shared URL sanitizer; unavailable art gets an icon. Selecting an item calls `music_assistant.play_media` with its URI, `media_type: playlist`, `enqueue: replace` and one explicit entity ID.

Request generations discard late responses after searches, target changes, closing, disconnection or reconfiguration. Playback is guarded against double taps and unavailable targets. Calls time out after 15 seconds, without automatic retries; a timeout on playback reports unconfirmed playback rather than asserting that nothing played. Entity discovery and library reads run only when the panel opens or the user requests more data.

The optional `?playlists=1` preview parameter and **Toggle Music Assistant** development button enable simulated playlist data. `tests/music-assistant.test.mjs` covers ownership, destination selection, response parsing, request payloads, pagination and timeouts. `tests/playlists.mjs` exercises the real components with mocked HA services, shared between the browser runners. `TEST_SUITE=playlists node tests/firefox-smoke.mjs` runs just the playlist browser scenarios.

References: [HA WebSocket responses](https://contributors.home-assistant.io/core/internals/websocket-api/), [Music Assistant library](https://www.home-assistant.io/actions/music_assistant.get_library/) and [playlist playback](https://www.home-assistant.io/actions/music_assistant.play_media/). Live read-only inspection on HA 2026.10.2 / Music Assistant 2.10.8 confirmed playlist URIs and string artwork URLs. Seven Music Assistant unit tests and the playlist browser scenarios passed locally in system Firefox, including 32 layout combinations. Real playback, live selector rendering and non-admin permissions remain follow-up checks in the roadmap, explicitly deferred by the maintainer when authorizing publication.

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
