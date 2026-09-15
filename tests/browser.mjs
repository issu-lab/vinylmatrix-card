import { checkTonearm } from './tonearm.mjs';
// Run against `pnpm dev` after building. Playwright can be installed separately.
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1510,height:950}});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
let count=0;
const pass=name=>{count++;console.log(`PASS ${name}`)};
const card=page.locator('vinylmatrix-card').first();
async function reset(){await page.goto(process.env.PREVIEW_URL ?? 'http://127.0.0.1:5177');await card.locator('.card').waitFor();}
async function states(fn){await page.evaluate(fn);await page.evaluate(()=>Promise.all(window.preview.cards.map(c=>c.updateComplete)));}
try {
  await reset();
  assert.equal(await page.locator('vinylmatrix-card .card').count(),2);
  assert.equal(await card.locator('.rotor').evaluate(e=>getComputedStyle(e).animationPlayState),'running');
  assert.equal(await card.locator('.tonearm').evaluate(e=>getComputedStyle(e).zIndex),'1');
  assert.equal(await card.locator('.record').evaluate(e=>getComputedStyle(e).zIndex),'0');
  pass('two themes render; playing record animates');
  await card.getByRole('button',{name:'Pause',exact:true}).click();
  assert.equal(await card.locator('.rotor').evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).service),'media_pause');
  await page.waitForTimeout(950);
  const rest=await card.locator('.arm-moving').evaluate(e=>getComputedStyle(e).transform);
  await card.getByRole('button',{name:'Play',exact:true}).click();await page.waitForTimeout(950);
  assert.notEqual(await card.locator('.arm-moving').evaluate(e=>getComputedStyle(e).transform),rest);
  pass('pause and play target selected entity; arm returns to rest');
  await page.locator('#switch').click();
  assert.equal(await card.locator('.card').getAttribute('data-player'),'media_player.office');
  await states(()=>{const s=structuredClone(window.preview.states);s['media_player.living_room'].state='playing';window.preview.setStates(s)});
  assert.equal(await card.locator('.card').getAttribute('data-player'),'media_player.office');
  await card.getByRole('button',{name:'Next track'}).click();
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).data.entity_id),'media_player.office');
  pass('automatic handover and stable simultaneous playback; command follows selection');
  await reset();
  await card.getByRole('slider',{name:'Playback position'}).fill('180');
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).data.seek_position),180);
  await card.getByRole('button',{name:'Volume',exact:true}).click();
  await card.getByRole('slider',{name:'Volume',exact:true}).fill('0.7');
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).data.volume_level),.7);
  pass('seek seconds and normalized volume commands');
  // A drag begun on one player must never seek another after auto-selection changes.
  await reset();
  await card.getByRole('slider',{name:'Playback position'}).dispatchEvent('pointerdown');
  await page.locator('#switch').click();
  await card.getByRole('slider',{name:'Playback position'}).evaluate(e=>{e.value='200';e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))});
  assert.equal(await page.evaluate(()=>window.preview.calls.length),0);
  pass('player switch cancels an in-flight seek gesture');
  await reset();
  await card.getByRole('slider',{name:'Playback position'}).dispatchEvent('pointerdown');
  await states(()=>{const s=structuredClone(window.preview.states);s['media_player.living_room'].attributes.media_content_id='new-track';window.preview.setStates(s)});
  await card.getByRole('slider',{name:'Playback position'}).evaluate(e=>{e.value='200';e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))});
  assert.equal(await page.evaluate(()=>window.preview.calls.length),0);
  pass('track change cancels an in-flight seek gesture');
  await reset();await page.locator('#stream').click();
  assert.equal(await card.getByRole('slider',{name:'Playback position'}).isDisabled(),true);
  await page.locator('#state').selectOption('unavailable');
  await states(()=>{const s=structuredClone(window.preview.states);s['media_player.office'].state='unavailable';window.preview.setStates(s)});
  assert.equal(await card.getByRole('button',{name:'Play',exact:true}).isDisabled(),true);
  assert.match(await card.locator('.title').textContent(),/unavailable/);
  pass('live stream and unavailable player are safe');
  await reset();await page.locator('#cover').click();
  assert.equal(await card.locator('.fallback').count(),1);
  await states(()=>{const s=structuredClone(window.preview.states);s['media_player.living_room'].attributes.entity_picture='/dev/missing.jpg';window.preview.setStates(s)});
  await card.locator('.fallback').waitFor();
  assert.equal(await card.locator('.cover img').count(),0);
  await states(()=>{const s=structuredClone(window.preview.states);s['media_player.living_room'].attributes.entity_picture='/dev/cover.svg';window.preview.setStates(s)});
  await card.locator('.cover img').waitFor();
  pass('missing/broken artwork fallback and recovery');
  await page.locator('#fail').click();await card.getByRole('button',{name:'Next track'}).click();
  await card.getByRole('alert').waitFor();
  assert.equal(await card.getByRole('button',{name:'Next track'}).isDisabled(),false);
  pass('service failure is visible and controls recover');
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await card.locator('.rotor').evaluate(e=>getComputedStyle(e).animationName),'none');
  assert.equal(await card.locator('.arm-moving').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  pass('reduced motion disables spinning and arm transition');
  await reset();
  await page.evaluate(()=>{const editor=document.createElement('vinylmatrix-card-editor');editor.hass=window.preview.cards[0].hass;editor.setConfig({type:'custom:vinylmatrix-card',entities:window.preview.entities,theme:'minimal'});editor.addEventListener('config-changed',e=>window.editorConfig=e.detail.config);document.body.append(editor)});
  const editor=page.locator('vinylmatrix-card-editor');
  await editor.locator('#theme').selectOption('classic');
  assert.equal(await page.evaluate(()=>window.editorConfig.theme),'classic');
  await editor.getByRole('button',{name:'Remove player 2'}).click();
  assert.equal(await page.evaluate(()=>window.editorConfig.entities.length),1);
  pass('visual editor emits theme and ordered-player changes');
  assert.deepEqual(await editor.locator('#theme option').evaluateAll(options=>options.map(o=>o.value)),['minimal','classic']);
  await page.evaluate(()=>{const editor=document.querySelector('vinylmatrix-card-editor');const hass=structuredClone(window.preview.states);hass['media_player.office'].attributes.friendly_name='Kitchen speaker';hass['light.kitchen']={entity_id:'light.kitchen',state:'on',attributes:{friendly_name:'Kitchen light'}};editor.hass={...window.preview.cards[0].hass,states:hass};});
  const search=editor.getByRole('searchbox',{name:'Search media players 1'});
  await search.fill('KITCHEN');
  assert.deepEqual(await editor.locator('.picker select option:not([disabled])').evaluateAll(options=>options.map(o=>o.value)),['media_player.office']);
  await editor.locator('.picker select').selectOption('media_player.office');
  assert.deepEqual(await page.evaluate(()=>window.editorConfig.entities),['media_player.office']);
  await search.fill('living_room');
  assert.deepEqual(await editor.locator('.picker select option:not([disabled])').evaluateAll(options=>options.map(o=>o.value)),['media_player.living_room']);
  await search.fill('no match');
  assert.equal(await editor.locator('.picker select option:not([disabled])').count(),0);
  // Verify the contract passed to Home Assistant's native selector separately from the fallback.
  await page.evaluate(()=>customElements.define('ha-selector',class extends HTMLElement{}));
  await editor.locator('ha-selector').waitFor({state:'attached'});
  assert.equal(await editor.locator('ha-selector').evaluate(e=>e.selector.entity.filter.domain),'media_player');
  await editor.locator('ha-selector').evaluate(e=>e.dispatchEvent(new CustomEvent('value-changed',{detail:{value:'light.kitchen'},bubbles:true,composed:true})));
  assert.deepEqual(await page.evaluate(()=>window.editorConfig.entities),['media_player.office']);
  await editor.locator('ha-selector').evaluate(e=>e.dispatchEvent(new CustomEvent('value-changed',{detail:{value:'media_player.living_room'},bubbles:true,composed:true})));
  assert.deepEqual(await page.evaluate(()=>window.editorConfig.entities),['media_player.living_room']);
  pass('player search filters friendly name and entity ID; native selector excludes other domains');

  await reset();
  const minimal=page.locator('vinylmatrix-card').first();
  assert.equal(await minimal.locator('.side').count(),0);
  const geometry=await minimal.evaluate(host=>{const root=host.shadowRoot;const card=root.querySelector('.card').getBoundingClientRect();const disc=root.querySelector('.record').getBoundingClientRect();const cover=root.querySelector('.cover').getBoundingClientRect();return {disc:disc.width/card.width,cover:cover.width/disc.width};});
  // Freeze rotation before measuring the circular cover's rectangular bounds.
  await page.emulateMedia({reducedMotion:'reduce'});
  const ratio=await minimal.evaluate(host=>{const root=host.shadowRoot;return root.querySelector('.cover').getBoundingClientRect().width/root.querySelector('.record').getBoundingClientRect().width;});
  assert.ok(Math.abs(geometry.disc-.723)<.01);
  assert.ok(Math.abs(ratio-.46)<.01);
  assert.equal(await minimal.getByRole('slider',{name:'Playback position'}).getAttribute('aria-orientation'),'horizontal');
  await minimal.getByRole('button',{name:'Volume',exact:true}).click();
  await minimal.getByRole('slider',{name:'Volume',exact:true}).fill('0.35');
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).data.volume_level),.35);
  const playingArm=await minimal.locator('.arm-moving').evaluate(e=>getComputedStyle(e).transform);
  await minimal.getByRole('button',{name:'Pause',exact:true}).click();
  assert.notEqual(await minimal.locator('.arm-moving').evaluate(e=>getComputedStyle(e).transform),playingArm);
  pass('Minimal matches reference proportions; horizontal seek, volume and arm parking work');
  await reset();
  const classic=page.locator('vinylmatrix-card').nth(1);
  assert.equal(await classic.getByRole('slider',{name:'Volume',exact:true}).getAttribute('aria-orientation'),'vertical');
  assert.equal(await classic.getByRole('slider',{name:'Playback position'}).getAttribute('aria-orientation'),'horizontal');
  await classic.getByRole('button',{name:'Record animation speed: 45',exact:true}).click();
  assert.equal(await classic.getByRole('button',{name:'Record animation speed: 45',exact:true}).getAttribute('aria-pressed'),'true');
  assert.equal(await page.evaluate(()=>window.preview.calls.length),0,'speed selection must not change audio playback');
  await page.emulateMedia({reducedMotion:'no-preference'});
  assert.ok(Math.abs(parseFloat(await classic.locator('.rotor').evaluate(e=>getComputedStyle(e).animationDuration))-60/45)<.001);
  await page.emulateMedia({reducedMotion:'reduce'});
  const classicPlaying=await classic.locator('.arm-moving').evaluate(e=>getComputedStyle(e).transform);
  await classic.getByRole('button',{name:'Start / Stop · Pause',exact:true}).click();
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).service),'media_pause');
  assert.notEqual(await classic.locator('.arm-moving').evaluate(e=>getComputedStyle(e).transform),classicPlaying);
  await classic.getByRole('button',{name:'Play',exact:true}).click();
  await classic.getByRole('slider',{name:'Volume',exact:true}).fill('0.65');
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).data.volume_level),.65);
  await classic.getByRole('slider',{name:'Playback position'}).fill('220');
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).data.seek_position),220);
  pass('Classic hardware controls, arm parking, seek and visual-only 33/45 selection');


  await reset();await page.emulateMedia({reducedMotion:'reduce'});
  await mkdir('assets',{recursive:true});
  await page.locator('#grid').screenshot({path:'assets/themes-dark.png'});
  await page.locator('#color').selectOption('light');
  await page.locator('#grid').screenshot({path:'assets/themes-light.png'});
  for (const width of [240,280,340,480,900]) {
    await page.evaluate(w=>{document.querySelector('#grid').style.display='block';window.preview.cards.forEach(c=>{c.style.width=`${w}px`;c.parentElement.style.width=`${w}px`})},width);
    for(const c of await page.locator('vinylmatrix-card').all()) {
      // Blurred artwork intentionally extends beyond the clipped card. Check UI bounds.
      assert.deepEqual(await c.locator('.card').evaluate(e=>{const bounds=e.getBoundingClientRect();return [...e.querySelectorAll('button,input,.title,.artist,.player,.stage')].flatMap(child=>{const r=child.getBoundingClientRect();return r.left>=bounds.left-1 && r.right<=bounds.right+1 ? [] : [{theme:e.className,element:child.className || child.getAttribute('aria-label'),left:r.left-bounds.left,right:r.right-bounds.right}]})}),[],`control overflow at ${width}`);
    }
  }
  await page.setViewportSize({width:390,height:900});
  await page.evaluate(()=>{window.preview.cards.forEach(c=>{c.style.width='340px';c.parentElement.style.width='340px'})});

  await page.locator('#color').selectOption('dark');
  await page.setViewportSize({width:600,height:850});
  await page.evaluate(()=>{window.preview.cards[0].style.width='480px';window.preview.cards[0].parentElement.style.width='480px'});
  await minimal.screenshot({path:'assets/minimal-dark.png'});
  await page.locator('#color').selectOption('light');
  await minimal.screenshot({path:'assets/minimal-light.png'});
  await page.setViewportSize({width:1000,height:900});
  await page.evaluate(()=>{window.preview.cards[1].style.width='900px';window.preview.cards[1].parentElement.style.width='900px'});
  await classic.screenshot({path:'assets/classic-light.png'});
  await page.locator('#color').selectOption('dark');
  await classic.screenshot({path:'assets/classic-dark.png'});
  pass('light/dark themes and widths 240/280/340/480/900 have no overflow');
  await checkTonearm(page);
  assert.deepEqual(errors,[]);
  console.log(`${count} browser scenarios passed; no page errors.`);
} finally {await browser.close()}
