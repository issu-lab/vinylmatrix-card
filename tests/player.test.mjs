import test from 'node:test';
import assert from 'node:assert/strict';
import { artworkUrl, canSeek, duration, Feature, formatTime, normalizeConfig, playbackAction, position, selectPlayer, supports } from '../src/player.ts';
const ids=['media_player.living_room','media_player.office'];
const player=(state='playing',attributes={})=>({entity_id:ids[0],state,attributes});
test('configuration requires ordered media player ids and preserves explicit list precedence',()=>{
  assert.throws(()=>normalizeConfig({entities:[]}));
  assert.throws(()=>normalizeConfig({entities:['light.office']}));
  assert.throws(()=>normalizeConfig({entities:ids,theme:'invalid'}));
  assert.throws(()=>normalizeConfig({entities:[],entity:ids[0]}));
  assert.deepEqual(normalizeConfig({entities:[...ids,ids[0]]}).entities,ids);
  assert.equal(normalizeConfig({entity:ids[0]}).theme,'vinyl');
});
test('playing player wins over an idle earlier entry',()=>{
  assert.equal(selectPlayer(ids,{[ids[0]]:player('idle'),[ids[1]]:player()},ids[0]),ids[1]);
});
test('simultaneous playback is stable; initial tie uses configured order',()=>{
  const states=Object.fromEntries(ids.map(id=>[id,player()]));
  assert.equal(selectPlayer(ids,states),ids[0]);
  assert.equal(selectPlayer(ids,states,ids[1]),ids[1]);
});
test('pause retains selection only while no other player is playing',()=>{
  const states={[ids[0]]:player('idle'),[ids[1]]:player('paused')};
  assert.equal(selectPlayer(ids,states,ids[1]),ids[1]);
  states[ids[0]]=player();
  assert.equal(selectPlayer(ids,states,ids[1]),ids[0]);
});
test('removed, missing and unavailable players fall back deterministically',()=>{
  assert.equal(selectPlayer(ids,{},ids[1]),ids[0]);
  assert.equal(selectPlayer(ids,{[ids[0]]:player('unavailable'),[ids[1]]:player('idle')},ids[0]),ids[1]);
  assert.equal(selectPlayer([ids[0]],{[ids[0]]:player('idle'),[ids[1]]:player()},ids[1]),ids[0]);
});
test('playback commands respect exact supported features and unavailable/off states',()=>{
  assert.equal(playbackAction(player('playing',{supported_features:Feature.PAUSE})).service,'media_pause');
  assert.equal(playbackAction(player('playing',{supported_features:Feature.STOP})).service,'media_stop');
  assert.equal(playbackAction(player('paused',{supported_features:Feature.PLAY})).service,'media_play');
  assert.equal(playbackAction(player('playing',{supported_features:Feature.PLAY})),undefined);
  for(const state of ['off','unavailable','unknown','standby']) assert.equal(supports(player(state,{supported_features:65535}),Feature.PLAY),false);
  assert.equal(supports(player('playing',{supported_features:'65535'}),Feature.PLAY),false);
});
test('progress extrapolates only while playing, clamps bounds, ignores bad timestamps',()=>{
  const attrs={media_position:25,media_duration:60,media_position_updated_at:'2026-01-01T00:00:00Z'};
  const now=Date.parse('2026-01-01T00:00:10Z');
  assert.equal(position(player('playing',attrs),now),35);
  assert.equal(position(player('paused',attrs),now),25);
  assert.equal(position(player('playing',attrs),now+100000),60);
  assert.equal(position(player('playing',attrs),now-20000),25);
  assert.equal(position(player('playing',{...attrs,media_position_updated_at:'invalid'}),now),25);
  assert.equal(position(player('idle',{media_position:-20})),0);
});
test('live streams and missing or invalid positions cannot seek',()=>{
  for(const attributes of [{},{media_duration:0},{media_duration:Infinity},{media_duration:20,media_position:null},{media_duration:20,media_position:'3'}]) {
    assert.equal(canSeek(player('playing',{supported_features:Feature.SEEK,...attributes})),false);
  }
  assert.equal(canSeek(player('playing',{supported_features:Feature.SEEK,media_duration:60,media_position:0})),true);
  assert.equal(duration(player('playing',{media_duration:'60'})),undefined);
});
test('time formatting includes hour-long media and safe unknown values',()=>{
  assert.equal(formatTime(3723),'1:02:03'); assert.equal(formatTime(0),'0:00'); assert.equal(formatTime(),'—:—');
});
test('artwork accepts HA proxy URLs and http(s), rejects unsafe or ambiguous schemes',()=>{
  assert.equal(artworkUrl('/api/media_player_proxy/example',path=>'https://ha.example'+path),'https://ha.example/api/media_player_proxy/example');
  assert.equal(artworkUrl('https://example.org/art.jpg'),'https://example.org/art.jpg');
  for(const input of ['javascript:alert(1)','data:text/html,test','//outside.example/a','/\\outside.example','file:///etc/passwd',{},'']) assert.equal(artworkUrl(input),undefined);
});
