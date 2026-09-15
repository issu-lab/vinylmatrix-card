import { svg } from "lit";

export function platterRim() {
  return svg`<svg class="platter-rim" viewBox="0 0 100 100" aria-hidden="true">
    <defs><linearGradient id="vm-rim" x2=".8" y2="1"><stop stop-color="#b3b3b3"/><stop offset=".3" stop-color="#4a4a4a"/><stop offset=".58" stop-color="#a7a7a7"/><stop offset="1" stop-color="#404040"/></linearGradient></defs>
    <circle cx="50" cy="50" r="49.7" fill="#181818" stroke="#090909" stroke-width=".6"/>
    <circle cx="50" cy="50" r="49.2" fill="none" stroke="url(#vm-rim)" stroke-width=".4"/>
    ${[48.5,47.6,46.7].map((r,row)=>svg`<circle cx="50" cy="50" r=${r} fill="none" stroke="url(#vm-rim)" stroke-width=${.42-row*.05} stroke-dasharray=${`.01 ${1.75-row*.035}`} stroke-linecap="round"/>`)}
    <circle cx="50" cy="50" r="45.7" fill="#111111" stroke="url(#vm-rim)" stroke-width=".35"/>
  </svg>`;
}

export function classicArm() {
  return svg`<svg class="tonearm classic-arm" viewBox="0 0 1000 586" aria-hidden="true">
    <defs>
      <linearGradient id="vm-classic-metal"><stop stop-color="#323232"/><stop offset=".22" stop-color="#9a9a9a"/><stop offset=".42" stop-color="#f1f1f1"/><stop offset=".56" stop-color="#c1c1c1"/><stop offset=".85" stop-color="#676767"/><stop offset="1" stop-color="#333333"/></linearGradient>
      <radialGradient id="vm-classic-base"><stop stop-color="#434343"/><stop offset=".7" stop-color="#2a2a2a"/><stop offset="1" stop-color="#181818"/></radialGradient>
      <linearGradient id="vm-classic-head" x2=".4" y2="1"><stop stop-color="#414141"/><stop offset="1" stop-color="#191919"/></linearGradient>
    </defs>
    <g class="arm-base">
      <circle cx="815" cy="129" r="75" fill="url(#vm-classic-base)" stroke="#111111" stroke-width="3"/>
      <circle cx="815" cy="126" r="73" fill="none" stroke="#7b7b7b77" stroke-width="1.2"/>
      <circle cx="815" cy="121" r="42" fill="url(#vm-classic-base)" stroke="#101010" stroke-width="3"/>
      <path d="M787 91a42 42 0 0 1 64 3" fill="none" stroke="#a1a1a166" stroke-width="1"/>
      <path d="M814 162v35m5-14v39h18" fill="none" stroke="#111111" stroke-width="10" stroke-linecap="round"/>
      <path d="M813 164v29m4-9v36h19" fill="none" stroke="#565656" stroke-width="3" stroke-linecap="round"/>
      <circle cx="867" cy="145" r="14" fill="#161616" stroke="#414141" stroke-width="2"/>
      <circle cx="867" cy="145" r="11" fill="#313131"/>
    </g>
    <g class="arm-moving">
      <path d="M860 46 814 120C774 178 779 237 743 298S663 365 625 386" fill="none" stroke="#00000088" stroke-width="18" transform="translate(3 5)"/>
      <path d="M860 46 814 120C774 178 779 237 743 298S663 365 625 386" fill="none" stroke="#404040" stroke-width="14"/>
      <path d="M859 45 813 119C773 177 778 236 742 297S662 364 624 385" fill="none" stroke="#989898" stroke-width="10"/>
      <path d="M857 44 811 118C771 176 776 235 740 296S660 363 622 384" fill="none" stroke="#d7d7d7" stroke-width="5"/>
      <path d="M856 43 810 117C770 175 775 234 739 295S659 362 621 383" fill="none" stroke="#ffffff88" stroke-width="1.7"/>
      <g transform="translate(860 44) rotate(33)">
        <rect x="-18" y="-25" width="36" height="48" rx="8" fill="url(#vm-classic-metal)" stroke="#777777" stroke-width="1"/>
        <ellipse cy="23" rx="18" ry="5" fill="#171717" stroke="#676767"/>
        <path d="M-12 28h24m-24 4h24m-24 4h24" stroke="#0f0f0f" stroke-width="3"/>
      </g>
      <g transform="translate(814 110) rotate(33)"><rect x="-20" y="-17" width="40" height="33" rx="5" fill="url(#vm-classic-metal)" stroke="#6b6b6b"/><ellipse cy="16" rx="19" ry="5" fill="#252525"/><circle cy="16" r="6" fill="#b1b1b1"/></g>
      <g transform="translate(625 386) rotate(58)">
        <rect x="-12" y="-15" width="24" height="24" rx="2" fill="url(#vm-classic-metal)" stroke="#686868"/>
        <path d="M-13-12h26m-26 4h26m-26 4h26" stroke="#d6d6d688"/>
        <path d="M-16 59v17h32V59" fill="#b8b8b8" stroke="#414141"/>
        <rect x="-20" y="5" width="40" height="66" rx="4" fill="url(#vm-classic-head)" stroke="#747474" stroke-width="1"/>
        ${[14,28].map(y=>[ -9,9 ].map(x=>svg`<circle cx=${x} cy=${y} r="4.6" fill="#101010" stroke="#545454" stroke-width=".8"/>`))}
        <path d="M-10 47v8m20-8v8" stroke="#b8b8b8" stroke-width="3" stroke-linecap="round"/>
        <path d="M19 47h31v8H21" fill="#1e1e1e" stroke="#595959"/>
        <path class="stylus" d="M0 76v8" stroke="#b6b6b6" stroke-width="1.5"/>
      </g>
    </g>
  </svg>`;
}
