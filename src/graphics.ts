import { svg } from "lit";
export function icon(name: string) {
  const paths: Record<string, string> = {
    play: "M8 5v14l11-7Z", pause: "M8 5v14M16 5v14", stop: "M6 6h12v12H6Z",
    previous: "M5 5v14M19 5 8 12l11 7Z", next: "M19 5v14M5 5l11 7-11 7Z",
    volume: "M4 9v6h4l5 4V5L8 9ZM17 8c3 2 3 6 0 8M20 5c5 4 5 10 0 14",
    mute: "M4 9v6h4l5 4V5L8 9ZM17 9l5 6M22 9l-5 6",
    progress: "M12 7v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  };
  return svg`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d=${paths[name] ?? paths.play}/></svg>`;
}
export function arm(classic: boolean) {
  // Rest rotation pivots around (260, 44); playback rotates the cartridge inward.
  return svg`<svg class="tonearm" viewBox="0 0 320 300" aria-hidden="true">
    <g class="arm-rest"><path d="M274 101v20"/><path d="M268 101h12"/></g>
    <g class="arm-moving">
      <path class="shaft-shadow" d=${classic ? "M260 18V105C260 140 283 155 278 185S260 229 255 241" : "M260 18V191Q260 224 247 245"}/>
      <path class="shaft" d=${classic ? "M260 18V105C260 140 283 155 278 185S260 229 255 241" : "M260 18V191Q260 224 247 245"}/>
      <rect class="weight" x="250" y="13" width="20" height="18" rx="2"/>
      <circle class="pivot-outer" cx="260" cy="44" r="13"/>
      <circle class="pivot" cx="260" cy="44" r="8"/>
      <g transform=${classic ? "translate(256 238) rotate(22)" : "translate(250 239) rotate(22)"}>
        <rect class="cartridge" x="-6" y="-1" width="12" height="27" rx="3"/>
        <path class="needle" d="M0 26v5"/><circle class="screw" cx="0" cy="17" r="2"/>
      </g>
    </g>
  </svg>`;
}
