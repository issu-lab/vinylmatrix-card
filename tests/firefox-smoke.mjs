// Optional smoke test using an already installed Firefox and its loopback BiDi endpoint.
// Launch a disposable profile with: firefox --headless --no-remote --profile /tmp/vinylmatrix-firefox-profile --remote-debugging-port 9222
import {writeFile} from 'node:fs/promises';
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
  console.log('Preview loaded; checking compact layout and playback');
  console.log(await evaluate(`(${minimalSmallChecks.toString()})()`));
  if(process.env.CAPTURE_SMALL==='1') {
    await navigate();await command('browsingContext.setViewport',{context,viewport:{width:640,height:640},devicePixelRatio:1});
    for(const color of ['light','dark']) {
      await evaluate(`(async()=>{document.querySelector('header').hidden=true;document.querySelector('#events').hidden=true;document.body.style.cssText='padding:0;margin:0;background:${color==='dark'?'#111820':'#f2f2ed'}';const frame=document.querySelector('#grid');frame.style.cssText='display:flex;align-items:center;justify-content:center;width:640px;height:640px;max-width:none;margin:0';window.preview.cards.forEach((c,i)=>{c.parentElement.hidden=i!==0;c.parentElement.querySelector('h2').hidden=true;c.parentElement.style.cssText='width:480px;flex:none'});const c=window.preview.cards[0];c.setConfig({entities:window.preview.entities,theme:'minimal_small',color_mode:'${color}'});const s=structuredClone(window.preview.states);s[window.preview.entities[0]].attributes.media_position_updated_at=null;window.preview.setStates(s);await c.updateComplete;await Promise.all([...c.shadowRoot.querySelectorAll('img')].map(i=>i.decode().catch(()=>{})));c.shadowRoot.querySelector('.rotor').style.animationPlayState='paused';return true})()`);
      const screenshot=await command('browsingContext.captureScreenshot',{context,origin:'viewport'});
      await writeFile(`assets/minimal_small-${color}.png`,Buffer.from(screenshot.data,'base64'));
      console.log(`Captured Minimal Small ${color} in a 640 × 640 frame`);
    }
  }
} finally {await command('session.end').catch(()=>{});ws.close()}
