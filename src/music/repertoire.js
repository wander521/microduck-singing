import { OFFICIAL_SCORES } from './scores.js';
import { scoreFrame } from './official-chorale.js';
const ids = ['bass', 'tenor', 'alto', 'soprano'];
function line(part, pitches, length, vowel = 'ah', offset = 0) {
  let start = offset;
  return pitches.flatMap(pitch => {
    const [midi, beats] = Array.isArray(pitch) ? pitch : [pitch, length];
    const note = midi === null ? [] : [{ part, midi, start, beats, level: .78, vowel }];
    start += beats; return note;
  });
}
const moonParts = [
  [[48,50,52,43,48,53,52,43,48,48],4,'oo'],
  [[55,60,57,62,60,64,59,55,55,60,57,62,60,59,55,53,55,60,55,null],2,'oh'],
  [[64,67,65,69,67,72,65,62,64,67,65,69,64,65,64,62,64,67,64,null],2,'eh'],
  [[72,76,79,76,74,77,81,77,76,79,84,79,74,77,79,71,72,74,76,79,81,79,77,74,76,79,77,74,72,76,74,71,72,79,76,74,72,null,72,null],1,'ah'],
];
const moon = { id: 'moon', bpm: 128, beats: 40, notes: moonParts.flatMap(([notes,len,vowel],i)=>line(ids[i],notes,len,vowel)) };
// Public-domain Beethoven melody. New four-part browser arrangement, no recording.
const odeMelody = [64,64,65,67,67,65,64,62,60,60,62,64,[64,1.5],[62,.5],[62,2],64,64,65,67,67,65,64,62,60,60,62,64,[62,1.5],[60,.5],[60,2],62,62,64,60,62,[64,.5],[65,.5],64,60,62,[64,.5],[65,.5],64,62,60,62,[55,2],64,64,65,67,67,65,64,62,60,60,62,64,[62,1.5],[60,.5],[60,2]];
const chords = [48,48,43,48,48,43,43,43,48,48,43,48,43,48,43,43];
const ode = { id:'ode', bpm:100, beats:64, notes:[
  ...line('soprano',odeMelody,1),
  ...line('bass',chords,4,'oo'),
  ...line('tenor',chords.map(n=>n+7),4,'oh'),
  ...line('alto',[55,55,59,55,55,59,59,59,55,55,59,55,59,55,59,55],4,'eh'),
] };
export const PIECES = [
  { ...OFFICIAL_SCORES.wistful, title:'微光慢板', english:'Wistful', description:'慢慢开口，让四个声音汇成一束微光。', credit:'Pollen Robotics 官方原创', mood:'温柔 · 四声部', color:'#846dba' },
  { ...OFFICIAL_SCORES['duck-strut'], title:'鸭鸭摇摆', english:'Duck Strut', description:'轻快的切分节奏，小鸭也有自己的律动。', credit:'Pollen Robotics 官方原创', mood:'轻快 · 四声部', color:'#44829b' },
  { ...moon, title:'月球嘎嘎进行曲', english:'Moon Quack March', description:'从月球球场出发，唱一首属于小鸭的进行曲。', credit:'本项目原创曲目', mood:'俏皮 · 四声部', color:'#b9573d' },
  { ...ode, title:'欢乐颂', english:'Ode to Joy', description:'熟悉的旋律，用四种小鸭的声音重新相遇。', credit:'贝多芬旋律 · 本项目四声部改编', mood:'明亮 · 四声部', color:'#8b7136' },
].map(piece => ({ ...piece, seconds:piece.beats*60/piece.bpm }));
export const silentFrames = () => ids.map((_,identity)=>({ identity,voice:identity,hz:0,mouth:0,level:0,reach:0,key:'silent',part:['低音','次中音','中音','高音'][identity] }));
export function pieceFrame(piece, seconds, solo = null) {
  if (seconds < 0 || seconds >= piece.seconds) return silentFrames();
  return scoreFrame(piece, seconds*piece.bpm/60).map(frame => solo === null || solo === frame.identity ? frame : { ...frame,level:0,mouth:0 });
}
