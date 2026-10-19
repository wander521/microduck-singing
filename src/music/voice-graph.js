import { harmonicWeights, VOICES } from './official-chorale.js';

// Web Audio adaptation of the official seven-harmonic/formant voice. Audio
// parameters follow the SAME physical-score frame as mouth/head targets.
// Continuous sources hold across a slow physics frame, rather than scheduling
// a wall-clock note ending while the simulated duck is still singing it.
export class ChoralVoice {
  constructor(context, output, identity, count) {
    this.context = context; this.identity = identity; this.sources = []; this.nodes = [];
    this.level = context.createGain(); this.level.gain.value = 0;
    this.pan = context.createStereoPanner(); this.pan.pan.value = -.65 + identity * .43;
    this.level.connect(this.pan); this.pan.connect(output);
    this.nodes.push(this.level, this.pan);
    this.mixGain = .18 / Math.sqrt(Math.max(1, count));
    this.vibrato = context.createOscillator(); this.vibrato.frequency.value = 4.8 + identity * .4;
    const depth = context.createGain(); depth.gain.value = 5 + identity * .5;
    this.vibrato.connect(depth); this.nodes.push(depth); this.sources.push(this.vibrato);
    this.partials = Array.from({ length: 7 }, (_, i) => {
      const oscillator = context.createOscillator(), gain = context.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = VOICES[identity].centre * (i + 1);
      oscillator.detune.value = (identity - 1.5) * 2.5;
      gain.gain.value = 0; oscillator.connect(gain); gain.connect(this.level); depth.connect(oscillator.detune);
      this.sources.push(oscillator); this.nodes.push(gain);
      return { oscillator, gain };
    });
    this.sources.forEach(source => source.start());
  }
  set(frame, now = this.context.currentTime) {
    const weights = harmonicWeights(this.identity, frame.mouth, frame.formantShift || 0);
    for (let i = 0; i < this.partials.length; i++) {
      const { oscillator, gain } = this.partials[i];
      if (frame.hz > 0 && frame.hz !== this.pitch) oscillator.frequency.setTargetAtTime(frame.hz * (i + 1), now, .045);
      if (weights[i] !== this.weights?.[i]) gain.gain.setTargetAtTime(weights[i], now, .06);
    }
    this.singing = frame.hz > 0 && (frame.level ?? frame.mouth) > 0;
    const level = this.singing ? (frame.level ?? frame.mouth) * this.mixGain : 0;
    if (level !== this.previousLevel) this.level.gain.setTargetAtTime(level, now, .03);
    this.previousLevel = level; this.weights = weights;
    if (frame.hz > 0) this.pitch = frame.hz;
    this.last = { key: frame.key, hz: frame.hz, mouth: frame.mouth, level: frame.level ?? frame.mouth, at: now };
  }
  dispose() {
    for (const source of this.sources) { try { source.stop(); } catch {} source.disconnect(); }
    this.nodes.forEach(node => node.disconnect());
  }
}
