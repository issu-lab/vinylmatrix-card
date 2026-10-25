export async function playlistBrowserChecks() {
  const assert=(value,message)=>{if(!value)throw Error(message)};
  const preview=window.preview,card=preview.cards[0],entities=preview.entities;
  const panel=()=>card.shadowRoot.querySelector('vinylmatrix-playlists');
  const find=s=>s==='.toggle' ? card.shadowRoot.querySelector('.playlist-toggle') : panel()?.shadowRoot.querySelector(s);
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
    card.parentElement.style.width=width+'px';card.setConfig({entities,theme,color_mode:color});await settle();
    const closedHeight=card.getBoundingClientRect().height;
    const transportGeometry=()=>[...card.shadowRoot.querySelectorAll('.transport button:not(.playlist-toggle)')].map(el=>{const r=el.getBoundingClientRect();return [r.x,r.y,r.width,r.height]});
    const controlsBefore=JSON.stringify(transportGeometry());
    const toggle=find('.toggle').getBoundingClientRect(), transport=card.shadowRoot.querySelector(theme==='classic' ? '.deck' : '.transport').getBoundingClientRect();
    assert(toggle.width>=(theme==='minimal_small'?24:theme==='minimal'?32:36) && toggle.height>=(theme==='classic'?28:32) && toggle.left>=transport.left-1 && toggle.right<=transport.right+1 && toggle.top>=transport.top-6 && toggle.bottom<=transport.bottom+6,`${theme}/${color}/${width} playlist button beside seek bar`);
    const compactIcon=theme!=='classic';
    assert((getComputedStyle(find('.toggle').querySelector('span')).display!=='none')===!compactIcon,`${theme}/${width} readable label policy`);
    const seek=card.shadowRoot.querySelector('input[data-kind=seek]').getBoundingClientRect();
    assert(seek.width>=40 && ((theme==='minimal' || theme==='minimal_small') ? seek.bottom<toggle.top : toggle.bottom<seek.top),`${theme}/${width} usable seek bar separate from button`);
    if(theme==='minimal') {
      const previous=card.shadowRoot.querySelector('.transport button').getBoundingClientRect();
      assert(toggle.right<=previous.left && toggle.left<previous.left,'Vinyl uses the free left slot');assert(Math.abs(toggle.width-previous.width)<1 && Math.abs(toggle.height-previous.height)<1,'Vinyl playlist matches adjacent controls');
    }
    if(theme==='classic') {
      assert(find('.toggle').parentElement.classList.contains('deck'),'SL1200 playlist key is in the deck');
      for(const selector of ['.deck-buttons','.classic-volume','.record']) {
        const r=card.shadowRoot.querySelector(selector).getBoundingClientRect();
        assert(toggle.right<=r.left || toggle.left>=r.right || toggle.bottom<=r.top || toggle.top>=r.bottom,`playlist key does not overlap ${selector}`);
      }
      assert(!find('.toggle').querySelector('svg'),'SL1200 uses text without an icon');
      assert(find('.toggle').classList.contains('speed-key'),'SL1200 uses speed-key styling');
      const start=card.shadowRoot.querySelector('.deck-buttons .start-stop').getBoundingClientRect();
      const volume=card.shadowRoot.querySelector('.classic-volume').getBoundingClientRect();
      assert(Math.abs(toggle.bottom-start.bottom)<1 && volume.bottom<toggle.top && Math.abs((toggle.left+toggle.width/2)-(volume.left+volume.width/2))<1,'SL1200 key at bottom of aligned volume column');
      assert(getComputedStyle(find('.toggle')).backgroundImage===getComputedStyle(card.shadowRoot.querySelector('.speed-buttons button')).backgroundImage,'Playlist shares 33/45 finish');
      assert(find('.toggle').scrollWidth<=find('.toggle').clientWidth,'playlist label fits');
    }
    if(theme==='cassette' || theme==='minimal_small') {
      const buttons=[...card.shadowRoot.querySelectorAll('.transport button')];
      assert(JSON.stringify(buttons.map(b=>b.getAttribute('aria-label')))===JSON.stringify(['Playlists','Previous track',card.shadowRoot.querySelector('.primary').getAttribute('aria-label'),'Next track','Volume']),'Tape Deck control order');
      const play=buttons[2].getBoundingClientRect();
      assert(Math.abs(play.left+play.width/2-(transport.left+transport.width/2))<1,'Tape Deck play is centered');
      if(theme==='cassette') assert(buttons.every(b=>Math.abs(b.getBoundingClientRect().width-toggle.width)<1),'Tape Deck keys have equal widths');
      assert(getComputedStyle(buttons[0]).backgroundColor===getComputedStyle(buttons[1]).backgroundColor,'Tape Deck keys share finish');
    }
    assert(panel().getBoundingClientRect().height===0,'closed panel takes no row');
    preview.setPlaylistsEnabled(false);await settle();
    assert(Math.abs(card.getBoundingClientRect().height-closedHeight)<1,`${theme}/${color}/${width} no additional closed-card height`);
    if(theme!=='cassette' && theme!=='minimal_small') assert(JSON.stringify(transportGeometry())===controlsBefore,`${theme}/${color}/${width} transport geometry unchanged`);
    preview.setPlaylistsEnabled(true);await settle();await open();
    assert(find('.toggle').getAttribute('aria-expanded')==='true','toggle reports expanded panel');
    const bounds=card.shadowRoot.querySelector('.card').getBoundingClientRect();
    for(const el of all('.toggle,.panel,select,form,input,.playlist,.more')) {
      const b=el.getBoundingClientRect();assert(b.width>0 && b.left>=bounds.left && b.right<=bounds.right+1,`${theme}/${color}/${width} contained playlist UI`);
    }
    assert(find('ul').getBoundingClientRect().height<=261,'long lists scroll inside bounded area');
    find('.panel').dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await settle();assert(!find('.panel'),'Escape collapses the panel');assert(card.shadowRoot.activeElement===find('.toggle'),'Escape returns focus to seek-row button');assert(find('.toggle').getAttribute('aria-expanded')==='false','toggle reports collapsed panel');
  }
  // Late replies after closing and reopening cannot contaminate a new panel.
  let finishClosed;
  preview.setMAHandler(message=>message.type==='config/entity_registry/list'?Promise.resolve(registry):new Promise(resolve=>{finishClosed=resolve}));
  find('.toggle').click();await until(()=>!!finishClosed);find('.toggle').click();await settle();preview.setMAHandler(normal);await open();finishClosed({response:{items:[item('Closed request')]}});await new Promise(r=>setTimeout(r,10));await settle();assert(!all('.name').some(n=>n.textContent==='Closed request'),'closed request ignored');
  const states=structuredClone(preview.states);states[find('#playlist-player').value].state='unavailable';preview.setStates(states);await settle();assert(all('.playlist').every(b=>b.disabled),'unavailable target blocks playback');
  // Editor emits both new options; native selector contract is integration-filtered.
  const editor=document.createElement('vinylmatrix-card-editor');editor.hass=card.hass;editor.setConfig({type:'custom:vinylmatrix-card',entities});document.body.append(editor);await editor.updateComplete;
  assert(JSON.stringify([...editor.shadowRoot.querySelectorAll('#theme option')].map(o=>[o.value,o.textContent]))===JSON.stringify([['minimal','Vinyl'],['minimal_small','Minimal'],['classic','SL1200'],['cassette','Tape Deck']]),'new display names preserve saved theme identifiers');
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
