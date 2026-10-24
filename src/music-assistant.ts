import type { HomeAssistant } from "./types.ts";
import { available, text } from "./player.ts";

export interface PlaylistTarget { entity: string; entry: string }
export interface Playlist { uri: string; name: string; image?: string }
export const PLAYLIST_PAGE_SIZE = 25;
export function hasMusicAssistant(hass?: HomeAssistant): boolean {
  return !!hass?.services?.music_assistant;
}
export function playlistTargets(registry: unknown, entities: string[], preferred?: string): PlaylistTarget[] {
  if (!Array.isArray(registry)) throw Error("Invalid entity registry response");
  return [...new Set([...entities, ...(preferred ? [preferred] : [])])].flatMap(entity=>{
    const row=registry.find(row=>row?.entity_id === entity && row.platform === "music_assistant" && !row.disabled_by);
    return row && typeof row.config_entry_id === "string" && row.config_entry_id ? [{entity,entry:row.config_entry_id}] : [];
  });
}
export function initialPlaylistTarget(targets: PlaylistTarget[], hass: HomeAssistant, active?: string, preferred?: string): string {
  // An explicit destination must never silently fall back to a different speaker.
  if (preferred) return targets.some(t=>t.entity === preferred) ? preferred : "";
  return targets.find(t=>t.entity === active && available(hass.states[t.entity]))?.entity
    ?? targets.find(t=>available(hass.states[t.entity]))?.entity ?? targets[0]?.entity ?? "";
}
export function playlistPage(result: unknown): { items: Playlist[]; more: boolean } {
  const response=(result as {response?:{items?:unknown}})?.response;
  if (!Array.isArray(response?.items)) throw Error("Invalid Music Assistant library response");
  const items: Playlist[]=[];
  for (const value of response.items) {
    if (!value || value.media_type !== "playlist" || !text(value.uri) || !text(value.name)) continue;
    if (!items.some(item=>item.uri === value.uri)) items.push({uri:value.uri,name:value.name,image:text(value.image) || undefined});
  }
  return {items,more:response.items.length >= PLAYLIST_PAGE_SIZE};
}
export async function withTimeout<T>(operation: Promise<T>, milliseconds=15000): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try { return await Promise.race([operation,new Promise<never>((_,reject)=>{timer=setTimeout(()=>reject(Error("Music Assistant timed out")),milliseconds);})]); }
  finally { if (timer) clearTimeout(timer); }
}
export async function getPlaylists(hass: HomeAssistant, target: PlaylistTarget, search: string, offset=0) {
  if (!hass.callWS) throw Error("Home Assistant connection unavailable");
  const response=await withTimeout(hass.callWS({type:"call_service",domain:"music_assistant",service:"get_library",return_response:true,
    service_data:{config_entry_id:target.entry,media_type:"playlist",limit:PLAYLIST_PAGE_SIZE,offset,order_by:"name",...(search.trim() ? {search:search.trim()} : {})}}));
  return playlistPage(response);
}
export async function playPlaylist(hass: HomeAssistant, target: PlaylistTarget, playlist: Playlist) {
  if (!available(hass.states[target.entity])) throw Error("Music Assistant player unavailable");
  return withTimeout(hass.callService("music_assistant","play_media",{
    entity_id:target.entity,media_id:playlist.uri,media_type:"playlist",enqueue:"replace",
  }));
}
