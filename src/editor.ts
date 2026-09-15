import { LitElement, html, css } from "lit";
import type { Config, HomeAssistant } from "./types.ts";
import { labels } from "./i18n.ts";
import { normalizeTheme } from "./player.ts";
export class VinylMatrixEditor extends LitElement {
  static properties = { hass: { attribute:false }, config: { state:true }, queries: {state:true} };
  hass?: HomeAssistant;
  config: Config = { type:"custom:vinylmatrix-card", entities:[], theme:"minimal" };
  private queries: Record<number,string> = {};
  static styles = css`
    :host { display:block; color:var(--primary-text-color); font-family:var(--primary-font-family,system-ui); }
    * { box-sizing:border-box; } label { display:block; font-size:14px; margin:16px 0 6px; }
    input,select { font:inherit; padding:10px; width:100%; min-width:0; color:var(--primary-text-color); background:var(--card-background-color,#fff); border:1px solid var(--divider-color,#888); border-radius:6px; }
    .row { display:flex; align-items:start; gap:8px; margin-bottom:12px; } .picker,ha-selector { display:block; flex:1; min-width:0; }
    .picker input { margin-bottom:6px; } .row button { flex-shrink:0; }
    button { cursor:pointer; padding:8px 12px; border-radius:6px; border:1px solid var(--divider-color,#888); background:var(--card-background-color,#fff); color:var(--primary-text-color); }
    p { font-size:13px; color:var(--secondary-text-color,#888); line-height:1.5; }
  `;
  connectedCallback() {
    super.connectedCallback();
    if (!customElements.get("ha-selector")) void customElements.whenDefined("ha-selector").then(()=>{if(this.isConnected)this.requestUpdate();});
  }
  setConfig(config: Config) { this.config = { ...config, theme:normalizeTheme(config.theme), entities:[...(config.entities ?? (config.entity ? [config.entity] : []))] }; }
  private updateConfig(patch: Partial<Config>) {
    this.config = { ...this.config, ...patch };
    const result = { ...this.config, entities:this.config.entities?.filter(Boolean) };
    delete result.entity;
    this.dispatchEvent(new CustomEvent("config-changed", { detail:{ config:result }, bubbles:true, composed:true }));
  }
  private selectPlayer(index:number, value:unknown) {
    if (typeof value !== "string" || (value && !/^media_player\.[a-z0-9_]+$/.test(value))) return;
    const next=[...(this.config.entities ?? [])];
    if (value && next.some((id,i)=>i !== index && id === value)) return;
    next[index]=value;
    this.updateConfig({entities:next});
  }
  private picker(id:string,index:number) {
    const t=labels(this.config,this.hass);
    const excluded=(this.config.entities ?? []).filter((value,i)=>i !== index && value);
    if (customElements.get("ha-selector")) return html`<ha-selector
      .hass=${this.hass} .selector=${{entity:{filter:{domain:"media_player"},exclude_entities:excluded}}}
      .value=${id || undefined} .label=${`${t.players} ${index+1}`} .required=${false}
      @value-changed=${(e:CustomEvent)=>{e.stopPropagation();this.selectPlayer(index,e.detail.value ?? "");}}></ha-selector>`;
    // Searchable native fallback for the standalone preview or older HA frontends.
    const query=(this.queries[index] ?? "").trim().toLocaleLowerCase();
    const choices=Object.keys(this.hass?.states ?? {}).filter(entity=>entity.startsWith("media_player.") && !excluded.includes(entity)).filter(entity=>`${this.hass?.states[entity].attributes.friendly_name ?? ""} ${entity}`.toLocaleLowerCase().includes(query));
    return html`<div class="picker"><input type="search" aria-label=${`${t.searchPlayers} ${index+1}`} placeholder=${t.searchPlayers} .value=${this.queries[index] ?? ""}
      @input=${(e:Event)=>{this.queries={...this.queries,[index]:(e.target as HTMLInputElement).value};}}/>
      <select aria-label=${`${t.players} ${index+1}`} .value=${choices.includes(id) ? id : ""} @change=${(e:Event)=>this.selectPlayer(index,(e.target as HTMLSelectElement).value)}>
        <option value="" disabled>${choices.length ? t.choosePlayer : t.noPlayers}</option>
        ${choices.map(entity=>html`<option value=${entity}>${this.hass?.states[entity].attributes.friendly_name ?? entity} · ${entity}</option>`)}
      </select></div>`;
  }
  protected render() {
    const t = labels(this.config,this.hass);
    const ids = this.config.entities ?? [];
    return html`
      <label>${t.players}</label>
      ${ids.map((id,index) => html`<div class="row">${this.picker(id,index)}<button aria-label=${`${t.remove} ${index+1}`} @click=${()=>{this.queries={};this.updateConfig({entities:ids.filter((_,i)=>i!==index)});}}>×</button></div>`)}
      <button @click=${()=>{this.config={...this.config,entities:[...ids,""]};}}>+ ${t.add}</button><p>${t.hint}</p>
      <label for="name">${t.name}</label><input id="name" .value=${this.config.name ?? ""} @change=${(e:Event)=>this.updateConfig({name:(e.target as HTMLInputElement).value})}/>
      <label for="theme">${t.theme}</label><select id="theme" .value=${this.config.theme ?? "minimal"} @change=${(e:Event)=>this.updateConfig({ theme:(e.target as HTMLSelectElement).value as Config["theme"] })}>${["minimal","classic","cassette"].map(v=>html`<option value=${v}>${t[v as keyof typeof t]}</option>`)}</select>
      <label for="color">${t.color}</label><select id="color" .value=${this.config.color_mode ?? "auto"} @change=${(e:Event)=>this.updateConfig({color_mode:(e.target as HTMLSelectElement).value as Config["color_mode"]})}>${["auto","light","dark"].map(v=>html`<option value=${v}>${t[v as keyof typeof t]}</option>`)}</select>
      <label for="language">${t.language}</label><select id="language" .value=${this.config.language ?? "auto"} @change=${(e:Event)=>this.updateConfig({language:(e.target as HTMLSelectElement).value as Config["language"]})}><option value="auto">${t.auto}</option><option value="en">English</option><option value="it">Italiano</option></select>
    `;
  }
}
if (!customElements.get("vinylmatrix-card-editor")) customElements.define("vinylmatrix-card-editor",VinylMatrixEditor);
