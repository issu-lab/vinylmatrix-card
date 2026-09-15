import { css } from "lit";

// Reference proportions: disc 72.3% of card width; artwork 46% of disc diameter.
export const minimalStyles = css`
  .card.minimal {
    --surface:#dedbd6; --ink:#292827; --muted:#615e5a; --line:#57534d55;
    padding:0 0 8.7cqi; border:0;
    background:radial-gradient(ellipse at 23% 14%,#eeeae244,transparent 60%),linear-gradient(145deg,#dedbd6,#bcb8b1);
  }
  .card.minimal.dark {
    --surface:#343230; --ink:#f3f2ef; --muted:#c1beba; --line:#c6c3bf66;
    --button:#f0efec; --button-ink:#30302f;
    background:radial-gradient(ellipse at 23% 12%,#8d877c55,transparent 63%),linear-gradient(145deg,#494640,#2c2b2a);
  }
  .minimal .backdrop { opacity:.22; filter:blur(4cqi) saturate(.08); inset:-8%; width:116%; height:116%; }
  .minimal::after { content:""; position:absolute; z-index:-1; inset:0; pointer-events:none; background:linear-gradient(180deg,transparent 48%,var(--surface) 100%); opacity:.55; }
  /* WebKit can collapse an empty aspect-ratio grid item to 0 × 0. */
  .minimal .stage { display:block; }
  .minimal .deck { width:100%; height:83.7cqi; aspect-ratio:auto; }
  .minimal .record {
    left:13.8%; top:8.24%; width:72.3%; background:#080808;
    box-shadow:0 .5cqi 1.1cqi #0007,inset 0 0 0 .65cqi #080808,inset 0 0 0 .9cqi #343434;
  }
  .minimal .record::after {
    inset:1%; z-index:1;
    background:repeating-radial-gradient(circle,transparent 0 1px,#ffffff0b 1.3px,transparent 1.7px),conic-gradient(from -20deg,#0b0b0b,#353535 7%,#121212 15%,#060606 28%,#181818 41%,#333 51%,#111 61%,#070707 76%,#171717 91%,#0b0b0b);
    box-shadow:inset 0 0 .8cqi #000;
  }
  .minimal .rotor { z-index:2; }
  .minimal .cover { inset:27%; box-shadow:0 0 0 .8cqi #080808,0 0 0 .95cqi #8884; }
  .minimal .spindle { width:3%; height:3%; background:radial-gradient(circle at 35% 27%,#fff 0%,#d4d5d2 16%,#929490 35%,#444 68%,#151515 100%); box-shadow:.1cqi .3cqi .35cqi #000a; }
  .minimal .arm-moving { transform-origin:856px 194px; transform:rotate(-15deg); filter:drop-shadow(.2cqi .3cqi .25cqi #0006); }
  .minimal.playing .arm-moving { transform:rotate(0deg); }
  .reference-rest { fill:none; stroke:#8d8d8870; stroke-width:3; opacity:1; transition:opacity .3s; }
  .minimal.playing .reference-rest { opacity:0; }
  .minimal .meta { text-align:center; margin:1.6cqi 8% 0; }
  .minimal .title { font-size:clamp(16px,4.75cqi,48px); line-height:1.25; font-weight:600; letter-spacing:0; }
  .minimal .artist { font-size:clamp(12px,3.65cqi,37px); line-height:1.35; margin:.9cqi 0 0; font-weight:400; }
  .minimal .player { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); white-space:nowrap; }
  .minimal > .horizontal { margin:.8cqi 10% 0; }
  .minimal input[type=range] { height:4cqi; min-height:22px; padding:0; }
  .minimal input[type=range]::-webkit-slider-runnable-track { height:max(2px,.65cqi); background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .minimal input[type=range]::-webkit-slider-thumb { width:max(9px,2.4cqi); height:max(9px,2.4cqi); margin-top:min(-3.5px,-.875cqi); }
  .minimal input[type=range]::-moz-range-track { height:max(2px,.65cqi); background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .minimal input[type=range]::-moz-range-thumb { width:max(9px,2.4cqi); height:max(9px,2.4cqi); }
  .minimal .times { font-size:clamp(10px,2.45cqi,25px); line-height:1.3; margin-top:0; }
  .minimal .transport { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); margin:1.5cqi 10% 0; gap:0; }
  .minimal .transport button { justify-self:center; width:max(32px,7cqi); height:max(32px,7cqi); padding:1.2cqi; }
  .minimal .transport button:nth-child(1) { grid-column:2; }
  .minimal .transport button svg { width:5.5cqi; height:5.5cqi; min-width:17px; min-height:17px; }
  .minimal .transport .primary { width:max(40px,11cqi); height:max(40px,11cqi); }
  .minimal .transport .primary svg { width:6.3cqi; height:6.3cqi; min-width:24px; min-height:24px; stroke-width:3.5; }
  .minimal .transport button:not(.primary) svg { fill:currentColor; }
  .minimal .transport button:last-child svg { fill:none; }
  .minimal .volume-popover { margin:3cqi 10% 0; }
  .minimal .volume-popover .horizontal { margin:0; }
  .minimal .error { margin:3cqi 10% 0; }
  @media(prefers-reduced-motion:reduce) { .minimal .arm-moving,.reference-rest { transition:none; } }
`;
