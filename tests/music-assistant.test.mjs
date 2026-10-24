import test from 'node:test';
import assert from 'node:assert/strict';
import { getPlaylists, initialPlaylistTarget, playlistPage, playlistTargets, playPlaylist, withTimeout } from '../src/music-assistant.ts';
import { normalizeConfig } from '../src/player.ts';
const a='media_player.room',b='media_player.office';
const targets=[{entity:a,entry:'server-a'},{entity:b,entry:'server-b'}];
const hass={states:{[a]:{state:'playing'},[b]:{state:'idle'}}};
test('playlist destinations use integration registry ownership, never friendly names',()=>{
 const registry=[{entity_id:a,platform:'music_assistant',config_entry_id:'server-a'}, {entity_id:b,platform:'other',config_entry_id:'server-b'}, {entity_id:'media_player.disabled',platform:'music_assistant',config_entry_id:'server-a',disabled_by:'user'}];
 assert.deepEqual(playlistTargets(registry,[a,b,a,'media_player.disabled']),[targets[0]]);
 assert.deepEqual(playlistTargets(registry,[],a),[targets[0]]);
 assert.throws(()=>playlistTargets({},[a]));
});
test('initial target prefers explicit choice then active MA player and never redirects invalid explicit choice',()=>{
 assert.equal(initialPlaylistTarget(targets,hass,b),b);
 assert.equal(initialPlaylistTarget(targets,hass,b,a),a);
 assert.equal(initialPlaylistTarget(targets,hass,a,'media_player.missing'),'');
 assert.equal(initialPlaylistTarget(targets,{states:{[a]:{state:'unavailable'},[b]:{state:'idle'}}},a),b);
});
test('library response uses the WebSocket response envelope and top-level image',()=>{
 const item={media_type:'playlist',uri:'library://playlist/1',name:'Evening',image:'/api/cover'};
 assert.deepEqual(playlistPage({response:{items:[item,item,{...item,media_type:'track'},{media_type:'playlist'}]}}),{items:[{uri:item.uri,name:item.name,image:item.image}],more:false});
 assert.equal(playlistPage({response:{items:Array.from({length:25},(_,i)=>({...item,uri:`library://playlist/${i}`}))}}).more,true);
 assert.throws(()=>playlistPage({service_response:{items:[]}}));
 assert.throws(()=>playlistPage({response:{}}));
});
test('library reads are scoped to selected server and paginated; no playback call',async()=>{
 let message;const client={...hass,callWS:async value=>{message=value;return {response:{items:[]}}},callService:()=>assert.fail('Read must not play')};
 await getPlaylists(client,targets[1],' jazz ',25);
 assert.deepEqual(message,{type:'call_service',domain:'music_assistant',service:'get_library',return_response:true,service_data:{config_entry_id:'server-b',media_type:'playlist',limit:25,offset:25,order_by:'name',search:'jazz'}});
});
test('playlist playback targets exact entity and URI with replace queue semantics',async()=>{
 let call;await playPlaylist({...hass,callService:async(...args)=>{call=args}},targets[0],{uri:'library://playlist/53',name:'Evening'});
 assert.deepEqual(call,['music_assistant','play_media',{entity_id:a,media_id:'library://playlist/53',media_type:'playlist',enqueue:'replace'}]);
 await assert.rejects(playPlaylist({...hass,states:{[a]:{state:'unavailable'}},callService:()=>assert.fail('Unavailable must not play')},targets[0],{uri:'x',name:'x'}));
});
test('timeouts and service errors reject without retries',async()=>{
 await assert.rejects(withTimeout(new Promise(()=>{}),5),/timed out/);
 await assert.rejects(getPlaylists({...hass,callWS:async()=>{throw Error('Denied')}},targets[0],''),/Denied/);
 assert.equal(await withTimeout(Promise.resolve('ok'),5),'ok');
});
test('playlist configuration is optional and validates entity and boolean types',()=>{
 assert.equal(normalizeConfig({entity:a}).show_playlists,undefined);
 assert.equal(normalizeConfig({entity:a,show_playlists:false,playlist_entity:b}).playlist_entity,b);
 for(const patch of [{show_playlists:'true'},{playlist_entity:'light.office'},{playlist_entity:''}]) assert.throws(()=>normalizeConfig({entity:a,...patch}));
});
