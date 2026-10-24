export async function playlistBrowserChecks() {
  const assert=(value,message)=>{if(!value)throw Error(message)};
  const preview=window.preview,card=preview.cards[0],entities=preview.entities;
  const panel=()=>card.shadowRoot.querySelector('vinylmatrix-playlists');
  const find=s=>panel()?.shadowRoot.querySelector(s);
  const all=s=>[...(panel()?.shadowRoot.querySelectorAll(s) ?? [])];
  const settle=async()=>{await card.updateComplete;await panel()?.updateComplete};
  const until=async(fn)=>{for(let n=0;n<400;n++){await settle();if(fn())return;await new Promise(r=>setTimeout(r,5))}throw Error('Playlist UI did not settle')};
  const registry=entities.map((entity_id,i)=>({entity_id,platform:'music_assistant',config_entry_id:`server-${i+1}`}));
  const item=(name='Evening Jazz',uri='library://playlist/1')=>({media_type:'playlist',name,uri,image:'/dev/cover.svg'});
  const normal=async message=>message.type==='config/entity_registry/list'?registry:{response:{items:preview.library.filter(x=>x.name.toLowerCase().includes((message.service_data.search ?? '').toLowerCase())).slice(message.service_data.offset,message.service_data.offset+25)}};
  preview.setMAHandler(normal);preview.setPlaylistsEnabled(true);await settle();
  assert(!!find('.toggle'),'button appears with MA');
  assert(preview.wsCalls.length===0,'closed card makes no library or registry requests');
  const open=async()=>{find('.toggle').click();await until(()=>all('.playlist').length===25 && !all('.playlist')[0].disabled)};
  await open();assert(preview.calls.length===0,'opening library sends no playback');
  assert(find('#playlist-player').value===entities[0],'active MA player is initial destination');
  find('.more').click();await until(()=>all('.playlist').length===32);assert(!find('.more'),'pagination terminates');
  const input=find('input');input.value='jazz';input.dispatchEvent(new Event('input',{bubbles:true}));find('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));await until(()=>all('.playlist').length===1);
  assert(preview.wsCalls.at(-1).service_data.search==='jazz','server-side playlist search');
  document.querySelector('#switch').click();await settle();assert(find('#playlist-player').value===entities[0],'destination stays pinned on active-player change');
  all('.playlist')[0].click();await until(()=>preview.calls.some(x=>x.domain==='music_assistant'));
  const play=preview.calls.find(x=>x.domain==='music_assistant');assert(play.data.entity_id===entities[0] && play.data.media_id===preview.library[0].uri && play.data.enqueue==='replace','exact playlist and pinned player sent');
  await until(()=>!all('.playlist')[0].disabled);
  document.querySelector('#fail').click();all('.playlist')[0].click();await until(()=>!!find('[role=alert]'));assert(!all('.playlist')[0].disabled,'playback failure unlocks controls');
  find('.retry').click();await until(()=>!find('[role=alert]'));
  // An outstanding search must never overwrite another server's results.
  let finishOld;
  preview.setMAHandler(message=>message.type==='config/entity_registry/list'?Promise.resolve(registry):message.service_data.search==='slow'?new Promise(resolve=>{finishOld=resolve}):Promise.resolve({response:{items:[item('New server')]}}));
  find('input').value='slow';find('input').dispatchEvent(new Event('input',{bubbles:true}));find('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));await until(()=>!!finishOld);
  const selector=find('#playlist-player');selector.value=entities[1];selector.dispatchEvent(new Event('change',{bubbles:true}));await until(()=>all('.name')[0]?.textContent==='New server');
  assert(preview.wsCalls.at(-1).service_data.config_entry_id==='server-2','new target uses its own server');
  finishOld({response:{items:[item('Old response')]}});await new Promise(r=>setTimeout(r,10));await settle();assert(all('.name')[0].textContent==='New server','stale search ignored');
  // Duplicate taps while the command is pending must send exactly once.
  let finishPlay,count=0;const original=card.hass;
  card.hass={...original,callService:()=>{count++;return new Promise(resolve=>{finishPlay=resolve})}};await settle();
  all('.playlist')[0].click();all('.playlist')[0].click();assert(count===1,'double tap protected');finishPlay();await until(()=>!all('.playlist')[0].disabled);card.hass=original;await settle();
  // Loading failure and recovery, empty result, invalid preferred target.
  preview.setMAHandler(async()=>{throw Error('Denied')});find('.toggle').click();find('.toggle').click();await until(()=>!!find('[role=alert]'));assert(!find('.retry').disabled,'connection failure is recoverable');
  preview.setMAHandler(async message=>message.type==='config/entity_registry/list'?registry:{response:{items:[]}});find('.retry').click();await until(()=>!!find('input') && !find('[role=alert]') && find('.status')?.textContent.includes('No playlists'));
  card.setConfig({entities,theme:'minimal_small',playlist_entity:'media_player.not_ma'});await settle();find('.toggle').click();await until(()=>!!find('[role=alert]'));assert(!all('.playlist').length,'invalid explicit destination never redirects');
  // Hidden option and absent integration leave the regular card alone.
  card.setConfig({entities,show_playlists:false});await settle();assert(!panel(),'button can be hidden');
  card.setConfig({entities});preview.setPlaylistsEnabled(false);await settle();assert(!panel(),'no MA integration means no button');
  preview.setPlaylistsEnabled(true);preview.setMAHandler(normal);await settle();
  const grid=document.querySelector('#grid');grid.style.display='block';
  for(const theme of ['minimal','classic','cassette','minimal_small']) for(const color of ['light','dark']) for(const width of [240,340,480,900]) {
    card.parentElement.style.width=width+'px';card.setConfig({entities,theme,color_mode:color});await settle();await open();
    const bounds=card.shadowRoot.querySelector('.card').getBoundingClientRect();
    for(const el of all('.toggle,.panel,select,form,input,.playlist,.more')) {
      const b=el.getBoundingClientRect();assert(b.width>0 && b.left>=bounds.left && b.right<=bounds.right+1,`${theme}/${color}/${width} contained playlist UI`);
    }
    assert(find('ul').getBoundingClientRect().height<=261,'long lists scroll inside bounded area');
    find('.panel').dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await settle();assert(!find('.panel'),'Escape collapses the panel');
  }
  // Late replies after closing and reopening cannot contaminate a new panel.
  let finishClosed;
  preview.setMAHandler(message=>message.type==='config/entity_registry/list'?Promise.resolve(registry):new Promise(resolve=>{finishClosed=resolve}));
  find('.toggle').click();await until(()=>!!finishClosed);find('.toggle').click();await settle();preview.setMAHandler(normal);await open();finishClosed({response:{items:[item('Closed request')]}});await new Promise(r=>setTimeout(r,10));await settle();assert(!all('.name').some(n=>n.textContent==='Closed request'),'closed request ignored');
  const states=structuredClone(preview.states);states[find('#playlist-player').value].state='unavailable';preview.setStates(states);await settle();assert(all('.playlist').every(b=>b.disabled),'unavailable target blocks playback');
  // Editor emits both new options; native selector contract is integration-filtered.
  const editor=document.createElement('vinylmatrix-card-editor');editor.hass=card.hass;editor.setConfig({type:'custom:vinylmatrix-card',entities});document.body.append(editor);await editor.updateComplete;
  let config;editor.addEventListener('config-changed',e=>config=e.detail.config);
  const setting=editor.shadowRoot.querySelector('#show-playlists');setting.value='false';setting.dispatchEvent(new Event('change',{bubbles:true}));await editor.updateComplete;assert(config.show_playlists===false,'editor hides button');
  setting.value='true';setting.dispatchEvent(new Event('change',{bubbles:true}));await editor.updateComplete;
  if(!customElements.get('ha-selector'))customElements.define('ha-selector',class extends HTMLElement{});await editor.updateComplete;await new Promise(r=>setTimeout(r,0));await editor.updateComplete;
  const picker=[...editor.shadowRoot.querySelectorAll('ha-selector')].find(x=>x.selector?.entity?.filter?.integration==='music_assistant');assert(!!picker,'native selector restricts Music Assistant players');
  picker.dispatchEvent(new CustomEvent('value-changed',{detail:{value:entities[1]},bubbles:true}));assert(config.playlist_entity===entities[1],'editor preferred player');editor.remove();
  return 'Playlists: 32 theme/color/width layouts, lazy discovery, search/pagination, pinned target, exact playback, errors/retry, stale replies, double taps, unavailable players and editor passed';
}
export async function checkPlaylists(page) {
  await page.goto(process.env.PREVIEW_URL ?? 'http://127.0.0.1:5177');await page.waitForFunction(()=>!!window.preview);
  console.log(await page.evaluate(playlistBrowserChecks));
}
