import { css } from "lit";

export const cassetteStyles = css`
  .card.cassette {
    --surface:#d3d5d3; --ink:#292e30; --muted:#5b6265; --line:#4d565a44;
    --shell-glass:#aeb8be24; --shell-line:#68767f55; --reel:#d5d6d1; --hub:#30363a;
    padding:0; border:1px solid #858e9280; border-radius:3cqi;
    background:linear-gradient(125deg,#e3e6e4ed,#bfc6c7e8);
  }
  .card.cassette.dark {
    --surface:#30363a; --ink:#f0f0ed; --muted:#b6bcbe; --line:#b5bec344;
    --shell-glass:#a7b4bf0c; --shell-line:#a4b0ba38;
    background:linear-gradient(125deg,#3c444aeb,#292f33e8);
  }
  .cassette .stage { display:block; }
  .cassette .deck { width:100%; height:51cqi; aspect-ratio:auto; }
  .cassette-mechanism { display:block; width:100%; height:100%; }
  .shell-glass { fill:var(--shell-glass); stroke:var(--shell-line); stroke-width:2; }
  .shell-lines { stroke:var(--shell-line); }
  .tape-pack { fill:#252727; stroke:#52585a; stroke-width:2; }
  .reel-rim { fill:#303539; stroke:#71797c; stroke-width:2; }
  .reel-face { fill:var(--reel); }
  .reel-window,.reel-hub { fill:var(--hub); }
  .reel-hub-ring { fill:#a2a9ac; stroke:#737d82; stroke-width:2; }
  .reel-tooth { fill:#9da5a8; }
  .reel-axle { fill:#aeb4b4; stroke:#d0d4d1; stroke-width:2; }
  .reel-spin { transform-box:fill-box; transform-origin:center; animation:spin 6s linear infinite; animation-play-state:paused; }
  .cassette.playing .reel-spin { animation-play-state:running; }
  .cassette-heads { transform:translateY(22px); transition:transform 550ms cubic-bezier(.4,0,.2,1); }
  .cassette.playing .cassette-heads { transform:translateY(0); }
  .head-carriage { fill:#626d7350; }
  .head-metal { fill:#bfc5c5; stroke:#7c878b; stroke-width:2; }
  .head-slot { stroke:#606a6f; }
  .pinch-roller,.guide-roller { fill:#333a3e; stroke:#232a2e; stroke-width:3; }
  .roller-axle { fill:#acb3b5; }
  .guide-center { fill:#495257; }
  .cassette-tape { stroke:#5a4d42; }
  .shell-screw { fill:#828d94; stroke:#333c42; stroke-width:3; }
  .screw-slot { stroke:#323a3f; }
  .cassette-footer { display:grid; grid-template-columns:10% minmax(0,1fr) minmax(0,1.65fr); gap:0 2.5cqi; align-items:center; padding:0 3.5cqi 2.5cqi; }
  .cassette .transport { grid-row:1; grid-column:1 / -1; display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:1cqi; margin:0 -3.5cqi 2cqi; padding:1.1cqi 8.5cqi 1.6cqi; border-bottom:1px solid var(--line); }
  .cassette .transport button { width:100%; height:max(32px,6cqi); padding:1cqi; border-radius:.65cqi; border:3px solid #232b30; background:#c7cdce; color:#303638; box-shadow:inset 0 1px 0 #ffffff70,0 1px 0 #0005; }
  .cassette .transport .primary { background:#c7cdce; color:#303638; }
  .cassette.playing .transport .primary { background:#aeb8bc; box-shadow:inset 0 2px 2px #0003; }
  .cassette .transport button:hover:enabled { background:#e1e5e3; filter:none; }
  .cassette .transport button svg { width:clamp(18px,3cqi,32px); height:clamp(18px,3cqi,32px); }
  .cassette .transport button:first-child svg,.cassette .transport button:nth-child(3) svg { fill:currentColor; }
  .cassette .album { grid-column:1; grid-row:2; aspect-ratio:1; overflow:hidden; border:1px solid var(--line); border-radius:.6cqi; background:#64716d; }
  .cassette .album img { display:block; width:100%; height:100%; object-fit:cover; }
  .cassette .album .fallback { font-size:5cqi; }
  .cassette .meta { grid-column:2; grid-row:2; margin:0; }
  .cassette .title { font-size:clamp(12px,2.45cqi,25px); line-height:1.3; }
  .cassette .artist { font-size:clamp(10px,1.7cqi,18px); margin:.5cqi 0 0; }
  .cassette .player { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); }
  .cassette-footer > .horizontal { grid-column:3; grid-row:2; margin:0; }
  .cassette .times { font-size:clamp(9px,1.3cqi,13px); }
  .cassette input[type=range]::-webkit-slider-runnable-track { background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .cassette input[type=range]::-moz-range-track { background:linear-gradient(to right,var(--ink) var(--range-fill,0%),var(--line) var(--range-fill,0%)); }
  .cassette .volume-popover,.cassette .error { margin:0 3.5cqi 2.5cqi; }
  .cassette .volume-popover .horizontal { margin:0; }
  @container(max-width:400px) {
    .cassette-footer { grid-template-columns:12% minmax(0,1fr); }
    .cassette .album { grid-row:2 / 4; align-self:start; }
    .cassette-footer > .horizontal { grid-column:2; grid-row:3; }
    .cassette .title { font-size:12px; }
    .cassette .artist { font-size:10px; }
  }
  @media(prefers-reduced-motion:reduce) {
    .cassette .reel-spin { animation:none; }
    .cassette .cassette-heads { transition:none; }
  }
`;
