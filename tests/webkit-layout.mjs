import { checkCassette } from './cassette.mjs';
import { checkTonearm } from './tonearm.mjs';
import assert from 'node:assert/strict';
const {webkit}=await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser=await webkit.launch({headless:true});
const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,deviceScaleFactor:2});
const errors=[];
page.on('pageerror',e=>errors.push(e.message));
try {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto(process.env.PREVIEW_URL ?? 'http://127.0.0.1:5177');
  const minimal=page.locator('vinylmatrix-card').first();
  await minimal.locator('.card').waitFor();
  for (const width of [240,320,390,480,600,900]) {
    await page.setViewportSize({width:width+40,height:1200});
    await page.evaluate(w=>{document.querySelector('#grid').style.display='block';const card=window.preview.cards[0];card.style.width=`${w}px`;card.parentElement.style.width=`${w}px`;},width);
    for (const color of ['light','dark']) {
      await page.locator('#color').selectOption(color);
      const geometry=await minimal.evaluate(host=>{
        const root=host.shadowRoot;
        return Object.fromEntries(['.card','.deck','.record','.cover','.tonearm','.meta'].map(s=>{const r=root.querySelector(s).getBoundingClientRect();return [s,{width:r.width,height:r.height,top:r.top,bottom:r.bottom}];}));
      });
      assert.ok(geometry['.deck'].height > width*.8,`collapsed deck at ${width}px ${color}`);
      assert.ok(Math.abs(geometry['.deck'].height / width-.837)<.005);
      assert.ok(Math.abs(geometry['.record'].width / width-.723)<.005);
      assert.ok(Math.abs(geometry['.record'].height-geometry['.record'].width)<1);
      assert.ok(Math.abs(geometry['.cover'].width/geometry['.record'].width-.46)<.005);
      assert.ok(geometry['.tonearm'].height>width*.8);
      assert.ok(geometry['.meta'].top>=geometry['.deck'].bottom-1);
    }
  }
  for(const state of ['paused','idle','unavailable','playing']) {
    await page.locator('#state').selectOption(state);
    assert.ok((await minimal.locator('.record').boundingBox()).height>0);
  }
  await page.locator('#cover').click();
  assert.equal(await minimal.locator('.fallback').count(),1);
  assert.ok((await minimal.locator('.record').boundingBox()).height>0);
  await page.emulateMedia({reducedMotion:'no-preference'});
  assert.equal(await minimal.locator('.rotor').evaluate(e=>getComputedStyle(e).animationPlayState),'running');
  await minimal.getByRole('button',{name:'Pause',exact:true}).click();
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).service),'media_pause');
  assert.equal(await minimal.locator('.rotor').evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
  await checkTonearm(page);
  await checkCassette(page);
  assert.deepEqual(errors,[]);
  console.log('WebKit: 12 light/dark layout checks, state/artwork visibility and playback passed.');
} finally {await browser.close()}
