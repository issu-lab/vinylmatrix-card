export interface Player {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}
export interface HomeAssistant {
  states: Record<string, Player>;
  services?: Record<string, Record<string, unknown>>;
  connection?: object;
  callWS?<T = unknown>(message: Record<string, unknown>): Promise<T>;
  language?: string;
  locale?: { language?: string };
  themes?: { darkMode?: boolean };
  hassUrl?: (path?: string) => string;
  callService(domain: string, service: string, data: Record<string, unknown>): Promise<unknown>;
}
export type Theme = "minimal" | "minimal_small" | "classic" | "cassette";
export interface Config {
  type: string;
  entities?: string[];
  entity?: string;
  name?: string;
  show_playlists?: boolean;
  playlist_entity?: string;
  theme?: Theme;
  color_mode?: "auto" | "light" | "dark";
  language?: "auto" | "en" | "it";
}
export interface NormalizedConfig extends Config {
  entities: string[];
  theme: Theme;
  color_mode: "auto" | "light" | "dark";
  language: "auto" | "en" | "it";
}
