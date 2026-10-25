import { LitElement, html, nothing, type PropertyValues } from "lit";
import { live } from "lit/directives/live.js";
import type { Config, HomeAssistant } from "./types.ts";
import { labels, type Label } from "./i18n.ts";
import { available, artworkUrl, text } from "./player.ts";
import { getPlaylists, initialPlaylistTarget, playlistTargets, playPlaylist, withTimeout, PLAYLIST_PAGE_SIZE, type Playlist, type PlaylistTarget } from "./music-assistant.ts";
import { playlistStyles } from "./playlist-styles.ts";
const listIcon=()=>html`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h12M3 11h12M3 16h7M18 8v10"/><path d="M18 8l4 1"/><ellipse cx="15.5" cy="18" rx="2.5" ry="2"/></svg>`;
export class VinylMatrixPlaylists extends LitElement {
  static styles=playlistStyles;
  static properties={hass:{attribute:false},config:{attribute:false},activeEntity:{attribute:false},
    open:{type:Boolean,reflect:true},loading:{state:true},starting:{state:true},targets:{state:true},selected:{state:true},items:{state:true},draft:{state:true},more:{state:true},error:{state:true},notice:{state:true},failedImages:{state:true}};
  hass?: HomeAssistant;
  config?: Config;
  activeEntity?: string;
  private open=false;
  private loading=false;
  private starting=false;
  private targets: PlaylistTarget[]=[];
  private selected="";
  private items: Playlist[]=[];
  private draft="";
  private search="";
  private more=false;
  private offset=0;
  private error: Label | ""="";
  private notice="";
  private generation=0;
  private failedImages=new Set<string>();
  private get target() { return this.targets.find(t=>t.entity === this.selected); }
  private reset() { this.generation++;this.open=false;this.loading=false;this.starting=false;this.items=[];this.error="";this.notice=""; }
  protected willUpdate(changes:PropertyValues) {
    const old=changes.get("hass") as HomeAssistant | undefined;
    if (changes.has("config") || (old && old.connection !== this.hass?.connection)) this.reset();
  }
  protected updated(changes:PropertyValues) {
    if (changes.has("open")) this.dispatchEvent(new CustomEvent('playlist-open-changed',{detail:this.open}));
  }
  disconnectedCallback() { super.disconnectedCallback();this.reset(); }
  async toggle() {
    if (this.open) { this.reset();return; }
    this.open=true;this.draft="";this.search="";this.failedImages=new Set();
    await this.discover();
    if (this.open) { await this.updateComplete;this.renderRoot.querySelector<HTMLInputElement>('input[type=search]')?.focus(); }
  }
  private async discover() {
    const hass=this.hass, config=this.config, id=++this.generation;
    this.loading=true;this.error="";this.items=[];this.targets=[];this.selected="";this.more=false;
    try {
      if (!hass?.callWS || !hass.services?.music_assistant?.get_library || !hass.services?.music_assistant?.play_media) throw Error("Music Assistant actions unavailable");
      const registry=await withTimeout(hass.callWS({type:"config/entity_registry/list"}));
      if (id !== this.generation || !this.open) return;
      this.targets=playlistTargets(registry,config?.entities ?? (config?.entity ? [config.entity] : []),config?.playlist_entity);
      this.selected=initialPlaylistTarget(this.targets,hass,this.activeEntity,config?.playlist_entity);
      if (!this.selected) { this.error="playlistNoTarget";return; }
      await this.load();
    } catch { if(id === this.generation) this.error="playlistConnectError"; }
    finally { if(id === this.generation) this.loading=false; }
  }
  private async load(append=false) {
    const target=this.target, hass=this.hass;
    if (!target || !hass || this.starting) return;
    const id=++this.generation,offset=append ? this.offset+PLAYLIST_PAGE_SIZE : 0;
    this.loading=true;this.error="";this.notice="";
    if (!append) {this.items=[];this.more=false;this.offset=0;this.search=this.draft.trim();}
    try {
      const result=await getPlaylists(hass,target,this.search,offset);
      if (id !== this.generation || !this.open) return;
      this.items=append ? [...this.items,...result.items.filter(item=>!this.items.some(old=>old.uri === item.uri))] : result.items;
      this.offset=offset;this.more=result.more;
    } catch { if(id === this.generation) this.error="playlistLoadError"; }
    finally { if(id === this.generation) this.loading=false; }
  }
  private async start(item:Playlist) {
    const target=this.target,hass=this.hass;
    if (!target || !hass || this.loading || this.starting || !available(hass.states[target.entity]) || !this.items.some(row=>row.uri === item.uri)) return;
    const id=++this.generation;this.starting=true;this.error="";this.notice="";
    try {
      await playPlaylist(hass,target,item);
      if (id === this.generation && this.open) this.notice=labels(this.config,hass).playlistStarted;
    } catch { if(id === this.generation) this.error="playlistPlayError"; }
    finally { if(id === this.generation) this.starting=false; }
  }
  protected render() {
    const t=labels(this.config,this.hass), unavailable=!available(this.hass?.states[this.selected]);
    return html`${this.open ? html`<section class="panel" id="playlist-panel" role="region" aria-label=${t.playlists} @keydown=${(e:KeyboardEvent)=>{if(e.key === "Escape"){e.stopPropagation();this.reset();this.dispatchEvent(new CustomEvent('playlist-focus-toggle'));}}}>
        <h3>Music Assistant</h3>
        ${this.targets.length ? html`<label for="playlist-player">${t.playlistPlayer}</label><select id="playlist-player" .value=${live(this.selected)} ?disabled=${this.starting}
          @change=${(e:Event)=>{this.selected=(e.target as HTMLSelectElement).value;this.draft="";void this.load();}}>
          ${!this.selected ? html`<option value="">${t.choosePlayer}</option>` : nothing}
          ${this.targets.map(target=>html`<option value=${target.entity}>${text(this.hass?.states[target.entity]?.attributes.friendly_name) || target.entity} · ${target.entity}</option>`)}
        </select>` : nothing}
        ${this.selected ? html`<form @submit=${(e:Event)=>{e.preventDefault();void this.load();}}><input type="search" aria-label=${t.playlistSearch} placeholder=${t.playlistSearch} .value=${live(this.draft)} ?disabled=${this.starting} @input=${(e:Event)=>{this.draft=(e.target as HTMLInputElement).value;}}/><button aria-label=${t.playlistSearch} ?disabled=${this.starting}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></svg></button></form>
          <p class="hint">${t.playlistReplace}</p>${unavailable ? html`<p class="status">${t.unavailable}</p>` : nothing}` : nothing}
        ${this.error ? html`<p class="status error" role="alert">${t[this.error]}</p><button class="retry" ?disabled=${this.loading || this.starting} @click=${()=>this.error === "playlistConnectError" || this.error === "playlistNoTarget" ? this.discover() : this.load()}>${t.retry}</button>` : nothing}
        <div role="status" aria-live="polite">${this.loading ? html`<p class="status">${t.playlistLoading}</p>` : this.starting ? html`<p class="status">${t.playlistStarting}</p>` : this.notice ? html`<p class="status">${this.notice}</p>` : nothing}</div>
        ${!this.loading && !this.error && this.selected && !this.items.length ? html`<p class="status">${t.playlistEmpty}</p>` : nothing}
        <ul aria-label=${t.playlists} aria-busy=${this.loading}>${this.items.map(item=>{
          const image=artworkUrl(item.image,path=>this.hass?.hassUrl?.(path) ?? path);
          return html`<li><button class="playlist" title=${item.name} aria-label=${`${t.play}: ${item.name}`} ?disabled=${this.loading || this.starting || unavailable} @click=${()=>this.start(item)}>
            <span class="art">${image && !this.failedImages.has(image) ? html`<img src=${image} alt="" loading="lazy" referrerpolicy="no-referrer" @error=${()=>{this.failedImages=new Set([...this.failedImages,image]);}}/>` : listIcon()}</span><span class="name">${item.name}</span><svg class="play" viewBox="0 0 16 16" aria-hidden="true"><path d="m5 2 8 6-8 6Z"/></svg>
          </button></li>`;
        })}</ul>
        ${this.more ? html`<button class="more" ?disabled=${this.loading || this.starting} @click=${()=>this.load(true)}>${t.loadMore}</button>` : nothing}
      </section>` : nothing}`;
  }
}
if(!customElements.get("vinylmatrix-playlists")) customElements.define("vinylmatrix-playlists",VinylMatrixPlaylists);
