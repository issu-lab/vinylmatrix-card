// Shared browser-side setup for repeatable, equally sized README captures.
export async function prepareThemeFrame({theme,color}) {
  const {cards,entities}=window.preview, card=cards[0];
  document.querySelector('header').hidden=true;
  document.querySelector('#events').hidden=true;
  const background=color==='dark'?'#111820':'#f2f2ed';
  document.body.style.cssText=`padding:0;margin:0;background:${background}`;
  const frame=document.querySelector('#theme-frame') ?? document.querySelector('#grid');
  frame.id='theme-frame';
  frame.style.cssText=`display:flex;align-items:center;justify-content:center;width:640px;height:640px;max-width:none;margin:0;overflow:hidden;background:${background}`;
  cards.forEach((c,i)=>{c.parentElement.hidden=i!==0;c.parentElement.querySelector('h2').hidden=true;});
  const width=theme==='minimal'||theme==='minimal_small'?480:900;
  card.parentElement.style.cssText=`flex:none;width:${width}px`;
  card.setConfig({type:'custom:vinylmatrix-card',entities,theme,color_mode:color});
  window.preview.setPlaylistsEnabled(true);
  const states=structuredClone(window.preview.states);
  states[entities[0]].state='playing';states[entities[1]].state='idle';
  Object.assign(states[entities[0]].attributes,{media_position:138,media_position_updated_at:null});
  window.preview.setStates(states);
  await card.updateComplete;
  await card.shadowRoot.querySelector('vinylmatrix-playlists').updateComplete;
  // Freeze only motion for a reproducible capture; retain the playing layout.
  if(!card.shadowRoot.querySelector('#capture-motion')) {
    const style=document.createElement('style');style.id='capture-motion';
    style.textContent='*,*::before,*::after { animation:none!important;transition:none!important; }';
    card.shadowRoot.append(style);
  }
  await Promise.all([...card.shadowRoot.querySelectorAll('img')].map(img=>img.decode().catch(()=>{})));
  const scale=Math.min(1,584/width,584/card.getBoundingClientRect().height);
  card.parentElement.style.transform=`scale(${scale})`;
  const bounds=frame.getBoundingClientRect(), actual=card.getBoundingClientRect();
  if(bounds.width!==640 || bounds.height!==640 || actual.left<bounds.left || actual.top<bounds.top || actual.right>bounds.right || actual.bottom>bounds.bottom) throw Error(`${theme}/${color}: cropped preview`);
  const button=card.shadowRoot.querySelector('.playlist-toggle');
  if(!button || button.getBoundingClientRect().width<=0 || button.getAttribute('aria-expanded')!=='false') throw Error(`${theme}/${color}: missing closed playlist trigger`);
  return true;
}

export async function captureThemeScreenshots(page) {
  await page.setViewportSize({width:640,height:640});
  await page.goto(process.env.PREVIEW_URL ?? 'http://127.0.0.1:5177');
  await page.waitForFunction(()=>!!window.preview);
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const theme of ['minimal','classic','cassette','minimal_small']) for(const color of ['light','dark']) {
    await page.evaluate(prepareThemeFrame,{theme,color});
    await page.locator('#theme-frame').screenshot({path:`assets/${theme}-${color}.png`});
  }
  console.log('README: eight 640 × 640 theme previews with playlist controls, without stretching or cropping.');
}
