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
// Geometry follows the reference image in a 1000 × 837 deck, independently of card width.
export function minimalArm() {
  return svg`<svg class="tonearm reference-arm" viewBox="0 0 1000 837" aria-hidden="true">
    <defs>
      <linearGradient id="vm-metal" x1="0" x2="1"><stop stop-color="#1b1b1b"/><stop offset=".24" stop-color="#747474"/><stop offset=".46" stop-color="#ededeb"/><stop offset=".65" stop-color="#939392"/><stop offset="1" stop-color="#292929"/></linearGradient>
      <linearGradient id="vm-head" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#353535"/><stop offset="1" stop-color="#101010"/></linearGradient>
      <radialGradient id="vm-pivot"><stop stop-color="#6f706e"/><stop offset=".62" stop-color="#484947"/><stop offset="1" stop-color="#202120"/></radialGradient>
    </defs>
    <g class="reference-rest"><path d="M889 578h24m-12-12v28"/></g>
    <g class="arm-moving">
      <path d="M870 68 856 194 828 532Q823 603 802 633L776 660" fill="none" stroke="#0008" stroke-width="14" transform="translate(3 3)"/>
      <path d="M870 68 856 194 828 532Q823 603 802 633L776 660" fill="none" stroke="#414141" stroke-width="10"/>
      <path d="M868 68 854 194 826 532Q821 601 800 632L774 658" fill="none" stroke="#c4c4c2" stroke-width="5"/>
      <path d="M867 68 853 194 825 532Q820 601 799 632L773 658" fill="none" stroke="#fff9" stroke-width="1.5"/>
      <rect x="839" y="93" width="53" height="42" rx="2" fill="url(#vm-metal)" stroke="#222" stroke-width="2" transform="rotate(6 865 114)"/>
      <circle cx="856" cy="194" r="29" fill="#111" stroke="#41413e" stroke-width="3"/>
      <circle cx="856" cy="194" r="17" fill="url(#vm-pivot)" stroke="#bfc0bb" stroke-width="2.5"/>
      <g transform="translate(774 659) rotate(39)">
        <path class="stylus" d="M0 44v20" stroke="#93938e" stroke-width="2"/>
        <rect x="-19" y="-8" width="38" height="65" rx="12" fill="url(#vm-head)" stroke="#141414" stroke-width="2"/>
        <circle cx="0" cy="32" r="7" fill="#181818" stroke="#d3d5cf" stroke-width="2"/>
      </g>
    </g>
  </svg>`;
}
