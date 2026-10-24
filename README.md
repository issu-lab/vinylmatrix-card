![VinylMatrix Card](assets/vinylmatrix-banner.png)

<div align="center">

[![Status](https://img.shields.io/badge/status-stable-2ea44f?style=flat-square)](#project-status)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-dashboard-41BDF5?style=flat-square&logo=homeassistant&logoColor=white)](https://www.home-assistant.io/)
[![Marketplace / HACS](https://img.shields.io/badge/Marketplace%20%2F%20HACS-custom_repository-C346F4?style=flat-square)](#installation)
[![License](https://img.shields.io/badge/license-MIT-C346F4?style=flat-square)](LICENSE)

**A turntable and cassette music card for Home Assistant.**

VinylMatrix brings album artwork and animated turntable or cassette mechanisms to your dashboard. Configure your media players once; the card follows the one that is playing.

</div>

---

## Project Status

| Field | Current state |
|---|---|
| **Maturity** | 🟢 Stable |
| **Used in my homelab** | ✅ Regular use in Home Assistant |
| **Recommended for everyday use** | ✅ For the documented features |
| **Setup difficulty** | 🟡 Intermediate — custom repository |
| **Documentation** | ✅ Installation, configuration and development |
| **Current version** | `1.0.0` — stable ([release](https://github.com/issu-lab/vinylmatrix-card/releases/tag/v1.0.0)) |
| **Prepared version** | `1.1.0` — unreleased; Minimal Small, slower vinyl animation and Marketplace preparation |
| **Validation** | Stable 1.0.0 passed logic/documentation, Chromium/WebKit and HACS checks. See [development](docs/development.md#marketplace-readiness) for the prepared update and remaining checks. |
| **Distribution** | Custom repository: Marketplace on Home Assistant 2026.11+, HACS on earlier versions; not in the shared default catalog |

Version 1.0.0 marks the first stable release after regular use in Home Assistant without reported issues. It preserves the behavior, configuration and appearance of 0.4.1; no dashboard migration is required. This real-world experience complements the automated tests and does not imply validation of every media player integration, browser or Home Assistant version.

---

## Why It Exists

Music deserves a recognizable place on a dashboard. VinylMatrix combines the familiar movement of a record player with a compact interface that puts album artwork first.

It works with existing Home Assistant media players, keeping the same experience across different devices and music integrations.

---

## Features

- 🎵 Album artwork, track title, artist and active player.
- 🔄 Automatic selection from an ordered list of media players.
- 💿 Rotating record and a tonearm that follows track progress, returning to rest when playback stops or pauses.
- 🎛️ Play/pause, previous/next, volume and seeking when supported by the player.
- 📼 Transparent Cassette style with rotating reels, lifting playback heads and compact artwork/progress.
- 🎨 Four selectable styles in the prepared update with automatic, light and dark colors.
- 🖱️ Visual configuration editor and YAML support.
- 🌍 English and Italian, with automatic language selection.
- ♿ Keyboard controls, accessible labels and reduced-motion support.

The card is standalone: it does not require other custom cards, external fonts or a separate music provider account.

---

## How It Works

The playing player takes priority. If several players are playing, VinylMatrix keeps the one already displayed; on first load, the first playing entry in the configured list wins.

When nobody is playing, the last available player remains visible so its artwork and resume control stay accessible. If that player becomes unavailable, the card falls back to the first available configured entry. If all are unavailable, it shows an unavailable state.

The record rotates only during `playing`. In the prepared update, Minimal, Minimal Small and Classic at its default 33 setting share a relaxed 12-second revolution. In both Minimal and Classic, the arm gradually moves from the outer grooves toward the label as the track advances, stopping short of the artwork. It follows position updates after seeking and the selected player when playback changes devices. Radio streams or tracks without a usable duration/position keep a fixed playing position.

The arm returns to its support during pause, idle, buffering or unavailability. Reduced motion disables spinning and makes the arm change position without animation.

Minimal Small keeps a stationary square sleeve on the left, with part of the spinning vinyl visible behind it. Track information, progress and essential controls sit on the right; volume expands below. It supports the same light, dark and automatic color modes.

In Cassette, both reels rotate while playing and the playback heads rise to the tape. Pause, stop, buffering and unavailable states stop the reels and lower the heads. Reduced motion disables reel rotation and makes the heads move instantly. The four rectangular buttons control previous track, play/pause (or stop when supported instead), next track and volume.

Selection itself sends no commands. Playback controls target the displayed entity, and a seek or volume gesture is canceled if the active player changes. Seeking is also canceled when the track changes.

---

## Interface

The four styles below (including unreleased Minimal Small) use the same preview size. Each screenshot shows the actual card with sample artwork; its original proportions are preserved.

| Light | Dark |
|---|---|
| **Minimal · default**<br>![Minimal in light mode](assets/minimal-light.png) | **Minimal · default**<br>![Minimal in dark mode](assets/minimal-dark.png) |
| **Classic**<br>![Classic in light mode](assets/classic-light.png) | **Classic**<br>![Classic in dark mode](assets/classic-dark.png) |
| **Cassette**<br>![Cassette in light mode](assets/cassette-light.png) | **Cassette**<br>![Cassette in dark mode](assets/cassette-dark.png) |

| **Minimal Small · unreleased**<br>![Minimal Small in light mode](assets/minimal_small-light.png) | **Minimal Small · unreleased**<br>![Minimal Small in dark mode](assets/minimal_small-dark.png) |

**Minimal** puts the record and artwork first. **Minimal Small** is a compact horizontal sleeve-and-record layout. **Classic** adds a turntable base, S arm and physical controls. **Cassette** exposes the tape mechanism, with champagne-gold iSSU reels and four rectangular keys.

---

## Installation

### Marketplace — Home Assistant 2026.11 and later

Home Assistant's [Marketplace documentation](https://contributors.home-assistant.io/marketplace/how-it-works/) describes the built-in store under **Settings → Marketplace** starting with 2026.11. These instructions prepare for that transition; installation on 2026.11 has not yet been tested for this card.

<div align="center">

[![Open VinylMatrix Card in the Home Assistant Marketplace.](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=issu-lab&repository=vinylmatrix-card&category=plugin)

</div>

1. Open the button in your Home Assistant instance. A custom repository requires a GitHub connection.
2. Confirm adding `issu-lab/vinylmatrix-card` as a custom repository if prompted, then install the card. Its category is **Dashboard** (`plugin` in the link).
3. Reload the browser, edit a dashboard and choose **Add card → VinylMatrix Card**.
4. Select your media players and preferred style.

Marketplace registers the JavaScript module at `/local/community/vinylmatrix-card/vinylmatrix-card.js`, with a version query for cache refresh. If you manage resources in YAML, follow the resource instructions shown during installation. Use one resource entry for the card; do not add a second copy alongside an existing entry or `extra_module_url`.

VinylMatrix is a dashboard card, not a device integration. It is not included in the shared default catalog; installing a custom repository does not add it to that catalog.

### HACS — Home Assistant 2026.10 and earlier

With HACS already installed, use the compatible button:

<div align="center">

[![Open VinylMatrix Card in HACS or Marketplace.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=issu-lab&repository=vinylmatrix-card&category=plugin)

</div>

If needed, open **HACS → ⋮ → Custom repositories**, add `https://github.com/issu-lab/vinylmatrix-card` with category **Dashboard**, then download it and reload the browser. Add VinylMatrix through the dashboard editor. The legacy resource is `/hacsfiles/vinylmatrix-card/vinylmatrix-card.js` (JavaScript module).

When upgrading to 2026.11, Marketplace takes over installed and custom repositories from HACS. Existing `/hacsfiles/` URLs remain supported; use `/local/community/` for manually maintained resources following the migration prompt. Do not reinstall HACS on 2026.11. The old `hacs_repository` button continues to work on both versions. See the [official migration details](https://contributors.home-assistant.io/marketplace/how-it-works/) and [repository links](https://contributors.home-assistant.io/marketplace/guides/catalog/).

### Manual installation

Download `vinylmatrix-card.js` from the [latest release](https://github.com/issu-lab/vinylmatrix-card/releases/latest), or build it from source:

1. Copy `vinylmatrix-card.js` (or `dist/vinylmatrix-card.js` after a local build) to Home Assistant's `www/` directory.
2. Add `/local/vinylmatrix-card.js` as a dashboard resource with type **JavaScript module**.
3. Refresh the browser, edit a dashboard and choose **Add card → VinylMatrix Card**.
4. Select your media players and preferred style in the visual editor.

Keep a copy of the dashboard configuration and any previous resource before replacing them. Restore those copies to roll back.

---

## Configuration

```yaml
type: custom:vinylmatrix-card
entities:
  - media_player.living_room
  - media_player.office
theme: minimal
color_mode: auto
language: auto
```

| Option | Default | Purpose |
|---|---|---|
| `entities` | Required unless `entity` is used | Ordered list of media player entity IDs. |
| `entity` | — | Single-player shorthand. `entities` takes precedence if both are present. |
| `name` | Player's friendly name | Optional player label; the track title stays separate. |
| `theme` | `minimal` | `minimal`, `minimal_small` (prepared update), `classic` or `cassette`. |
| `color_mode` | `auto` | Follow Home Assistant, or force `light` / `dark`. |
| `language` | `auto` | Follow Home Assistant, or choose `en` / `it`. Other languages fall back to English. |

In the visual editor, search for a media player by friendly name or entity ID. Only `media_player` entities are offered; players already selected in another row are excluded. The row order defines startup priority.

Choose a style in the visual editor, or set `theme: cassette` / `theme: minimal_small` in YAML. Minimal Small requires the prepared update. Minimal remains the default for existing and new configurations.

Classic’s 33/45 buttons change the record animation speed only: in the prepared update, 33 uses 12 seconds per revolution and 45 uses 8.8 seconds. These are decorative speeds. They do not change the playback speed of your audio.

Configurations saved with the retired `vinyl` or `ambient` style open Minimal automatically.

For a single player:

```yaml
type: custom:vinylmatrix-card
entity: media_player.living_room
```

---

## Known Limitations

- The stable designation is based on regular Home Assistant use and automated regression tests. Compatibility with every media player integration or Home Assistant version is not guaranteed.
- Browser scenarios run in Chromium, with additional Minimal layout checks in WebKit and shared tonearm/Cassette geometry, playback and motion checks in both engines. There is no exhaustive compatibility matrix covering physical devices and Home Assistant versions.
- Available controls depend on the features reported by the selected player. Unsupported controls are disabled.
- Live streams without a finite duration cannot seek. Missing duration or position is displayed as `—:—`.
- Unavailable cover images use a built-in placeholder. Artwork URLs are supplied by the media player integration.
- Commands sent to a grouped player may affect its group, according to the integration's behavior.
- Music search, library browsing, playlist selection, an equalizer and audio analysis are not implemented. Music Assistant players can already be controlled as regular media players.

---

## Documentation

- [Development, architecture and validation](docs/development.md)
- [Branding sources and regeneration](source/README.md)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)

---

## License

Released under the [MIT License](LICENSE).

---

<div align="center">

This project is part of the **iSSU Open Homelab ecosystem**.

<a href="https://github.com/issu-lab/Open-Homelab">
  <img src="https://raw.githubusercontent.com/issu-lab/vinylmatrix-card/main/assets/issu-open-homelab-badge.png"
       alt="Explore iSSU Open Homelab"
       width="480">
</a>

</div>
