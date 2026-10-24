import { css } from "lit";
export const playlistStyles=css`
  :host { display:block; min-width:0; color:var(--ink); font:inherit; }
  * { box-sizing:border-box; }
  .tools { display:flex; justify-content:flex-end; }
  button,input,select { font:inherit; color:var(--ink); min-width:0; }
  button { cursor:pointer; border:1px solid var(--line); border-radius:8px; padding:8px 12px; background:transparent; min-height:36px; }
  button:hover:enabled { background:color-mix(in srgb,var(--ink),transparent 92%); }
  button:disabled { opacity:.45; cursor:default; }
  button:focus-visible,input:focus-visible,select:focus-visible { outline:2px solid var(--ink); outline-offset:2px; }
  svg { width:18px; height:18px; flex:none; fill:none; stroke:currentColor; stroke-width:1.7; }
  .toggle { display:flex; align-items:center; gap:7px; font-size:12px; border-radius:20px; }
  :host([theme=classic]) .toggle,:host([theme=cassette]) .toggle { border-radius:4px; background:linear-gradient(#ffffff18,#00000015); box-shadow:inset 0 1px #ffffff22,0 2px 2px #0003; letter-spacing:.04em; }
  :host([theme=cassette]) .toggle { text-transform:uppercase; font-size:10px; }
  .panel { margin-top:10px; padding:12px; border:1px solid var(--line); border-radius:10px; background:var(--surface); }
  h3 { margin:0 0 12px; font-size:14px; font-weight:600; }
  label { display:block; font-size:12px; color:var(--muted); margin-bottom:5px; }
  select,input { width:100%; border:1px solid var(--line); background:var(--surface); border-radius:6px; padding:8px; min-height:36px; font-size:13px; }
  form { display:flex; gap:6px; margin-top:10px; }
  form input { flex:1; }
  form button { display:grid; place-items:center; padding:8px; min-width:36px; }
  .hint,.status { font-size:12px; line-height:1.45; color:var(--muted); margin:9px 0; overflow-wrap:anywhere; }
  .error { color:var(--ink); }
  ul { list-style:none; padding:0; margin:10px 0 0; max-height:260px; overflow:auto; overscroll-behavior:contain; scrollbar-width:thin; scrollbar-color:var(--muted) var(--surface); }
  li+li { margin-top:5px; }
  .playlist { display:flex; align-items:center; gap:10px; width:100%; text-align:left; border-radius:6px; padding:7px; }
  .art { display:grid; place-items:center; flex:none; width:34px; height:34px; border-radius:4px; overflow:hidden; background:color-mix(in srgb,var(--ink),transparent 92%); }
  .art img { width:100%; height:100%; object-fit:cover; }
  .name { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:13px; }
  .play { width:14px; height:14px; }
  .more,.retry { margin-top:10px; font-size:12px; }
`;
