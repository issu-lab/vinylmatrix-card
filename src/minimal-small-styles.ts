import { css } from "lit";

// A stationary sleeve with a small exposed, rotating record behind it.
export const minimalSmallStyles = css`
  .card.minimal_small {
    --surface:#dedbd6; --ink:#292827; --muted:#615e5a; --line:#57534d55;
    display:grid; grid-template-columns:minmax(0,34%) minmax(0,1fr); gap:0 14px;
    align-items:center; padding:16px;
    background:radial-gradient(ellipse at 23% 14%,#eeeae244,transparent 60%),linear-gradient(145deg,#dedbd6,#bcb8b1);
  }
  .card.minimal_small.dark {
    --surface:#343230; --ink:#f3f2ef; --muted:#c1beba; --line:#c6c3bf66;
    --button:#f0efec; --button-ink:#30302f;
    background:radial-gradient(ellipse at 23% 12%,#8d877c55,transparent 63%),linear-gradient(145deg,#494640,#2c2b2a);
  }
  .minimal_small .backdrop { opacity:.16; filter:blur(20px) saturate(.08); }
  .small-art { position:relative; min-width:0; width:100%; aspect-ratio:1.25; }
  .minimal_small .record { width:76%; left:24%; top:2.5%; background:#0c0c0c; box-shadow:0 2px 5px #0005; }
  .minimal_small .record::after { display:none; }
  .minimal_small .rotor {
    background:repeating-radial-gradient(circle,transparent 0 2px,#ffffff0b 2.3px 2.7px),conic-gradient(from -20deg,#090909,#343434 8%,#101010 19%,#080808 34%,#292929 51%,#101010 64%,#080808 80%,#090909);
  }
  .small-label { position:absolute; inset:34%; border-radius:50%; background:#b4ac9c; box-shadow:0 0 0 2px #080808; }
  .minimal_small .spindle { width:4px; height:4px; }
  .sleeve { position:absolute; z-index:4; left:0; top:2.5%; width:76%; aspect-ratio:1; overflow:hidden; border-radius:4px;
    background:linear-gradient(145deg,#8d928b,#343d3a); box-shadow:2px 2px 7px #0006,inset 0 0 0 1px #ffffff18; }
  .sleeve img { display:block; width:100%; height:100%; object-fit:cover; }
  .sleeve .fallback { font-size:clamp(24px,8cqi,60px); }
  .small-footer { min-width:0; }
  .minimal_small .meta { margin:0; }
  .minimal_small .title { font-size:clamp(13px,3.6cqi,20px); line-height:1.3; font-weight:600; letter-spacing:0; }
  .minimal_small .artist { font-size:clamp(11px,2.8cqi,14px); margin:3px 0 0; }
  .minimal_small .player { margin:3px 0 0; font-size:10px; }
  .minimal_small .horizontal { margin:5px 0 0; }
  .minimal_small input[type=range] { height:26px; }
  .minimal_small input[type=range]::-webkit-slider-runnable-track { background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .minimal_small input[type=range]::-moz-range-track { background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .minimal_small .times { font-size:10px; }
  .minimal_small .transport { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:0; margin:5px 0 0; }
  .minimal_small .transport button { justify-self:center; width:100%; max-width:44px; height:44px; padding:6px; }
  .minimal_small .transport .primary { width:36px; max-width:100%; height:36px; }
  .minimal_small .transport button svg { width:19px; height:19px; }
  .minimal_small .volume-popover,.minimal_small .error { grid-column:1 / -1; }
  .minimal_small .volume-popover .horizontal { margin:0; }
  @container(max-width:300px) {
    .card.minimal_small { padding:10px; column-gap:10px; grid-template-columns:minmax(0,31%) minmax(0,1fr); }
    .minimal_small .player { font-size:9px; }
    .minimal_small .transport button { padding:4px; }
  }
`;
