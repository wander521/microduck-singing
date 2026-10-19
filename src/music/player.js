import { ChoralVoice } from './voice-graph.js';
import { pieceFrame, silentFrames } from './repertoire.js';
export class ChoirPlayer {
  constructor(piece, { contextFactory = () => new AudioContext() } = {}) {
    this.piece=piece; this.contextFactory=contextFactory; this.context=null; this.offset=0; this.startAt=0;
    this.status='ready'; this.solo=null; this.volume=.7; this.voices=[]; this.cursor=0;
  }
  get time() { return this.status === 'playing' ? Math.min(this.piece.seconds, this.offset + this.context.currentTime-this.startAt) : this.offset; }
  async play() {
    if(this.status==='playing') return;
    this.context ??= this.contextFactory();
    if (!this.master) {
      this.master=this.context.createGain(); this.master.gain.value=this.volume;
      const compressor=this.context.createDynamicsCompressor();
      compressor.threshold.value=-15; compressor.ratio.value=3;
      this.master.connect(compressor); compressor.connect(this.context.destination);
      this.analyser=this.context.createAnalyser(); this.analyser.fftSize=512; this.master.connect(this.analyser);
      this.samples=new Float32Array(512);
    }
    await this.context.resume();
    if(this.status==='ended')this.offset=0;
    this.voices=Array.from({length:4},(_,i)=>new ChoralVoice(this.context,this.master,i,4));
    this.startAt=this.context.currentTime; this.cursor=this.startAt; this.status='playing';
    this.schedule(); this.timer=setInterval(()=>this.schedule(),25);
  }
  schedule() {
    if(this.status!=='playing') return;
    const now=this.context.currentTime;
    // On a stalled main thread catch up to the audio clock, never replay stale notes.
    this.cursor=Math.max(this.cursor,now);
    while(this.cursor<now+.12) {
      const time=this.offset+this.cursor-this.startAt;
      const frames=pieceFrame(this.piece,time,this.solo);
      frames.forEach((f,i)=>this.voices[i].set(f,this.cursor));
      this.cursor+=.02;
    }
    if(this.time>=this.piece.seconds){ this.offset=this.piece.seconds; this.halt('ended'); }
  }
  halt(status) { clearInterval(this.timer); this.voices.forEach(v=>v.dispose()); this.voices=[]; this.status=status; }
  pause() { if(this.status!=='playing')return; this.offset=this.time; this.halt('paused'); }
  select(piece) { this.halt('ready');this.piece=piece;this.offset=0; }
  restart() { const playing=this.status==='playing'; this.halt('ready');this.offset=0; return playing?this.play():Promise.resolve(); }
  setSolo(identity) { this.solo=this.solo===identity?null:identity; }
  setVolume(volume) { this.volume=Math.max(0,Math.min(1,volume));if(this.master)this.master.gain.setTargetAtTime(this.volume,this.context.currentTime,.02); }
  get frames() { return this.status==='playing'?pieceFrame(this.piece,this.time,this.solo):silentFrames(); }
  get snapshot() {
    this.analyser?.getFloatTimeDomainData(this.samples);
    return {status:this.status,piece:this.piece.id,time:this.time,duration:this.piece.seconds,solo:this.solo,volume:this.volume,
      rms:this.samples?Math.sqrt(this.samples.reduce((a,b)=>a+b*b,0)/this.samples.length):0,voices:this.frames};
  }
}
