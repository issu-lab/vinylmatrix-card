import { svg } from "lit";

// A flat, see-through cassette. The tape stays fixed while reels turn and heads lift.
export function cassetteMechanism() {
  return svg`<svg class="cassette-mechanism" viewBox="0 0 1000 510" aria-hidden="true">
    <rect class="shell-glass" x="12" y="12" width="976" height="486" rx="24"/>
    <g class="shell-lines" fill="none" stroke-width="2">
      <path d="M24 76h60l28-28h776l28 28h60M24 438h44l26 42h812l26-42h44M90 48v-24m820 24v-24M500 24v330M110 98v185H74v76m816-261v185h36v76M400 348h200v38H400z"/>
      <path d="M144 54v-30m712 30v-30M55 120v90h22v76H54v84m891-250v90h-22v76h23v84M270 478v-24h36v24m388 0v-24h36v24"/>
      <circle cx="500" cy="73" r="16"/><circle cx="445" cy="73" r="12"/><circle cx="555" cy="73" r="12"/>
    </g>
    ${[300,700].map((cx,i)=>svg`<g transform=${`translate(${cx} 215)`}>
      <circle class="tape-pack" r="168"/>
      <circle class="reel-rim" r="163"/>
      <g class="reel-spin" style=${`animation-delay:${i ? '-1.8s' : '0s'}`}>
        <circle class="reel-face" r="157"/>
        ${[0,120,240].map(angle=>svg`<path class="reel-window" transform=${`rotate(${angle})`} d="M-37-66-70-119A138 138 0 0 1 70-119L37-66A76 76 0 0 0-37-66Z"/>`)}
        <circle class="reel-hub-ring" r="55"/><circle class="reel-hub" r="46"/>
        ${[0,60,120,180,240,300].map(angle=>svg`<rect class="reel-tooth" x="-5" y="-46" width="10" height="9" rx="1" transform=${`rotate(${angle})`}/> `)}
      </g>
      <circle class="reel-axle" r="9"/>
    </g>`)}
    <g class="shell-lines" fill="none" stroke-width="3">
      <circle cx="74" cy="354" r="12"/><circle cx="926" cy="354" r="12"/>
      <path d="M357 478v-62m286 62v-62"/>
    </g>
    <g class="cassette-heads">
      <path class="head-carriage" d="M350 446h300v32H350z"/>
      <path class="head-metal" d="M423 432h23v12h-7v40h-9v-40h-7zM554 432h23v12h-7v40h-9v-40h-7z"/>
      <rect class="read-head head-metal" x="465" y="432" width="70" height="51" rx="3"/>
      <path class="head-slot" d="M487 473h26" stroke-width="5"/>
      ${[365,635].map(cx=>svg`<g><circle class="pinch-roller" cx=${cx} cy="450" r="27"/><circle class="roller-axle" cx=${cx} cy="450" r="10"/></g>`)}
    </g>
    <path class="cassette-tape" d="M153 282 87 395Q75 432 110 432H890Q925 432 913 395L847 282" fill="none" stroke-width="5"/>
    ${[110,890].map(cx=>svg`<g><circle class="guide-roller" cx=${cx} cy="405" r="27"/><circle class="roller-axle" cx=${cx} cy="405" r="15"/><circle class="guide-center" cx=${cx} cy="405" r="5"/></g>`)}
    ${[[38,38],[962,38],[38,472],[962,472]].map(([x,y])=>svg`<g transform=${`translate(${x} ${y})`}><circle class="shell-screw" r="13"/><path class="screw-slot" d="M-6 0h12M0-6v12" stroke-width="4"/></g>`)}
  </svg>`;
}
