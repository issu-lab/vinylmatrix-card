# Changelog

## 1.1.1 — 2026-10-25

- Place compact Minimal’s icon-only Playlist button beside Previous, with Play/Pause centered in a five-control row and the full progress bar restored. Retain the original four controls when playlists are unavailable or disabled.
- Refresh all eight README previews at 640 × 640 with the theme-specific Playlist controls visible. Share deterministic gallery capture between Chromium and Firefox.

- Add Tape Deck’s Playlist key at the left end of the transport row: Playlist, Previous, Play/Pause, Next, Volume. Use five equal-width matching keys with Play/Pause centered and restore the full progress bar. When Music Assistant is absent or playlists are hidden, retain the original four-key layout.

- Integrate SL1200’s text-only Playlist key at the lower-right of the deck, styled like the 33/45 keys. Shorten and center the volume slider above it; preserve the full progress bar and transport controls. Verify the key stays clear of the platter, start/speed buttons and volume slider across tested widths.

- Rename the displayed themes to Vinyl, SL1200, Tape Deck and Minimal in English and Italian. Preserve existing YAML values and saved layouts; the compact Minimal still uses `minimal_small`.

- Move Vinyl's icon-only Playlist button into the free lower-left control slot and restore its full-width progress bar. Preserve existing transport/volume geometry and closed-card height.
- Keep playlist loading lazy and return keyboard focus to the Playlist button when closing with Escape. Verify all 32 theme/color/width combinations in Firefox with simulated services.
- The maintainer reports the installed 1.1.0 is working; detailed Marketplace 2026.11 migration and integration edge-case checks remain separate follow-ups.

## 1.1.0 — 2026-10-25

- Publish the combined update after passing 28 logic/documentation/distribution tests, TypeScript, reproducible build, full Chromium/WebKit scenarios and HACS validation. The downloaded release module matches the tested build byte-for-byte. Live Home Assistant playlist playback and 2026.11 Marketplace migration remain follow-up checks.

- Recheck Marketplace readiness on 2026-10-24: manifest/layout, reproducible standalone module, both live My Home Assistant badge/link endpoints and README migration references conform to the documented requirements. Live Marketplace installation remains unverified.

- Add a theme-aware Music Assistant playlist button in all four styles, visible when the integration is available and configurable in the editor. The panel supports artwork, server-side search, pagination and an explicit preferred player.
- Resolve player ownership and library instance from Home Assistant's entity registry, keep the open panel's target fixed across automatic card handovers, and request immediate playlist playback with queue replacement. Handle unavailable players, failed/late requests and double taps without automatic playback retries.
- Pass seven Music Assistant unit tests and Firefox playlist scenarios across 32 theme/color/width combinations with simulated services. Live read-only checks confirm the installed integration returns playlist names, URIs and artwork; no live playback command or deployment was performed.

- Prepare Marketplace instructions for Home Assistant 2026.11 while retaining the HACS button and instructions for older versions. Document the new module path and migration without duplicate resource entries.
- Add passing local distribution checks for manifest/module lookup and build version consistency; add daily validation and disable PR comments in the existing HACS job.
- Add Minimal Small: stationary square artwork, partially exposed rotating vinyl, right-side metadata/progress/controls, and expandable volume in automatic, light and dark colors.
- Slow Minimal rotation from 10 to 12 seconds per revolution; align Classic at 33 with that duration and keep its 45 option proportionally faster at 8.8 seconds. Audio speed is unchanged.
- Extend configuration and browser coverage for the compact theme; retain existing theme assets and add two equal-size previews. Shared compact-theme checks passed in Firefox with simulated players, including ten size/color layouts, rotation/stopped states, controls and handover. Live dashboard verification remains in the roadmap.

## 1.0.0 — 2026-09-27

- Promote the existing card to stable after regular Home Assistant use without issues reported by the maintainer.
- Preserve all three themes, controls and configuration from 0.4.1; no migration or functional changes.
- Update the README to distinguish real-world use, automated validation and compatibility limits, while retaining the uniform theme gallery and HACS installation button.

## 0.4.1 — 2026-09-15

- Increased light/dark contrast between the shell, tape, heads, controls and text.
- Added subdued champagne-gold reels with rotating iSSU lettering.
- Reorganized the README into a single Light/Dark theme gallery with six matching 640 × 640 screenshots, preserving each card's aspect ratio.
- Added repeatable browser capture and a documentation check for uniform preview dimensions.

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
