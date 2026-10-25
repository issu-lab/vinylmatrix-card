// Optional smoke test using an already installed Firefox and its loopback BiDi endpoint.
// Launch a disposable profile with: firefox --headless --no-remote --profile /tmp/vinylmatrix-firefox-profile --remote-debugging-port 9222
import {prepareThemeFrame} from './screenshots.mjs';
import {writeFile} from 'node:fs/promises';
import {playlistBrowserChecks} from './playlists.mjs';
import {minimalSmallChecks} from './minimal-small.mjs';
const ws=new WebSocket(process.env.FIREFOX_BIDI_URL ?? 'ws://127.0.0.1:9222/session');
await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
let sequence=0;const pending=new Map();
ws.onmessage=e=>{const message=JSON.parse(e.data),entry=pending.get(message.id);if(entry){pending.delete(message.id);clearTimeout(entry.timer);message.type==='error'?entry.reject(Error(message.message)):entry.resolve(message.result)}};
function command(method,params={}){return new Promise((resolve,reject)=>{const id=++sequence,timer=setTimeout(()=>{pending.delete(id);reject(Error('Timed out: '+method))},60000);pending.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params}))})}
let context;
async function evaluate(expression){const result=await command('script.evaluate',{expression,target:{context},awaitPromise:true});if(result.type==='exception')throw Error(result.exceptionDetails.text);return result.result.value}
try {
  await command('session.new',{capabilities:{}});
  const tree=await command('browsingContext.getTree');
  context=tree.contexts[0]?.context;
  if(!context) ({context}=await command('browsingContext.create',{type:'window'}));
  await command('browsingContext.activate',{context});
  const navigate=()=>command('browsingContext.navigate',{context,url:process.env.PREVIEW_URL ?? 'http://127.0.0.1:5177',wait:'complete'});
  await navigate();
  await evaluate('new Promise((resolve,reject)=>{let n=0;const t=setInterval(()=>{if(window.preview){clearInterval(t);resolve(true)}else if(++n>100){clearInterval(t);reject(Error("Preview did not load"))}},50)})');
  console.log('Preview loaded; checking card behavior');
  if(process.env.TEST_SUITE !== 'playlists') console.log(await evaluate(`(${minimalSmallChecks.toString()})()`));
  await navigate();
  console.log(await evaluate(`(${playlistBrowserChecks.toString()})()`));
  if(process.env.CAPTURE_PLAYLISTS==='1') {
    for(const [theme,color] of [['minimal','dark'],['minimal_small','dark'],['classic','light'],['classic','dark'],['cassette','light'],['cassette','dark']]) {
      await navigate();
      await command('browsingContext.setViewport',{context,viewport:{width:520,height:1100},devicePixelRatio:1});
      await evaluate(`(async()=>{document.querySelector('header').hidden=true;document.querySelector('#events').hidden=true;document.body.style.cssText='padding:20px;margin:0;background:${color==='dark'?'#111820':'#f2f2ed'}';document.querySelector('#grid').style.cssText='display:block;width:480px;max-width:none;margin:0';window.preview.cards.forEach((c,i)=>{c.parentElement.hidden=i!==0;c.parentElement.querySelector('h2').hidden=true;c.parentElement.style.width='480px'});const c=window.preview.cards[0];c.setConfig({entities:window.preview.entities,theme:'${theme}',color_mode:'${color}'});window.preview.setPlaylistsEnabled(true);await c.updateComplete;const picker=c.shadowRoot.querySelector('vinylmatrix-playlists');await picker.updateComplete;c.shadowRoot.querySelector('.playlist-toggle').click();await new Promise((resolve,reject)=>{let n=0;const id=setInterval(()=>{if(picker.shadowRoot.querySelectorAll('.playlist').length){clearInterval(id);resolve()}else if(++n>100){clearInterval(id);reject(Error('No playlists'))}},20)});await Promise.all([...picker.shadowRoot.querySelectorAll('img')].map(i=>i.decode().catch(()=>{})));return true})()`);
      const height=await evaluate('Math.ceil(window.preview.cards[0].getBoundingClientRect().height)+40');
      await command('browsingContext.setViewport',{context,viewport:{width:520,height},devicePixelRatio:1});
      const screenshot=await command('browsingContext.captureScreenshot',{context,origin:'viewport'});
      await writeFile(`/tmp/vinylmatrix-playlists-${theme}-${color}.png`,Buffer.from(screenshot.data,'base64'));
      await evaluate("window.preview.cards[0].shadowRoot.querySelector('.playlist-toggle').click();new Promise(r=>setTimeout(r,50))");
      const closedHeight=await evaluate('Math.ceil(window.preview.cards[0].getBoundingClientRect().height)+40');
      await command('browsingContext.setViewport',{context,viewport:{width:520,height:closedHeight},devicePixelRatio:1});
      const closed=await command('browsingContext.captureScreenshot',{context,origin:'viewport'});
      await writeFile(`/tmp/vinylmatrix-playlists-${theme}-${color}-closed.png`,Buffer.from(closed.data,'base64'));
      console.log(`Captured playlist panel: ${theme}/${color}`);
    }
  }
  if(process.env.CAPTURE_GALLERY==='1') {
    await navigate();
    await command('browsingContext.setViewport',{context,viewport:{width:640,height:640},devicePixelRatio:1});
    for(const theme of ['minimal','classic','cassette','minimal_small']) for(const color of ['light','dark']) {
      await evaluate(`(${prepareThemeFrame.toString()})(${JSON.stringify({theme,color})})`);
      const screenshot=await command('browsingContext.captureScreenshot',{context,origin:'viewport'});
      await writeFile(`assets/${theme}-${color}.png`,Buffer.from(screenshot.data,'base64'));
      console.log(`Captured README gallery: ${theme}/${color}, 640 × 640, playlists enabled`);
    }
  }
} finally {await command('session.end').catch(()=>{});ws.close()}
