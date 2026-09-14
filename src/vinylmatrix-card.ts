import { LitElement, html, nothing, type PropertyValues } from "lit";
import { live } from "lit/directives/live.js";
import { keyed } from "lit/directives/keyed.js";
import type { Config, NormalizedConfig, HomeAssistant, Player } from "./types.ts";
import { available, artworkUrl, canSeek, duration, Feature, formatTime, mediaKey, normalizeConfig, number, playbackAction, position, selectPlayer, supports, text } from "./player.ts";
import { labels, type Label } from "./i18n.ts";
import { minimalArm, icon } from "./graphics.ts";
import { styles } from "./styles.ts";
import { minimalStyles } from "./minimal-styles.ts";
import { classicStyles } from "./classic-styles.ts";
import { classicArm, platterRim } from "./classic-graphics.ts";
import "./editor.ts";

type Slider = "seek" | "volume";
interface Gesture { kind: Slider; entity: string; key: string; value: number; canceled?: boolean }

export class VinylMatrixCard extends LitElement {
  static properties = {
    hass: { attribute:false }, config: { state:true }, active: { state:true },
    clock: { state:true }, failedArt: { state:true }, error: { state:true },
    rpm: { state:true }, busy: { state:true }, volumeOpen: { state:true }, gesture: { state:true },
  };
  static styles = [styles, minimalStyles, classicStyles];
  hass?: HomeAssistant;
  private config?: NormalizedConfig;
  private active?: string;
  private clock = Date.now();
  private failedArt = "";
  private error = "";
  private busy = false;
  private rpm: 33 | 45 = 33;
  private volumeOpen = false;
  private gesture?: Gesture;
  private timer?: ReturnType<typeof setInterval>;
  private commandGeneration = 0;

  static async getConfigElement() {
    if (!customElements.get("ha-selector")) {
      const load=(window as Window & { loadCardHelpers?: () => Promise<{createCardElement:(config:object)=>HTMLElement}> }).loadCardHelpers;
      if (load) {
        try {
          const helpers=await load();
          const tile=helpers.createCardElement({type:"tile",entity:"media_player.placeholder"});
          await (tile.constructor as typeof HTMLElement & {getConfigElement?:()=>Promise<HTMLElement>}).getConfigElement?.();
        } catch { /* The editor also provides a searchable fallback. */ }
      }
    }
    return document.createElement("vinylmatrix-card-editor");
  }
  static getStubConfig(hass: HomeAssistant) {
    const entities=Object.keys(hass.states).filter(id=>id.startsWith("media_player."));
    return { entities:entities.slice(0,1), theme:"minimal", color_mode:"auto" };
  }
  setConfig(config: Config) {
    this.config=normalizeConfig(config);
    if (this.gesture) this.gesture={...this.gesture,canceled:true};
    this.error="";
  }
  getCardSize() { return (this.config?.theme === "minimal") ? 8 : 7; }
  getGridOptions() { return { columns:12, min_columns:6 }; }
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("visibilitychange",this.visibilityChanged);
    this.requestUpdate();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("visibilitychange",this.visibilityChanged);
    this.stopTimer();
    this.gesture=undefined;
    this.commandGeneration++;
    this.busy=false;
  }
  private visibilityChanged = () => { this.clock=Date.now(); this.syncTimer(); };
  private stopTimer() { if (this.timer) clearInterval(this.timer); this.timer=undefined; }
  private syncTimer() {
    const needsClock=this.isConnected && !document.hidden && this.player?.state === "playing" && position(this.player) !== undefined;
    if (!needsClock) this.stopTimer();
    else if (!this.timer) this.timer=setInterval(()=>{ this.clock=Date.now(); },1000);
  }
  private get player(): Player | undefined { return this.active ? this.hass?.states[this.active] : undefined; }
  protected willUpdate(changes: PropertyValues) {
    if (this.config && this.hass) {
      const next=selectPlayer(this.config.entities,this.hass.states,this.active);
      if (next !== this.active) {
        this.active=next;
        if (this.gesture) this.gesture={...this.gesture,canceled:true};
        this.volumeOpen=false;
        this.error="";
        this.busy=false;
        this.commandGeneration++;
      }
      if (this.gesture && (this.gesture.entity !== this.active || (this.gesture.kind === "seek" && this.gesture.key !== mediaKey(this.player)))) this.gesture={...this.gesture,canceled:true};
    }
    if (changes.has("hass")) this.clock=Date.now();
  }
  protected updated() { this.syncTimer(); }
  private art(): string | undefined {
    const resolve=(path:string)=>this.hass?.hassUrl?.(path) ?? path;
    return artworkUrl(this.player?.attributes.entity_picture_local,resolve) ?? artworkUrl(this.player?.attributes.entity_picture,resolve);
  }
  private capture(kind: Slider, value: number) {
    if (!this.active) return;
    this.gesture={kind,entity:this.active,key:mediaKey(this.player),value};
  }
  private async commitSlider(kind: Slider, event: Event) {
    const value=Number((event.target as HTMLInputElement).value);
    const gesture=this.gesture;
    this.gesture=undefined;
    if (!gesture || gesture.canceled || gesture.entity !== this.active || gesture.kind !== kind) return;
    if (kind === "seek") {
      if (!canSeek(this.player) || gesture.key !== mediaKey(this.player)) return;
      await this.command("media_seek",Feature.SEEK,{seek_position:Math.min(duration(this.player)!,Math.max(0,value))},gesture.entity);
    } else {
      await this.command("volume_set",Feature.VOLUME_SET,{volume_level:Math.max(0,Math.min(1,value))},gesture.entity);
    }
    this.requestUpdate();
  }
  private async command(service: string, feature: number, data: Record<string,unknown> = {}, entity=this.active) {
    if (!entity || entity !== this.active || !this.hass || this.busy || !supports(this.hass.states[entity],feature)) return;
    const generation=++this.commandGeneration;
    this.busy=true; this.error="";
    try { await this.hass.callService("media_player",service,{...data,entity_id:entity}); }
    catch { if (generation === this.commandGeneration) this.error=labels(this.config,this.hass).error; }
    finally { if (generation === this.commandGeneration) this.busy=false; }
  }
  private slider(kind: Slider, vertical=false) {
    const t=labels(this.config,this.hass), p=this.player;
    const isSeek=kind === "seek";
    const max=isSeek ? duration(p) ?? 1 : 1;
    const actual=isSeek ? position(p,this.clock) ?? 0 : Math.max(0,Math.min(1,number(p?.attributes.volume_level) ?? 0));
    const value=this.gesture?.kind === kind && !this.gesture.canceled ? this.gesture.value : actual;
    const enabled=isSeek ? canSeek(p) : supports(p,Feature.VOLUME_SET) && number(p?.attributes.volume_level) !== undefined;
    const label=isSeek ? t.progress : t.volume;
    return html`<div class=${vertical ? "vertical" : "horizontal"}>
      ${vertical ? icon(isSeek ? "progress" : "volume") : nothing}
      <input data-kind=${kind} type="range" min="0" max=${max} step=${isSeek ? "1" : "0.01"}
        .value=${live(String(value))} ?disabled=${!enabled || this.busy} aria-label=${label}
        style=${`--range-fill:${Math.min(100,Math.max(0,value/max*100))}%`}
        aria-orientation=${vertical ? "vertical" : "horizontal"}
        aria-valuetext=${isSeek ? formatTime(value) : `${Math.round(value*100)}%`}
        @pointerdown=${()=>this.capture(kind,value)} @pointercancel=${()=>{this.gesture=undefined;}}
        @keydown=${()=>{if (!this.gesture) this.capture(kind,value);}}
        @input=${(e:Event)=>{const val=Number((e.target as HTMLInputElement).value); if (!this.gesture) this.capture(kind,val); else this.gesture={...this.gesture,value:val};}}
        @change=${(e:Event)=>this.commitSlider(kind,e)} @blur=${()=>{this.gesture=undefined;}}/>
      ${vertical ? html`<output>${isSeek ? formatTime(position(p,this.clock)) : number(p?.attributes.volume_level) === undefined ? "—" : `${Math.round(value*100)}%`}</output>` : isSeek ? html`<div class="times"><span>${formatTime(position(p,this.clock))}</span><span>${formatTime(duration(p))}</span></div>` : nothing}
    </div>`;
  }
  protected render() {
    const t=labels(this.config,this.hass);
    if (!this.config || !this.hass) return html`<div class="empty">${t.loading}</div>`;
    const p=this.player;
    const playing=p?.state === "playing";
    const theme=this.config.theme;
    const horizontal=theme === "minimal";
    const dark=this.config.color_mode === "dark" || (this.config.color_mode === "auto" && (this.hass.themes?.darkMode ?? false));
    const requestedArt=this.art();
    const artUrl=requestedArt && requestedArt !== this.failedArt ? requestedArt : undefined;
    const state=available(p) ? (p.state in t ? t[p.state as Label] : p.state) : t.unavailable;
    const title=available(p) ? text(p.attributes.media_title) || t.idle : t.unavailable;
    const artist=text(p?.attributes.media_artist) || text(p?.attributes.media_album_artist) || t.artist;
    const playerName=this.config.name || text(p?.attributes.friendly_name) || this.active;
    const action=playbackAction(p);
    const actionLabel=action ? t[action.icon] : t.play;
    const capturedEntity=this.active;
    const artImage=artUrl ? html`<img src=${artUrl} alt="" referrerpolicy="no-referrer" @error=${()=>{this.failedArt=artUrl;}}/>` : nothing;
    const footer=html`      <div class="meta"><h2 class="title" title=${title}>${title}</h2><p class="artist" title=${artist}>${artist}</p></div>
      <p class="player" title=${`${playerName} · ${state}`}><span class="dot"></span>${playerName} · ${state}</p>
      ${this.slider("seek")}
      <div class="transport">
        <button aria-label=${t.previous} title=${t.previous} ?disabled=${!supports(p,Feature.PREVIOUS_TRACK) || this.busy} @click=${()=>this.command("media_previous_track",Feature.PREVIOUS_TRACK,{},capturedEntity)}>${icon("previous")}</button>
        <button class="primary" aria-label=${actionLabel} title=${actionLabel} ?disabled=${!action || this.busy} @click=${()=>action && this.command(action.service,action.feature,{},capturedEntity)}>${icon(action?.icon ?? "play")}</button>
        <button aria-label=${t.next} title=${t.next} ?disabled=${!supports(p,Feature.NEXT_TRACK) || this.busy} @click=${()=>this.command("media_next_track",Feature.NEXT_TRACK,{},capturedEntity)}>${icon("next")}</button>
        ${horizontal ? html`<button aria-label=${t.volume} title=${t.volume} aria-expanded=${this.volumeOpen} ?disabled=${!supports(p,Feature.VOLUME_SET) && !supports(p,Feature.VOLUME_MUTE)} @click=${()=>{this.volumeOpen=!this.volumeOpen;}}>${icon(p?.attributes.is_volume_muted ? "mute" : "volume")}</button>` : nothing}
      </div>
`;
    return html`<ha-card class="card ${theme} ${dark ? "dark" : "light"} ${playing ? "playing" : ""}" style=${theme === "classic" ? `--record-period:${this.rpm === 33 ? 60/33 : 60/45}s` : ""} data-player=${this.active ?? ""} aria-label=${`VinylMatrix · ${playerName}`}>
      ${horizontal && artUrl ? html`<img class="backdrop" src=${artUrl} alt="" referrerpolicy="no-referrer"/>` : nothing}
      <div class="stage">
        <div class="deck" role=${theme === "classic" ? "group" : "img"} aria-label=${`${title} · ${state}`}>
          ${theme === "classic" ? platterRim() : nothing}
          <div class="record"><div class="rotor"><div class="cover">${keyed(artUrl ?? "fallback",artUrl ? artImage : html`<div class="fallback" aria-hidden="true">♫</div>`)}</div></div><span class="spindle"></span></div>
          ${theme === "classic" ? classicArm() : minimalArm()}
          ${theme === "classic" ? html`
            <div class="deck-buttons">
              <button class="start-stop" aria-label=${`Start / Stop · ${actionLabel}`} title=${actionLabel} ?disabled=${!action || this.busy} @click=${()=>action && this.command(action.service,action.feature,{},capturedEntity)}><span>START<br/>STOP</span></button>
              <div class="speed-buttons" role="group" aria-label=${t.recordSpeed}>${([33,45] as const).map(rpm=>html`<button aria-pressed=${this.rpm === rpm} title=${`${t.recordSpeed}: ${rpm}`} aria-label=${`${t.recordSpeed}: ${rpm}`} @click=${()=>{this.rpm=rpm;}}>${rpm}</button>`)}</div>
            </div>
            <div class="classic-volume"><span>${t.volume}</span>${this.slider("volume",true)}</div>
          ` : nothing}
        </div>
      </div>
      ${theme === "classic" ? html`<div class="classic-footer">${footer}</div>` : footer}
      ${horizontal && this.volumeOpen ? html`<div class="volume-popover"><button aria-label=${p?.attributes.is_volume_muted ? t.unmute : t.mute} ?disabled=${!supports(p,Feature.VOLUME_MUTE) || this.busy} @click=${()=>this.command("volume_mute",Feature.VOLUME_MUTE,{is_volume_muted:!p?.attributes.is_volume_muted},capturedEntity)}>${icon(p?.attributes.is_volume_muted ? "mute" : "volume")}</button><div style="flex:1">${this.slider("volume")}</div></div>` : nothing}
      ${this.error ? html`<p class="error" role="alert">${this.error}</p>` : nothing}
    </ha-card>`;
  }
}
if (!customElements.get("vinylmatrix-card")) customElements.define("vinylmatrix-card",VinylMatrixCard);
const registry=window as Window & { customCards?: Array<{type:string;name:string;description:string;preview:boolean}> };
registry.customCards ??= [];
if (!registry.customCards.some(card=>card.type === "vinylmatrix-card")) registry.customCards.push({type:"vinylmatrix-card",name:"VinylMatrix Card",description:"An animated turntable for your music players",preview:true});
console.info("VinylMatrix Card 0.2.0");
