import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';

// Equal square frames preserve each real card's proportions without cropping.
export async function captureThemeScreenshots(page) {
  await page.setViewportSize({width:800,height:900});
  await page.goto(process.env.PREVIEW_URL ?? 'http://127.0.0.1:5177');
  await page.waitForFunction(()=>!!window.preview);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.evaluate(()=>{
    document.querySelector('header').hidden=true;
    document.querySelector('#events').hidden=true;
    const frame=document.querySelector('#grid');frame.id='theme-frame';
    frame.style.cssText='display:flex;align-items:center;justify-content:center;width:640px;height:640px;max-width:none;margin:0;overflow:hidden';
    window.preview.cards.forEach((c,i)=>{
      c.parentElement.hidden=i!==0;
      c.parentElement.style.cssText='flex:none;width:584px';
      c.parentElement.querySelector('h2').hidden=true;
    });
    const states=structuredClone(window.preview.states);
    states[window.preview.entities[0]].state='playing';
    Object.assign(states[window.preview.entities[0]].attributes,{media_position:138,media_position_updated_at:null});
    states[window.preview.entities[1]].state='idle';window.preview.setStates(states);
  });
  await mkdir('assets',{recursive:true});
  for(const theme of ['minimal','classic','cassette']) {
    for(const color of ['light','dark']) {
      await page.evaluate(async ({theme,color})=>{
        const card=window.preview.cards[0];
        card.parentElement.style.transform='none';
        const width=theme==='minimal'?480:900;
        card.parentElement.style.width=`${width}px`;
        card.setConfig({type:'custom:vinylmatrix-card',entities:window.preview.entities,theme,color_mode:color});
        await card.updateComplete;
        await Promise.all([...card.shadowRoot.querySelectorAll('img')].map(img=>img.decode().catch(()=>{})));
        const scale=Math.min(1,584/width,584/card.getBoundingClientRect().height);
        card.parentElement.style.transform=`scale(${scale})`;
        document.querySelector('#theme-frame').style.background=color==='dark'?'#111820':'#f2f2ed';
      },{theme,color});
      const frame=page.locator('#theme-frame');
      const bounds=await frame.boundingBox();
      assert.equal(bounds.width,640);assert.equal(bounds.height,640);
      const cardBounds=await page.locator('vinylmatrix-card').first().boundingBox();
      assert.ok(cardBounds.x>=bounds.x && cardBounds.y>=bounds.y &&
        cardBounds.x+cardBounds.width<=bounds.x+640 && cardBounds.y+cardBounds.height<=bounds.y+640,
        `${theme}/${color} must fit inside the frame`);
      await frame.screenshot({path:`assets/${theme}-${color}.png`});
    }
  }
  console.log('README: six 640 × 640 theme previews captured without stretching or cropping.');
}
