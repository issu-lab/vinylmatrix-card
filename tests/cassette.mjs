import assert from 'node:assert/strict';

export async function checkCassette(page,{screenshots=false}={}) {
  await page.goto(process.env.PREVIEW_URL ?? 'http://127.0.0.1:5177');
  const card=page.locator('vinylmatrix-card').nth(2);
  await card.locator('.cassette').waitFor();
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.evaluate(()=>{
    document.querySelector('#grid').style.display='block';
    window.preview.cards.forEach((c,i)=>c.parentElement.hidden=i!==2);
  });
  async function update(state='playing',attrs={}) {
    await page.evaluate(async ({state,attrs})=>{
      const s=structuredClone(window.preview.states);
      s[window.preview.entities[0]].state=state;
      Object.assign(s[window.preview.entities[0]].attributes,attrs);
      s[window.preview.entities[1]].state='unavailable';
      window.preview.setStates(s);await window.preview.cards[2].updateComplete;
    },{state,attrs});
  }
  async function lift(){return card.locator('.cassette-heads').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).f);}
  for(const width of [240,340,390,480,900]) {
    await page.setViewportSize({width:width+80,height:1200});
    await card.evaluate((c,w)=>{c.style.width=`${w}px`;c.parentElement.style.width=`${w}px`;},width);
    for(const color of ['light','dark']) {
      await page.locator('#color').selectOption(color);
      const g=await card.evaluate(c=>{
        const root=c.shadowRoot,b=root.querySelector('.card').getBoundingClientRect();
        const deck=root.querySelector('.deck').getBoundingClientRect();
        const head=root.querySelector('.read-head').getBoundingClientRect();
        return {width:b.width,deck:deck.height,head:head.top-deck.top,
          overflow:[...root.querySelectorAll('button,input,.meta,.album,.stage')].some(e=>{const r=e.getBoundingClientRect();return r.left<b.left-1||r.right>b.right+1;})};
      });
      assert.ok(Math.abs(g.deck/width-.51)<.005,'cassette deck keeps its height in WebKit');
      assert.ok(Math.abs(g.head/g.deck-432/510)<.005,'raised head reaches the tape');
      assert.equal(g.overflow,false,`Cassette overflow ${width}/${color}`);
      assert.equal(await card.locator('.transport button').count(),4);
      assert.equal(await card.locator('.reel-spin').count(),2);
      assert.equal(await card.locator('.record,.tonearm').count(),0);
    }
  }
  for(const state of ['paused','idle','buffering','off','unavailable']) {
    await update(state);assert.ok(await lift()>20,`heads lower during ${state}`);
  }
  await update('playing');assert.equal(await lift(),0);
  await card.getByRole('slider',{name:'Playback position'}).fill('180');
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).data.seek_position),180);
  await card.getByRole('button',{name:'Volume',exact:true}).click();
  await card.getByRole('slider',{name:'Volume',exact:true}).fill('0.6');
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).data.volume_level),.6);
  await card.getByRole('button',{name:'Mute',exact:true}).click();
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).service),'volume_mute');
  await card.getByRole('button',{name:'Volume',exact:true}).click();
  await update('playing',{media_duration:null});
  assert.ok(await card.getByRole('slider',{name:'Playback position'}).isDisabled());
  await update('playing',{supported_features:4096});
  await card.getByRole('button',{name:'Stop',exact:true}).click();
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).service),'media_stop');
  assert.ok(await lift()>20);
  await update('playing',{supported_features:16447,media_duration:342});
  await page.locator('#switch').click();
  await card.getByRole('button',{name:'Next track',exact:true}).click();
  assert.equal(await page.evaluate(()=>window.preview.calls.at(-1).data.entity_id),'media_player.office');
  await update('playing',{entity_picture:''});
  assert.equal(await card.locator('.album .fallback').count(),1);
  await update('playing',{entity_picture:'/dev/cover.svg'});
  await card.locator('.album img').waitFor();
  await page.locator('#fail').click();
  await card.getByRole('button',{name:'Previous track',exact:true}).click();
  await card.getByRole('alert').waitFor();
  await card.getByRole('button',{name:'Next track',exact:true}).click();
  await page.emulateMedia({reducedMotion:'no-preference'});
  assert.deepEqual(await card.locator('.reel-spin').evaluateAll(es=>es.map(e=>getComputedStyle(e).animationPlayState)),['running','running']);
  // Sample real CSS reel animation frames without depending on CI frame timing.
  const rotation=await card.locator('.reel-spin').evaluateAll(es=>es.map(e=>{
    const a=e.getAnimations()[0];a.pause();a.currentTime=1000;
    const first=getComputedStyle(e).transform;a.currentTime=2000;
    const second=getComputedStyle(e).transform;a.play();return first!==second;
  }));assert.deepEqual(rotation,[true,true]);
  await card.getByRole('button',{name:'Pause',exact:true}).click();
  assert.deepEqual(await card.locator('.reel-spin').evaluateAll(es=>es.map(e=>getComputedStyle(e).animationPlayState)),['paused','paused']);
  // Sample the head-lowering transition midway, then at its rest position.
  const travel=await card.locator('.cassette-heads').evaluate(e=>{
    const a=e.getAnimations().find(a=>a.transitionProperty==='transform');
    if(!a)throw Error('Missing head lift transition');a.pause();a.currentTime=275;
    const mid=new DOMMatrix(getComputedStyle(e).transform).f;a.currentTime=550;
    const end=new DOMMatrix(getComputedStyle(e).transform).f;return {mid,end};
  });assert.ok(travel.mid>0&&travel.mid<travel.end&&travel.end>20);
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.deepEqual(await card.locator('.reel-spin').evaluateAll(es=>es.map(e=>getComputedStyle(e).animationName)),['none','none']);
  assert.equal(await card.locator('.cassette-heads').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
  await update('playing',{media_title:'Night Session',media_artist:'Studio Ensemble',media_position:138,media_position_updated_at:null});
  if(screenshots) {
    for(const color of ['dark','light']) {
      await page.locator('#color').selectOption(color);
      await card.screenshot({path:`assets/cassette-${color}.png`});
    }
  }
  console.log('Cassette: 10 size/color layouts, reels, head lift/parking, controls, handover, fallback, error and reduced motion passed.');
}
