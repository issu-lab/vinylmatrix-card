// Shared DOM checks for Playwright engines and the optional Firefox BiDi smoke runner.
export async function minimalSmallChecks() {
  const assert=(ok,message)=>{if(!ok)throw Error(message)};
  const {cards,entities}=window.preview, card=cards[0];
  const wait=()=>new Promise(resolve=>setTimeout(resolve,70));
  const root=()=>card.shadowRoot, find=s=>root().querySelector(s);
  const settle=async()=>{await card.updateComplete;await wait()};
  const state=async(value)=>{const states=structuredClone(window.preview.states);states[entities[0]].state=value;states[entities[1]].state='idle';window.preview.setStates(states);await settle()};
  const sample=card.parentElement;
  document.querySelector('#grid').style.display='block';
  sample.style.width='480px';
  for(const theme of ['minimal','classic','minimal_small']) {
    card.setConfig({entities,theme,color_mode:'dark'});await settle();
    assert(getComputedStyle(find('.rotor')).animationDuration==='12s',theme+' default speed');
  }
  assert(card.getCardSize()===3,'compact dashboard size');
  for(const color of ['light','dark']) for(const width of [240,280,340,480,900]) {
    sample.style.width=width+'px';card.setConfig({entities,theme:'minimal_small',color_mode:color});await settle();
    const bounds=find('.card').getBoundingClientRect(),sleeve=find('.sleeve').getBoundingClientRect(),record=find('.record').getBoundingClientRect(),footer=find('.small-footer').getBoundingClientRect();
    assert(bounds.height>100 && bounds.height<360,`${width}/${color} compact height`);
    assert(sleeve.left<record.left && sleeve.right<record.right && record.right<footer.left,`${width}/${color} sleeve and exposed record left of controls`);
    assert(Math.abs(sleeve.width-sleeve.height)<1,`${width}/${color} square cover`);
    assert(getComputedStyle(find('.sleeve')).animationName==='none','stationary sleeve');
    for(const selector of ['.small-art','.small-footer','.horizontal','.transport',...Array.from({length:4},(_,i)=>`.transport button:nth-child(${i+1})`)]) {
      const b=find(selector).getBoundingClientRect();assert(b.left>=bounds.left && b.right<=bounds.right+1 && b.top>=bounds.top && b.bottom<=bounds.bottom+1,`${width}/${color} contained ${selector}`);
    }
  }
  sample.style.width='480px';await state('playing');
  // Sample the actual CSS animation at known times, as for the cassette reels.
  // Headless WebKit need not composite two different frames within a short timer.
  const rotor=find('.rotor'),animation=rotor.getAnimations()[0];
  assert(getComputedStyle(rotor).animationPlayState==='running' && animation?.playState==='running','playing record animation runs');
  animation.pause();animation.currentTime=1000;
  const motion=getComputedStyle(rotor).transform;
  animation.currentTime=2000;
  assert(getComputedStyle(rotor).transform!==motion,'record visibly advances');
  animation.play();
  for(const value of ['paused','idle','buffering','off','unavailable']) {
    await state(value);assert(getComputedStyle(find('.rotor')).animationPlayState==='paused',value+' stops rotation');
  }
  await state('playing');find('.primary').click();await settle();
  assert(window.preview.calls.at(-1).service==='media_pause','pause service');
  find('.primary').click();await settle();assert(window.preview.calls.at(-1).service==='media_play','resume service');
  find('button[aria-label="Volume"]').click();await settle();
  assert(!!find('.volume-popover'),'volume opens');
  for(const [kind,value,service,key] of [['seek','180','media_seek','seek_position'],['volume','0.7','volume_set','volume_level']]) {
    const input=find(`input[data-kind="${kind}"]`);input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));await settle();
    const call=window.preview.calls.at(-1);assert(call.service===service && call.data[key]===Number(value),kind+' command');
  }
  const states=structuredClone(window.preview.states);delete states[entities[0]].attributes.entity_picture;window.preview.setStates(states);await settle();
  assert(!!find('.sleeve .fallback') && !find('.sleeve img'),'missing cover fallback');
  states[entities[0]].attributes.media_duration=0;window.preview.setStates(states);await settle();assert(find('input[data-kind="seek"]').disabled,'live stream seek disabled');
  states[entities[0]].state='paused';states[entities[1]].state='playing';window.preview.setStates(states);await settle();
  find('button[aria-label="Next track"]').click();await settle();assert(window.preview.calls.at(-1).data.entity_id===entities[1],'handover controls target new player');
  return 'Minimal Small: 10 size/color layouts, shared speed, actual rotation, five stopped states, controls, fallback, live stream and player handover passed';
}
export async function checkMinimalSmall(page) {
  await page.goto(process.env.PREVIEW_URL ?? 'http://127.0.0.1:5177');
  await page.waitForFunction(()=>!!window.preview);
  await page.emulateMedia({reducedMotion:'no-preference'});
  console.log(await page.evaluate(minimalSmallChecks));
  await page.emulateMedia({reducedMotion:'reduce'});
  const disabled=await page.evaluate(()=>getComputedStyle(window.preview.cards[0].shadowRoot.querySelector('.rotor')).animationName==='none');
  if(!disabled)throw Error('Minimal Small must respect reduced motion');
}
