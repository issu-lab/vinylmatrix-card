import { css } from "lit";

export const classicStyles = css`
  .card.classic {
    --surface:#c9c9c9; --ink:#2b2b2b; --muted:#656565; --line:#39393944;
    padding:0; border:1px solid #95959566; border-radius:3.2cqi;
    background:repeating-linear-gradient(95deg,#ffffff01 0 1px,#00000001 1px 2px),linear-gradient(125deg,#e4e4e4,#c8c8c8 48%,#b6b6b6);
    box-shadow:inset 0 1px 1px #ffffff77,0 1.5cqi 3cqi #00000033;
  }
  .card.classic.dark {
    --surface:#2b2b2b; --ink:#efefef; --muted:#b2b2b2; --line:#c9c9c933;
    border-color:#8d8d8d33;
    background:repeating-linear-gradient(95deg,#ffffff01 0 1px,#00000002 1px 2px),linear-gradient(120deg,#3c3c3c,#2a2a2a 58%,#252525);
  }
  /* Keep the deck sized even when WebKit lays out an empty grid item. */
  .classic .stage { display:block; }
  .classic .deck { width:100%; height:58.6cqi; aspect-ratio:auto; }
  .classic .platter-rim { position:absolute; left:13.5%; top:1.29cqi; width:56.2%; height:auto; aspect-ratio:1; filter:drop-shadow(.2cqi .5cqi .45cqi #000000aa); }
  .classic .record {
    width:51.4%; left:15.9%; top:3.69cqi; background:#0a0a0a; border:0; outline:0;
    box-shadow:inset 0 0 0 .15cqi #070707,inset 0 0 0 .4cqi #242424;
  }
  .classic .record::after {
    inset:.6%; z-index:1;
    background:repeating-radial-gradient(circle,transparent 0 1px,#ffffff05 1.3px,transparent 1.8px),conic-gradient(from -25deg,#080808,#363636 7%,#181818 17%,#080808 30%,#1a1a1a 43%,#323232 53%,#141414 63%,#090909 78%,#171717 92%,#080808);
  }
  .classic .rotor { z-index:2; animation-duration:var(--record-period); }
  .classic .cover { inset:32.5%; box-shadow:0 0 0 .15cqi #99999999,0 0 0 .9cqi #0a0a0a; }
  .classic .spindle { width:2.8%; height:2.8%; background:radial-gradient(circle at 34% 27%,#ffffff,#c9c9c9 20%,#737373 42%,#282828 80%); box-shadow:.12cqi .25cqi .35cqi #000000cc; }
  .classic .arm-moving { transform-origin:814px 120px; transform:rotate(-31deg); transition:transform 1.2s cubic-bezier(.4,0,.2,1); }
  /* The S arm needs a shorter sweep than Minimal to stay outside its label. */
  .classic.playing .arm-moving { transform:rotate(calc(-6deg + 17deg * var(--arm-progress,.35))); transition:transform 1s linear; }
  .classic .classic-arm { height:58.6cqi; filter:drop-shadow(.15cqi .35cqi .3cqi #00000077); }
  .classic .deck-buttons { position:absolute; left:3.8%; bottom:3.4cqi; display:flex; align-items:end; gap:2.1cqi; }
  .classic .start-stop {
    width:max(32px,8cqi); height:max(34px,8.2cqi); padding:0; border-radius:.6cqi; border:.25cqi solid #090909;
    color:#242424; background:repeating-linear-gradient(0deg,#ffffff06 0 1px,#00000006 1px 2px),linear-gradient(115deg,#d9d9d9,#8d8d8d);
    box-shadow:inset 0 0 0 .15cqi #e6e6e6,inset 0 0 .6cqi #00000088,0 .3cqi .3cqi #00000077;
    font-size:clamp(7px,1.1cqi,15px); line-height:1.35; letter-spacing:.04em;
  }
  .classic .start-stop:hover:enabled { filter:brightness(1.1); background-color:#b7b7b7; }
  .classic .speed-buttons { display:flex; gap:.8cqi; }
  .classic .speed-buttons button {
    position:relative; width:max(23px,4.6cqi); height:max(24px,3.7cqi); padding:.7cqi; border-radius:.35cqi; border:1px solid #161616;
    color:#cbcbcb; background:linear-gradient(135deg,#3d3d3d,#232323); box-shadow:inset 0 1px 1px #8b8b8b77,0 .12cqi .25cqi #00000088;
    font-size:clamp(9px,1.2cqi,16px);
  }
  .classic .speed-buttons button[aria-pressed=true] { color:#f0f0f0; }
  .classic .speed-buttons button[aria-pressed=true]::before { content:""; position:absolute; top:.5cqi; left:32%; width:36%; height:.3cqi; min-height:1px; border-radius:2px; background:#f2f2f2; box-shadow:0 0 .45cqi #e9e9e9; }
  .classic .classic-volume { position:absolute; left:90%; top:42%; width:6.5%; height:45%; display:flex; flex-direction:column; align-items:center; gap:1.4cqi; }
  .classic-volume > span { color:var(--muted); font-size:clamp(7px,1.05cqi,15px); letter-spacing:.1em; text-transform:uppercase; }
  .classic-volume .vertical { position:relative; width:100%; min-height:0; }
  .classic-volume .vertical > svg,.classic-volume output { display:none; }
  .classic-volume .vertical::after { content:""; position:absolute; right:7%; top:8%; width:1cqi; height:84%; background:repeating-linear-gradient(to bottom,var(--muted) 0 1px,transparent 1px 2.4cqi); pointer-events:none; }
  .classic-volume input[type=range] { width:100%; min-width:0; max-width:100%; padding:0; }
  .classic-volume input[type=range]::-webkit-slider-runnable-track { width:.7cqi; min-width:3px; border-radius:5px; background:#0a0a0a; box-shadow:1px 0 1px #a1a1a177,inset 1px 0 1px #000000; }
  .classic-volume input[type=range]::-webkit-slider-thumb { width:max(10px,2.3cqi); height:max(14px,3.3cqi); margin-left:calc((.7cqi - max(10px,2.3cqi))/2); border:1px solid #dcdcdc; border-radius:.2cqi; background:repeating-linear-gradient(0deg,#ffffff11 0 1px,#00000011 1px 2px),linear-gradient(110deg,#d3d3d3,#7f7f7f); box-shadow:0 .3cqi .35cqi #000000aa; }
  .classic-volume input[type=range]::-moz-range-track { width:.7cqi; background:#0a0a0a; }
  .classic-volume input[type=range]::-moz-range-thumb { width:max(10px,2.3cqi); height:max(14px,3.3cqi); border:1px solid #dcdcdc; border-radius:.2cqi; background:linear-gradient(110deg,#d3d3d3,#7f7f7f); }
  .classic .classic-footer { display:grid; grid-template-columns:24% minmax(0,1fr) 23%; grid-template-rows:auto auto; column-gap:2.2cqi; align-items:center; min-height:16.4cqi; padding:3cqi 3.8cqi; border-top:1px solid #12121277; box-shadow:inset 0 1px 0 #efefef11; background:linear-gradient(120deg,#ffffff03,#00000013); }
  .classic .meta { grid-column:1; grid-row:1; margin:0; }
  .classic .title { font-size:clamp(15px,2.45cqi,34px); font-weight:450; letter-spacing:0; line-height:1.3; }
  .classic .artist { font-size:clamp(11px,1.8cqi,25px); margin:.45cqi 0 0; }
  .classic .player { grid-column:1; grid-row:2; font-size:clamp(9px,1.4cqi,19px); margin:.9cqi 0 0; }
  .classic-footer > .horizontal { grid-column:2; grid-row:1 / 3; position:relative; margin:0; padding:0 5.4cqi; }
  .classic-footer .times { position:absolute; inset:0; align-items:center; font-size:clamp(9px,1.3cqi,18px); margin:0; pointer-events:none; }
  .classic-footer input[type=range] { height:3cqi; min-height:26px; padding:0; }
  .classic-footer input[type=range]::-webkit-slider-runnable-track { height:.45cqi; min-height:2px; background:linear-gradient(to right,var(--muted) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .classic-footer input[type=range]::-webkit-slider-thumb { width:max(8px,1.25cqi); height:max(8px,1.25cqi); margin-top:min(-3px,-.4cqi); background:var(--muted); }
  .classic-footer input[type=range]::-moz-range-track { height:.45cqi; background:linear-gradient(to right,var(--muted) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .classic .transport { grid-column:3; grid-row:1 / 3; margin:0; display:flex; justify-content:space-between; gap:1.2cqi; }
  .classic .transport button { width:max(28px,5cqi); height:max(28px,5cqi); padding:1.2cqi; }
  .classic .transport button svg { width:max(17px,3cqi); height:max(17px,3cqi); fill:currentColor; }
  .classic .transport .primary { width:max(38px,7.6cqi); height:max(38px,7.6cqi); border:1px solid var(--line); border-radius:50%; color:var(--ink); background:transparent; }
  .classic .transport .primary svg { fill:none; stroke-width:3; width:max(22px,3.8cqi); height:max(22px,3.8cqi); }
  .classic .error { margin:0 3.8cqi 3cqi; }
  @container(max-width:600px) {
    .classic .deck { aspect-ratio:auto; height:calc(58.6cqi + 32px); }
    .classic .classic-footer { grid-template-columns:minmax(0,1fr) auto; grid-template-rows:auto auto auto; gap:0 8px; padding:14px 4%; }
    .classic .transport { grid-column:2; grid-row:1 / 3; }
    .classic-footer > .horizontal { grid-column:1 / 3; grid-row:3; margin-top:8px; padding:0 34px; }
    .classic .classic-volume { width:8%; left:89%; gap:4px; }
  }
  @media(prefers-reduced-motion:reduce) { .classic .arm-moving,.classic.playing .arm-moving { transition:none; } }
`;
