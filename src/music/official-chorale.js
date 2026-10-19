// Adapted from pollen-robotics/microduck @53230463927095ea890f231d29089bb0a538c06f
// sounds/src/chorale/mod.rs, sounds/src/{personality,stream}.rs,
// robotd/src/chorale.rs (Apache-2.0). Browser audio graph is this project's port,
// not a bit-identical Rust Stream. No Bluetooth, sensor service or network path.
export const PART_NAMES = ['低音', '次中音', '中音', '高音'];
export const PART_IDS = ['bass', 'tenor', 'alto', 'soprano'];
export const VOWELS = {
  ah: { open: .90, shift: 0, level: 1 }, eh: { open: .65, shift: 1, level: 1 },
  ee: { open: .45, shift: 3, level: 1 }, oh: { open: .55, shift: -1, level: 1 },
  oo: { open: .35, shift: -2, level: 1 }, mm: { open: .05, shift: -2, level: .65 },
};
export function ensemble(count) {
  return count <= 0 ? [] : count === 1 ? [3] : count === 2 ? [0, 3] : count === 3 ? [0, 2, 3] : [0, 1, 2, 3];
}
export const midiHz = note => 440 * 2 ** ((note - 69) / 12);
export function headExpression(beat, reach) {
  return [0, -.10 * reach + .025 * Math.sin(2 * Math.PI * beat),
    .05 * Math.sin(2 * Math.PI * beat / 8), .08 * Math.sin(2 * Math.PI * beat / 4)];
}
// Original fixed browser personalities. The official RNG/serial identity is not
// recreated: only harmonic/formant formulae and choral softening are reused.
export const VOICES = [
  { tilt: 2.3, brightness: .12, nasal: .30, skew: -.25, formant: 2, gain: .60, centre: 170, spread: .8 },
  { tilt: 2.0, brightness: .18, nasal: .42, skew: .15, formant: 3, gain: .52, centre: 220, spread: .7 },
  { tilt: 1.9, brightness: .22, nasal: .36, skew: -.15, formant: 3, gain: .46, centre: 290, spread: .6 },
  { tilt: 1.7, brightness: .26, nasal: .25, skew: .20, formant: 4, gain: .38, centre: 350, spread: .6 },
];
export function harmonicWeights(voice, open, shift = 0) {
  const p = VOICES[voice], tilt = Math.max(.8, p.tilt - .8 * Math.max(0, Math.min(1, open)));
  const formant = Math.max(1, Math.min(7, Math.round(p.formant + shift)));
  const weights = Array.from({ length: 7 }, (_, i) => {
    const n = i + 1, base = 1 / n ** tilt;
    const skew = p.skew >= 0 ? p.skew * (n % 2 === 0 ? .4 : -.2) : -p.skew * (n % 2 === 0 ? -.3 : .4);
    return Math.max(0, base + p.brightness * (n / 7) ** 1.5 + (n === 2 || n === 3 ? p.nasal * .6 : 0) +
      skew + (n === formant ? p.gain * base * 1.5 : 0));
  });
  weights[0] = Math.max(.7, weights[0]);
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map(w => .62 * w / sum); // full-range browser speaker, no robot-speaker rolloff
}
export function thereminFrame(closeness, voice = 3) {
  const c = Math.max(0, Math.min(1, closeness)), p = VOICES[voice];
  const low = p.centre * .85, high = p.centre * (1.6 + .5 * p.spread);
  return { hz: low * (high / low) ** c, mouth: c, level: c, formantShift: 0, reach: c };
}
export function scoreFrame(score, beat, count = 4) {
  return ensemble(count).map((part, voice) => {
    const line = score.notes.filter(note => note.part === PART_IDS[part]);
    // Preserve source import's small legato overlaps: sing() visits the earlier
    // note until its written end, then advances, rather than truncating the score.
    const note = line.find(note => beat >= note.start && beat < note.start + note.beats);
    const low = Math.min(...line.map(n => n.midi)), high = Math.max(...line.map(n => n.midi));
    if (!note) return { part: PART_NAMES[part], voice, identity: part, key: `${score.id}:${part}:rest`, hz: 0, mouth: 0, level: 0, reach: 0, formantShift: 0 };
    const vowel = VOWELS[note.vowel], reach = (note.midi - low) / Math.max(1, high - low);
    const fraction = (beat - note.start) / note.beats;
    const singing = fraction < .92;
    return { part: PART_NAMES[part], voice, identity: part, key: `${score.id}:${part}:${note.start}`, note: note.midi,
      hz: midiHz(note.midi), mouth: singing ? Math.min(1, vowel.open + .12 * reach) : 0,
      level: singing ? note.level * vowel.level : 0, reach, formantShift: vowel.shift };
  });
}
