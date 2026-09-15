export interface Player {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}
export interface HomeAssistant {
  states: Record<string, Player>;
  language?: string;
  locale?: { language?: string };
  themes?: { darkMode?: boolean };
  hassUrl?: (path?: string) => string;
  callService(domain: string, service: string, data: Record<string, unknown>): Promise<unknown>;
}
export type Theme = "minimal" | "classic" | "cassette";
export interface Config {
  type: string;
  entities?: string[];
  entity?: string;
  name?: string;
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
