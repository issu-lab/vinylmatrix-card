# Changelog

## 0.4.0 — 2026-09-15

Cassette joins Minimal and Classic.

- Added the approved flat Cassette design with a transparent shell, two exposed reels, a visible tape path and playback heads that lift during playback and lower in every non-playing state.
- Added four rectangular transport/volume keys and a compact artwork, title and seek strip; the layout adapts from 240 to 900 px.
- Added Cassette to the visual editor and YAML configuration, with automatic, light and dark colors. Minimal remains the default.
- Reused active-player selection, capability checks, guarded services, artwork fallback and reduced-motion behavior.
- Passed 13 logic tests, 5 documentation checks, existing Chromium/WebKit regression suites and Cassette coverage in both engines: 10 size/color layouts, reel rotation, head transitions, controls, player handover, fallback and command errors.
- Updated documentation and actual preview screenshots. Live Home Assistant validation remains pending.

## 0.3.0 — 2026-09-15

A progress-following tonearm for Minimal and Classic.

- Move the stylus gradually from the outer grooves toward the label using the selected player's track position and duration, with separate arcs for each theme. The stylus stays outside the artwork.
- Follow confirmed seeks, track changes and automatic player handovers. Keep a fixed playing position when duration or position is unavailable, including radio streams.
- Preserve arm parking outside playback and reduced-motion preferences. Smooth the progress updates without sending additional player commands.
- Fix a zero-sized Classic deck in WebKit above 600 px, found by the new geometry checks.
- Passed 12 logic tests, 5 documentation checks, the existing Chromium/WebKit suites and shared tonearm regression checks in both engines: 60 groove/label measurements, seek, clock updates, parking, fallback, handover and smooth/reduced motion.


## 0.2.1 — 2026-09-15

Fix the missing Minimal turntable on Safari/WebKit.

- Reproduced a zero-height Minimal deck in WebKit: the record and tonearm disappeared while metadata and controls remained visible.
- Give the deck an explicit responsive height and block layout, preserving the approved record and artwork proportions in light and dark modes.
- Added WebKit regression coverage for 12 size/color combinations, playback states, missing artwork and play/pause. Run these checks in CI alongside the existing 15 Chromium scenarios.
- Verified the fix with simulated players in Chromium and WebKit; confirmation on a physical iOS device remains pending.

## 0.2.0 — 2026-09-14

Two reference-aligned themes and searchable players.

- Added the reference-aligned Classic design in graphite and silver, with dotted platter, S arm, vertical volume, physical Start/Stop and lower information/control strip.
- Kept only Minimal (default) and Classic. Removed the previous Vinyl/Ambient interfaces; legacy configurations automatically open Minimal.
- Added 33/45 record-animation controls without changing audio playback speed.
- Replaced free-text player entries with Home Assistant's searchable entity selector restricted to media players, plus a searchable fallback for the local preview. Name/ID filtering and duplicate exclusion are supported.
- Passed 10 logic tests, 5 documentation checks and 15 browser scenarios. Verified search, native-selector event contract, physical playback controls, visual speed and overflow from 240 to 900 px. Actual Home Assistant selector rendering remains untested.

### Minimal reference alignment

- Rebuilt Minimal around the approved reference proportions: record at 72.3% of card width and circular artwork at 46% of record diameter.
- Added subtle grooves and reflections, a curved metallic tonearm with counterweight and cartridge, and a dedicated rest position.
- Centered title and artist and moved progress and transport below the record, with expandable volume and neutral artwork-derived background.
- Added direct local theme preview (`?theme=minimal`) and actual light/dark screenshots.
- TypeScript checks and distribution build passed. Live Home Assistant validation remains pending.

## 0.1.0 — 2026-09-14

Initial experimental release.

- Default floating-vinyl design and selectable Minimal, Classic and Ambient styles, with automatic, light and dark colors.
- Ordered multi-player configuration, stable automatic selection of the playing entity and unavailable-state fallback.
- Capability-gated playback, previous/next, volume and seeking, with guards against player and track changes during gestures.
- Record animation and tonearm return on pause, stop, buffering and unavailable states, with reduced-motion support.
- Visual editor, English and Italian labels, artwork fallback and visible command failures.
- Standalone JavaScript bundle, HACS manifest and My Home Assistant installation button for the custom dashboard repository.
- Shared iSSU banner, social preview and unchanged Open Homelab footer, with editable branding sources.
- Validation: 10 logic tests, 5 documentation checks and 12 Chromium browser scenarios. Layout reviewed at 240, 280, 340 and 480 px. Clean dependency installation and reproducible bundle verified.

- Published the standalone GitHub release with its JavaScript asset and verified the public README, HACS button, banner and canonical footer. GitHub build, browser tests and HACS validation passed.

The card has only been tested with simulated players. Live Home Assistant validation remains pending.
