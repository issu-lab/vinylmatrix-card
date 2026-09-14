import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=path=>readFileSync(new URL('../'+path,import.meta.url));
const readme=read('README.md').toString();
test('README uses banner first, status and shared public structure without duplicate H1',()=>{
  assert.ok(readme.startsWith('![VinylMatrix Card](assets/vinylmatrix-banner.png)'));
  assert.equal(/^# /m.test(readme),false);
  const titles=['Project Status','Why It Exists','Features','How It Works','Interface','Installation','Configuration','Known Limitations','Documentation','License'];
  const positions=titles.map(title=>readme.indexOf('## '+title));
  assert.ok(positions.every((p,i)=>p>=0 && (i===0 || p>positions[i-1])));
  assert.match(readme,/Experimental/);assert.match(readme,/`0\.1\.0` — experimental/);
});
test('footer has exact HACS-safe raw URL, destination and width',()=>{
  assert.match(readme,/<a href="https:\/\/github.com\/issu-lab\/Open-Homelab">\s*<img src="https:\/\/raw.githubusercontent.com\/issu-lab\/vinylmatrix-card\/main\/assets\/issu-open-homelab-badge.png"\s+alt="Explore iSSU Open Homelab"\s+width="480">/);
  assert.equal(/<img\b[^>]*\bsrc=["'](?:\.\/)?assets\//i.test(readme),false);
  assert.ok(readme.trimEnd().endsWith('</div>'));
});
test('footer bytes match canonical ThermoPilot badge',()=>{
  assert.equal(createHash('sha256').update(read('assets/issu-open-homelab-badge.png')).digest('hex'),'fd361e51b10d05b4f26eea83ee1ebd2f6b1805ec804c08dab380589c64d139b2');
});
test('banner and social preview use canonical dimensions and geometry',()=>{
  for(const [file,w,h] of [['vinylmatrix-banner',5120,1280],['vinylmatrix-social-preview',1280,640]]) {
    const png=read('assets/'+file+'.png');assert.equal(png.readUInt32BE(16),w);assert.equal(png.readUInt32BE(20),h);
  }
  const svg=read('source/vinylmatrix-banner.svg').toString();
  assert.match(svg,/x="1650" y="685" font-family="Exo2" font-size="250" font-weight="700"/);
  assert.match(svg,/x="1650" y="835" font-family="Inter" font-size="88" font-weight="600"/);
  for(const x of [4200,4480,4760]) assert.ok(svg.includes(`cx="${x}" cy="590" r="70"`));
  assert.match(svg,/stroke-width="140" opacity="0.18"/);
  assert.match(svg,/M 4740 1280 A 380 380 0 0 1 5120 900/);
  assert.match(svg,/M 4910 1280 A 210 210 0 0 1 5120 1070/);
});

test('installation badge targets the correct custom HACS dashboard repository',()=>{
  const badge='https://my.home-assistant.io/badges/hacs_repository.svg';
  const target='https://my.home-assistant.io/redirect/hacs_repository/?owner=issu-lab&repository=vinylmatrix-card&category=plugin';
  assert.ok(readme.includes(`](${badge})](${target})`));
  assert.ok(readme.includes('/hacsfiles/vinylmatrix-card/vinylmatrix-card.js'));
  assert.ok(readme.includes('not included in the default HACS catalog'));
});
