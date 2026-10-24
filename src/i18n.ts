import type { HomeAssistant, Config } from "./types.ts";
const en = {
  playlists: "Playlists", playlistPlayer: "Play on", playlistSearch: "Search playlists", playlistLoading: "Loading playlists…", playlistStarting: "Sending playback request…", playlistStarted: "Playback request sent.",
  playlistReplace: "Select a playlist to play now and replace this player’s queue.", playlistEmpty: "No playlists found in this Music Assistant library.", loadMore: "Load more", retry: "Retry",
  playlistConnectError: "Could not connect to Music Assistant. Check its integration and your Home Assistant permissions.",
  playlistNoTarget: "Add a Music Assistant player to the card or choose a playlist player in the card settings.",
  playlistLoadError: "Could not load playlists. Check Music Assistant and try again.", playlistPlayError: "Playback could not be confirmed. Check the player before trying again.",
  showPlaylists: "Music Assistant playlist button", enabled: "Enabled when Music Assistant is available", disabled: "Hidden", playlistTarget: "Preferred playlist player", playlistAuto: "Automatic · active Music Assistant player first",

  recordSpeed: "Record animation speed", play: "Play", pause: "Pause", stop: "Stop", previous: "Previous track", next: "Next track",
  volume: "Volume", progress: "Playback position", mute: "Mute", unmute: "Unmute",
  idle: "Nothing playing", paused: "Paused", playing: "Playing", buffering: "Buffering",
  unavailable: "Player unavailable", off: "Off", unknown: "Unknown", on: "Ready", standby: "Standby",
  artist: "Unknown artist", loading: "Waiting for Home Assistant", error: "The player could not complete the action.",
  players: "Media players · priority order", add: "Add player", remove: "Remove player", name: "Custom name",
  theme: "Style", color: "Color mode", language: "Language", auto: "Automatic", light: "Light", dark: "Dark",
  minimal: "Minimal", minimal_small: "Minimal Small", classic: "Classic", cassette: "Cassette", searchPlayers: "Search media players", choosePlayer: "Choose a media player", noPlayers: "No matching media players",
  hint: "The playing player is selected automatically. Order determines priority when the card first opens.",
};
const it: typeof en = {
  playlists: "Playlist", playlistPlayer: "Riproduci su", playlistSearch: "Cerca playlist", playlistLoading: "Caricamento playlist…", playlistStarting: "Invio richiesta di riproduzione…", playlistStarted: "Richiesta di riproduzione inviata.",
  playlistReplace: "Seleziona una playlist per riprodurla subito e sostituire la coda di questo lettore.", playlistEmpty: "Nessuna playlist trovata nella libreria di Music Assistant.", loadMore: "Carica altre", retry: "Riprova",
  playlistConnectError: "Connessione a Music Assistant non riuscita. Controlla l’integrazione e i tuoi permessi in Home Assistant.",
  playlistNoTarget: "Aggiungi alla card un lettore Music Assistant oppure scegli il lettore playlist nelle impostazioni della card.",
  playlistLoadError: "Impossibile caricare le playlist. Controlla Music Assistant e riprova.", playlistPlayError: "Riproduzione non confermata. Controlla il lettore prima di riprovare.",
  showPlaylists: "Pulsante playlist Music Assistant", enabled: "Attivo quando Music Assistant è disponibile", disabled: "Nascosto", playlistTarget: "Lettore preferito per le playlist", playlistAuto: "Automatico · prima il lettore Music Assistant attivo",

  recordSpeed: "Velocità animazione disco", play: "Riproduci", pause: "Pausa", stop: "Ferma", previous: "Brano precedente", next: "Brano successivo",
  volume: "Volume", progress: "Posizione di riproduzione", mute: "Disattiva audio", unmute: "Riattiva audio",
  idle: "Nessuna riproduzione", paused: "In pausa", playing: "In riproduzione", buffering: "Caricamento",
  unavailable: "Lettore non disponibile", off: "Spento", unknown: "Sconosciuto", on: "Pronto", standby: "Standby",
  artist: "Artista sconosciuto", loading: "In attesa di Home Assistant", error: "Il lettore non ha completato il comando.",
  players: "Lettori multimediali · ordine di priorità", add: "Aggiungi lettore", remove: "Rimuovi lettore", name: "Nome personalizzato",
  theme: "Stile", color: "Colore", language: "Lingua", auto: "Automatico", light: "Chiaro", dark: "Scuro",
  minimal: "Minimal", minimal_small: "Minimal Small", classic: "Classic", cassette: "Cassette", searchPlayers: "Cerca lettori multimediali", choosePlayer: "Scegli un lettore multimediale", noPlayers: "Nessun lettore corrispondente",
  hint: "Viene selezionato automaticamente il lettore in riproduzione. L’ordine determina la priorità all’apertura della card.",
};
export type Label = keyof typeof en;
export function labels(config?: Config, hass?: HomeAssistant): typeof en {
  const lang = config?.language && config.language !== "auto" ? config.language : hass?.locale?.language ?? hass?.language ?? "en";
  return lang.toLowerCase().startsWith("it") ? it : en;
}
