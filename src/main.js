import './style.css';
import { PIECES } from './music/repertoire.js';
import { ChoirPlayer } from './music/player.js';
import { createStage } from './stage.js';
const $=id=>document.getElementById(id);
const paths={play:'m9 5 11 7-11 7V5Z',pause:'M8 5v14M16 5v14',restart:'M5 9a8 8 0 1 1-1 7M5 3v6h6',next:'m5 5 10 7-10 7V5ZM19 5v14',volume:'m11 4-6 5H2v6h3l6 5V4ZM15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14',view:'M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5M8 12h8M12 8v8',close:'m6 6 12 12M6 18 18 6'};
const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
for(const [id,name]of [['restart','restart'],['next','next'],['view','view'],['close-about','close'],['volume-icon','volume']])$(id).innerHTML=icon(name);
const format=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
let index=0,stage,ready=false,busy=false;
const player=new ChoirPlayer(PIECES[0]);
$('pieces').innerHTML=PIECES.map((p,i)=>`<button class="piece" data-index="${i}" aria-pressed="${i===0}"><span class="track-number">${String(i+1).padStart(2,'0')}</span><span class="track-name"><strong>${p.title}</strong><span>${p.english}</span></span><span class="track-duration">${format(p.seconds)}</span><span class="playing-bars" aria-hidden="true"><i></i><i></i><i></i></span></button>`).join('');
const names=['低音','次中音','中音','高音'],eng=['BASS','TENOR','ALTO','SOPRANO'];
$('voices').innerHTML=names.map((name,i)=>`<button class="voice voice-${i}" data-voice="${i}" aria-label="单独试听${name}" aria-pressed="false"><span class="voice-dot"></span><span>${name}<small>${eng[i]}</small></span><span class="voice-level" aria-hidden="true"><i></i><i></i><i></i></span></button>`).join('');
function refresh(){
  const p=player.piece,playing=player.status==='playing';
  document.body.classList.toggle('is-playing',playing);
  $('play-icon').innerHTML=icon(playing?'pause':'play');
  $('play-text').textContent=!ready?'正在入座':busy?'准备声音':playing?'暂停演唱':player.status==='ended'?'再唱一次':player.status==='paused'?'继续演唱':'开始合唱';
  $('play').disabled=!ready||busy;
  $('status').textContent=player.status==='ended'?'演唱结束':playing?'正在演唱':player.status==='paused'?'已暂停':'准备就绪';
  $('mood').textContent=p.mood;$('now-title').textContent=p.title;$('now-credit').textContent=p.credit;
  $('duration').textContent=format(p.seconds);$('progress').max=p.seconds;
  document.querySelectorAll('.piece').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
  document.querySelectorAll('.voice').forEach((b,i)=>{
    b.setAttribute('aria-pressed',String(player.solo===i));
    b.classList.toggle('is-muted',player.solo!==null&&player.solo!==i);
    b.setAttribute('aria-label',player.solo===i?`退出${names[i]}独唱`:`单独试听${names[i]}`);
  });
  $('all-voices').hidden=player.solo===null;
}
function error(message){$('error').textContent=message;$('error').hidden=false;}
async function toggle(){
  if(!ready||busy)return;
  if(player.status==='playing'){player.pause();refresh();return;}
  busy=true;refresh();
  try{await player.play();$('error').hidden=true;}catch(e){player.pause();error('声音未能启动，请再次点击“开始合唱”。');console.error(e);}
  finally{busy=false;refresh();}
}
async function select(i){
  if(busy)return;
  const playing=player.status==='playing';index=i;player.select(PIECES[i]);
  if(playing)await toggle();refresh();
}
$('pieces').addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b)select(Number(b.dataset.index));});
$('play').addEventListener('click',toggle);
$('next').addEventListener('click',()=>select((index+1)%4));
$('restart').addEventListener('click',async()=>{if(busy)return;try{await player.restart();refresh();}catch{error('重唱未能开始，请点击播放重试。');}});
$('voices').addEventListener('click',e=>{const b=e.target.closest('[data-voice]');if(b){player.setSolo(Number(b.dataset.voice));refresh();}});
$('all-voices').addEventListener('click',()=>{player.solo=null;refresh();});
$('volume').addEventListener('input',e=>{player.setVolume(Number(e.target.value)/100);$('volume-value').value=`${e.target.value}%`;});
$('view').addEventListener('click',()=>stage?.resetView());
$('about-button').addEventListener('click',()=>{$('about').hidden=!$('about').hidden;$('about-button').setAttribute('aria-expanded',String(!$('about').hidden));});
$('about-button').setAttribute('aria-expanded','false');$('about-button').setAttribute('aria-controls','about');
function closeAbout(){$('about').hidden=true;$('about-button').setAttribute('aria-expanded','false');$('about-button').focus();}
$('close-about').addEventListener('click',closeAbout);
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!$('about').hidden)closeAbout();
  if(e.code==='Space'&&!e.repeat&&!e.target.closest('button,input,a,select,textarea')){e.preventDefault();toggle();}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&player.status==='playing'){player.pause();refresh();}});
let lastStatus=player.status;
function animate(){
  const t=player.time,frames=player.frames;
  stage?.update(frames,t*player.piece.bpm/60,player.status==='playing');
  $('elapsed').textContent=format(t);$('progress').value=t;
  document.querySelectorAll('.voice').forEach((b,i)=>b.classList.toggle('is-singing',frames[i].level>0));
  if(lastStatus!==player.status){lastStatus=player.status;refresh();}
  requestAnimationFrame(animate);
}
// Read-only diagnostics for reproducible audio and transport checks.
Object.defineProperty(window,'choirSnapshot',{get:()=>({...player.snapshot,ready})});
refresh();animate();
createStage($('stage')).then(s=>{stage=s;ready=true;$('loading').remove();refresh();}).catch(e=>{
  console.error(e);$('loading').textContent='小鸭暂时没能入座';
  error('舞台未能加载。请检查浏览器是否支持 WebGL，然后刷新页面重试。');
});
