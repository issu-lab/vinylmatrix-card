import type { HomeAssistant, Config } from "./types.ts";
const en = {
  play: "Play", pause: "Pause", stop: "Stop", previous: "Previous track", next: "Next track",
  volume: "Volume", progress: "Playback position", mute: "Mute", unmute: "Unmute",
  idle: "Nothing playing", paused: "Paused", playing: "Playing", buffering: "Buffering",
  unavailable: "Player unavailable", off: "Off", unknown: "Unknown", on: "Ready", standby: "Standby",
  artist: "Unknown artist", loading: "Waiting for Home Assistant", error: "The player could not complete the action.",
  players: "Media players · priority order", add: "Add player", remove: "Remove player", name: "Custom name",
  theme: "Style", color: "Color mode", language: "Language", auto: "Automatic", light: "Light", dark: "Dark",
  vinyl: "Vinyl · floating disc", minimal: "Minimal", classic: "Classic", ambient: "Ambient",
  hint: "The playing player is selected automatically. Order determines priority when the card first opens.",
};
const it: typeof en = {
  play: "Riproduci", pause: "Pausa", stop: "Ferma", previous: "Brano precedente", next: "Brano successivo",
  volume: "Volume", progress: "Posizione di riproduzione", mute: "Disattiva audio", unmute: "Riattiva audio",
  idle: "Nessuna riproduzione", paused: "In pausa", playing: "In riproduzione", buffering: "Caricamento",
  unavailable: "Lettore non disponibile", off: "Spento", unknown: "Sconosciuto", on: "Pronto", standby: "Standby",
  artist: "Artista sconosciuto", loading: "In attesa di Home Assistant", error: "Il lettore non ha completato il comando.",
  players: "Lettori multimediali · ordine di priorità", add: "Aggiungi lettore", remove: "Rimuovi lettore", name: "Nome personalizzato",
  theme: "Stile", color: "Colore", language: "Lingua", auto: "Automatico", light: "Chiaro", dark: "Scuro",
  vinyl: "Vinyl · disco libero", minimal: "Minimal", classic: "Classic", ambient: "Ambient",
  hint: "Viene selezionato automaticamente il lettore in riproduzione. L’ordine determina la priorità all’apertura della card.",
};
export type Label = keyof typeof en;
export function labels(config?: Config, hass?: HomeAssistant): typeof en {
  const lang = config?.language && config.language !== "auto" ? config.language : hass?.locale?.language ?? hass?.language ?? "en";
  return lang.toLowerCase().startsWith("it") ? it : en;
}
