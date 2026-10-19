import test from 'node:test';
import assert from 'node:assert/strict';
import { PIECES, pieceFrame } from '../src/music/repertoire.js';
import { ChoirPlayer } from '../src/music/player.js';
test('four complete finite scores each contain four valid distinct parts',()=>{
  assert.equal(PIECES.length,4);assert.equal(new Set(PIECES.map(p=>p.id)).size,4);
  for(const p of PIECES){
    assert.equal(new Set(p.notes.map(n=>n.part)).size,4);
    assert.equal(Math.max(...p.notes.map(n=>n.start+n.beats)),p.beats);
    assert.ok(p.seconds>15&&p.seconds<120);
    for(const n of p.notes){assert.ok(n.start>=0&&n.beats>0);assert.ok(n.midi>=0&&n.midi<128);}
    for(let t=0;t<p.seconds;t+=.1){
      const f=pieceFrame(p,t);assert.equal(f.length,4);
      for(const v of f){assert.ok(Number.isFinite(v.hz)&&v.hz>=0);assert.ok(v.mouth>=0&&v.mouth<=1);}
    }
  }
});
test('score ends in silence and solo preserves only the selected part',()=>{
  for(const p of PIECES){
    assert.ok(pieceFrame(p,p.seconds).every(v=>v.hz===0&&v.level===0&&v.mouth===0));
    assert.ok(pieceFrame(p,-1).every(v=>v.level===0));
    for(let i=0;i<4;i++){
      const f=pieceFrame(p,3,i),full=pieceFrame(p,3);
      assert.deepEqual(f[i],full[i]);assert.ok(f.filter((_,j)=>j!==i).every(v=>v.level===0&&v.mouth===0));
    }
  }
});
function fakeContext(){
  const parameter=()=>({value:0,setTargetAtTime(){}});
  const node=()=>({connect(){},disconnect(){},gain:parameter(),pan:parameter(),frequency:parameter(),detune:parameter(),threshold:parameter(),ratio:parameter(),start(){},stop(){}});
  return {currentTime:0,state:'suspended',destination:node(),async resume(){this.state='running';},createGain:node,createDynamicsCompressor:node,createStereoPanner:node,createOscillator:node,createAnalyser(){return {...node(),getFloatTimeDomainData:a=>a.fill(0)};}};
}
test('audio clock pause, restart, selection, completion and replay have explicit lifecycle',async()=>{
  const c=fakeContext(),p=new ChoirPlayer(PIECES[0],{contextFactory:()=>c});
  assert.equal(p.status,'ready');await p.play();c.currentTime=2.5;assert.equal(p.time,2.5);
  p.pause();c.currentTime=7;assert.equal(p.time,2.5);assert.equal(p.voices.length,0);
  await p.play();c.currentTime=8;assert.equal(p.time,3.5);
  p.select(PIECES[1]);assert.equal(p.time,0);assert.equal(p.status,'ready');assert.equal(p.voices.length,0);
  await p.play();c.currentTime+=2;await p.restart();assert.equal(p.time,0);assert.equal(p.status,'playing');
  c.currentTime+=p.piece.seconds+.1;p.schedule();assert.equal(p.status,'ended');assert.equal(p.time,p.piece.seconds);
  assert.equal(p.voices.length,0);await p.play();assert.equal(p.time,0);p.pause();
});
