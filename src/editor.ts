import { LitElement, html, css } from "lit";
import type { Config, HomeAssistant } from "./types.ts";
import { labels } from "./i18n.ts";
export class VinylMatrixEditor extends LitElement {
  static properties = { hass: { attribute:false }, config: { state:true } };
  hass?: HomeAssistant;
  config: Config = { type:"custom:vinylmatrix-card", entities:[] };
  static styles = css`
    :host { display:block; color:var(--primary-text-color); font-family:var(--primary-font-family,system-ui); }
    * { box-sizing:border-box; } label { display:block; font-size:14px; margin:16px 0 6px; }
    input,select { font:inherit; padding:10px; width:100%; color:var(--primary-text-color); background:var(--card-background-color,#fff); border:1px solid var(--divider-color,#888); border-radius:6px; }
    .row { display:flex; gap:8px; margin-bottom:8px; } button { cursor:pointer; padding:8px 12px; border-radius:6px; border:1px solid var(--divider-color,#888); background:var(--card-background-color,#fff); color:var(--primary-text-color); }
    p { font-size:13px; color:var(--secondary-text-color,#888); line-height:1.5; }
  `;
  setConfig(config: Config) { this.config = { ...config, entities:[...(config.entities ?? (config.entity ? [config.entity] : []))] }; }
  private updateConfig(patch: Partial<Config>) {
    this.config = { ...this.config, ...patch };
    const result = { ...this.config };
    delete result.entity;
    this.dispatchEvent(new CustomEvent("config-changed", { detail:{ config:result }, bubbles:true, composed:true }));
  }
  protected render() {
    const t = labels(this.config,this.hass);
    const ids = this.config.entities ?? [];
    return html`
      <label>${t.players}</label>
      ${ids.map((id,index) => html`<div class="row"><input aria-label=${`${t.players} ${index+1}`} list="players" .value=${id} @change=${(event: Event) => { const next=[...ids]; next[index]=(event.target as HTMLInputElement).value.trim(); this.updateConfig({ entities:next }); }}/><button aria-label=${`${t.remove} ${index+1}`} @click=${() => this.updateConfig({ entities:ids.filter((_,i)=>i!==index) })}>×</button></div>`)}
      <datalist id="players">${Object.keys(this.hass?.states ?? {}).filter(id=>id.startsWith("media_player.")).sort().map(id=>html`<option value=${id}>${this.hass?.states[id].attributes.friendly_name}</option>`)}</datalist>
      <button @click=${() => this.updateConfig({ entities:[...ids,""] })}>+ ${t.add}</button><p>${t.hint}</p>
      <label for="name">${t.name}</label><input id="name" .value=${this.config.name ?? ""} @change=${(e:Event)=>this.updateConfig({name:(e.target as HTMLInputElement).value})}/>
      <label for="theme">${t.theme}</label><select id="theme" .value=${this.config.theme ?? "vinyl"} @change=${(e:Event)=>this.updateConfig({ theme:(e.target as HTMLSelectElement).value as Config["theme"] })}>${["vinyl","minimal","classic","ambient"].map(v=>html`<option value=${v}>${t[v as keyof typeof t]}</option>`)}</select>
      <label for="color">${t.color}</label><select id="color" .value=${this.config.color_mode ?? "auto"} @change=${(e:Event)=>this.updateConfig({color_mode:(e.target as HTMLSelectElement).value as Config["color_mode"]})}>${["auto","light","dark"].map(v=>html`<option value=${v}>${t[v as keyof typeof t]}</option>`)}</select>
      <label for="language">${t.language}</label><select id="language" .value=${this.config.language ?? "auto"} @change=${(e:Event)=>this.updateConfig({language:(e.target as HTMLSelectElement).value as Config["language"]})}><option value="auto">${t.auto}</option><option value="en">English</option><option value="it">Italiano</option></select>
    `;
  }
}
if (!customElements.get("vinylmatrix-card-editor")) customElements.define("vinylmatrix-card-editor",VinylMatrixEditor);
