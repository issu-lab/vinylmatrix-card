import assert from 'node:assert/strict';

// Shared by Chromium and WebKit: measure the real SVG stylus against the record.
export async function checkTonearm(page) {
  await page.goto(process.env.PREVIEW_URL ?? 'http://127.0.0.1:5177');
  await page.locator('vinylmatrix-card .card').first().waitFor();
  await page.emulateMedia({reducedMotion:'reduce'});
  async function setTrack(attributes={},state='playing') {
    await page.evaluate(async ({attributes,state})=>{
      const states=structuredClone(window.preview.states);
      states[window.preview.entities[0]].state=state;
      states[window.preview.entities[0]].attributes={...states[window.preview.entities[0]].attributes,
        media_duration:100,media_position:0,media_position_updated_at:null,...attributes};
      states[window.preview.entities[1]].state='unavailable';
      window.preview.setStates(states);
      await Promise.all(window.preview.cards.map(c=>c.updateComplete));
    },{attributes,state});
  }
  async function geometry() {
    return page.locator('vinylmatrix-card').evaluateAll(cards=>cards.filter(c=>c.shadowRoot.querySelector('.tonearm')).map(card=>{
      const root=card.shadowRoot,stylus=root.querySelector('.stylus');
      const point=stylus.getPointAtLength(stylus.getTotalLength()).matrixTransform(stylus.getScreenCTM());
      const disc=root.querySelector('.record').getBoundingClientRect();
      const cover=root.querySelector('.cover').getBoundingClientRect();
      const matrix=new DOMMatrix(getComputedStyle(root.querySelector('.arm-moving')).transform);
      return {radius:Math.hypot(point.x-disc.x-disc.width/2,point.y-disc.y-disc.height/2)/(disc.width/2),
        label:cover.width/disc.width,angle:Math.atan2(matrix.b,matrix.a)*180/Math.PI,
        progress:Number(root.querySelector('.card').style.getPropertyValue('--arm-progress'))};
    }));
  }
  for(const width of [240,390,900]) {
    await page.setViewportSize({width:width+80,height:1400});
    await page.evaluate(w=>{
      document.querySelector('#grid').style.display='block';
      window.preview.cards.forEach(c=>{c.style.width=`${w}px`;c.parentElement.style.width=`${w}px`;});
    },width);
    for(const color of ['light','dark']) {
      await page.locator('#color').selectOption(color);
      let previous;
      for(const position of [0,25,50,75,100]) {
        await setTrack({media_position:position});
        const current=await geometry();
        for(const [i,g] of current.entries()) {
          assert.ok(g.radius<.98,`stylus outside record: ${width}/${color}/${position}/${i}`);
          assert.ok(g.radius>g.label+.06,`stylus too close to label: ${width}/${color}/${position}/${i}`);
          if(previous) assert.ok(g.radius<previous[i].radius,'stylus must travel inward');
        }
        previous=current;
      }
    }
  }
  await setTrack({media_position:20});
  const outer=await geometry();
  await page.locator('vinylmatrix-card').first().getByRole('slider',{name:'Playback position'}).fill('80');
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).data.seek_position),80);
  const sought=await geometry();
  assert.ok(sought.every((g,i)=>g.angle>outer[i].angle),'confirmed seek moves both arms');
  await setTrack({media_content_id:'new-track',media_position:0});
  assert.ok((await geometry()).every((g,i)=>g.angle<outer[i].angle),'new track returns to outer grooves');
  for(const state of ['paused','idle','buffering','off','unavailable']) {
    await setTrack({media_position:80},state);
    const parked=await geometry();
    assert.ok(parked.every(g=>g.angle< -10),`arm must park during ${state}`);
  }
  for(const missing of ['media_duration','media_position']) {
    await setTrack({[missing]:null});
    const first=await geometry();
    await setTrack({[missing]:null,...(missing==='media_duration'?{media_position:5000}:{media_duration:5000})});
    const last=await geometry();
    assert.ok(last.every((g,i)=>g.angle===first[i].angle && g.radius<.98 && g.radius>g.label+.06),'unknown progress stays on the record');
  }
  await setTrack({media_position:80});
  await page.evaluate(async ()=>{
    const states=structuredClone(window.preview.states);
    states[window.preview.entities[0]].state='paused';
    states[window.preview.entities[1]]={...states[window.preview.entities[1]],state:'playing',attributes:{...states[window.preview.entities[1]].attributes,media_duration:100,media_position:10,media_position_updated_at:null}};
    window.preview.setStates(states);
    await Promise.all(window.preview.cards.map(c=>c.updateComplete));
  });
  assert.ok((await geometry()).every(g=>Math.abs(g.progress-.1)<.001),'handover follows the new player progress');
  await setTrack({media_position:0,media_duration:10,media_position_updated_at:new Date().toISOString()});
  const beforeTick=await geometry();
  await page.waitForTimeout(1300);
  assert.ok((await geometry()).every((g,i)=>g.angle>beforeTick[i].angle),'clock advances arm without a player update');
  // Keep both arms on screen and sample their actual CSS transitions at a
  // controlled time; wall-clock sleeps can miss the intermediate frame in CI.
  await page.setViewportSize({width:1000,height:1000});
  await page.evaluate(()=>{
    document.querySelector('header').hidden=true;
    document.querySelector('#grid').style.cssText='display:flex;max-width:900px;gap:20px';
    window.preview.cards.forEach(c=>{c.style.width='400px';c.parentElement.style.width='400px';});
    window.scrollTo(0,0);
  });
  await setTrack({media_position:25});
  await page.emulateMedia({reducedMotion:'no-preference'});
  const start=await geometry();
  await setTrack({media_position:75});
  async function sampleTransition(time) {
    await page.locator('.arm-moving').evaluateAll((arms,time)=>{
      for(const arm of arms) {
        const transition=arm.getAnimations().find(a=>a.transitionProperty==='transform');
        if(!transition) throw new Error('Expected a transform transition on each tonearm');
        transition.pause();
        transition.currentTime=time;
      }
    },time);
    return geometry();
  }
  const middle=await sampleTransition(250);
  const end=await sampleTransition(1000);
  assert.ok(middle.every((g,i)=>g.angle>start[i].angle && g.angle<end[i].angle),
    `seek must animate through intermediate positions: ${JSON.stringify({start,middle,end})}`);
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.deepEqual(await page.locator('.arm-moving').evaluateAll(arms=>arms.map(a=>getComputedStyle(a).transitionDuration)),['0s','0s']);
  console.log('Tonearm: both themes, 60 groove/label bounds, seek, clock, parking, fallback, handover and smooth/reduced motion passed.');
}
