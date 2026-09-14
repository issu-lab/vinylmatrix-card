import type { Config, NormalizedConfig, Player } from "./types.ts";

// Home Assistant MediaPlayerEntityFeature (core/components/media_player/const.py).
export const Feature = { PAUSE: 1, SEEK: 2, VOLUME_SET: 4, VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16, NEXT_TRACK: 32, STOP: 4096, PLAY: 16384 } as const;

export function normalizeConfig(config: Config): NormalizedConfig {
  const ids = config.entities ?? (config.entity ? [config.entity] : []);
  if (!Array.isArray(ids) || ids.length === 0 || ids.some(id => typeof id !== "string" || !/^media_player\.[a-z0-9_]+$/.test(id))) {
    throw new Error("VinylMatrix: configure at least one media_player in entities.");
  }
  if (config.theme && !["vinyl", "minimal", "classic", "ambient"].includes(config.theme)) throw new Error("VinylMatrix: invalid theme.");
  if (config.color_mode && !["auto", "light", "dark"].includes(config.color_mode)) throw new Error("VinylMatrix: invalid color_mode.");
  if (config.language && !["auto", "en", "it"].includes(config.language)) throw new Error("VinylMatrix: invalid language.");
  if (config.name !== undefined && typeof config.name !== "string") throw new Error("VinylMatrix: name must be text.");
  return { ...config, entities: [...new Set(ids)], theme: config.theme ?? "vinyl", color_mode: config.color_mode ?? "auto", language: config.language ?? "auto" };
}

export function available(player?: Player): player is Player {
  return !!player && !["unavailable", "unknown"].includes(player.state);
}
export function controllable(player?: Player): player is Player {
  return available(player) && !["off", "standby"].includes(player.state);
}
export function selectPlayer(ids: string[], states: Record<string, Player>, current?: string): string {
  const playing = ids.filter(id => states[id]?.state === "playing");
  if (current && playing.includes(current)) return current;
  if (playing.length) return playing[0];
  // Keep paused metadata and a stable target for resuming when nobody plays.
  if (current && ids.includes(current) && available(states[current])) return current;
  return ids.find(id => available(states[id])) ?? ids[0];
}
export function supports(player: Player | undefined, feature: number): boolean {
  const flags = player?.attributes.supported_features;
  return controllable(player) && typeof flags === "number" && (flags & feature) === feature;
}
export function number(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
export function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}
export function duration(player?: Player): number | undefined {
  const value = number(player?.attributes.media_duration);
  return value !== undefined && value > 0 ? value : undefined;
}
export function position(player: Player | undefined, now = Date.now()): number | undefined {
  const base = number(player?.attributes.media_position);
  if (base === undefined) return undefined;
  const timestamp = Date.parse(text(player?.attributes.media_position_updated_at));
  const elapsed = player?.state === "playing" && Number.isFinite(timestamp) ? Math.max(0, (now - timestamp) / 1000) : 0;
  return Math.max(0, Math.min(base + elapsed, duration(player) ?? Infinity));
}
export function mediaKey(player?: Player): string {
  return JSON.stringify([player?.attributes.media_content_id, player?.attributes.media_title, player?.attributes.media_artist, player?.attributes.media_duration]);
}
export function canSeek(player?: Player): boolean {
  return supports(player, Feature.SEEK) && duration(player) !== undefined && position(player) !== undefined;
}
export function formatTime(seconds?: number): string {
  if (seconds === undefined || !Number.isFinite(seconds)) return "—:—";
  const value = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(value / 3600);
  return `${hours ? `${hours}:` : ""}${String(Math.floor(value / 60) % 60).padStart(hours ? 2 : 1, "0")}:${String(value % 60).padStart(2, "0")}`;
}
export function playbackAction(player?: Player): { service: string; feature: number; icon: "play" | "pause" | "stop" } | undefined {
  if (!controllable(player)) return undefined;
  if (player.state === "playing") {
    if (supports(player, Feature.PAUSE)) return { service: "media_pause", feature: Feature.PAUSE, icon: "pause" };
    if (supports(player, Feature.STOP)) return { service: "media_stop", feature: Feature.STOP, icon: "stop" };
  } else if (supports(player, Feature.PLAY)) return { service: "media_play", feature: Feature.PLAY, icon: "play" };
  return undefined;
}
export function artworkUrl(raw: unknown, resolve: (path: string) => string = path => path): string | undefined {
  if (typeof raw !== "string" || !raw.trim()) return undefined;
  const value = raw.trim();
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) return resolve(value);
  return undefined;
}
