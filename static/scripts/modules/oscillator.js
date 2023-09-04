export default class oscillator {
  constructor(context) {
    this.context = context;
    this.osc = context.createOscillator();
    this.frequency = this.osc.frequency;
    this.detune = this.osc.detune;
    this.type = this.osc.type;
  }

  setFrequencyValueAtTime(value, startTime = 0) {
    this.frequency.setValueAtTime(value, startTime);
  }

  connectTo(gain) {
    this.osc.connect(gain);
  }

  start(when = 0) {
    this.osc.start(when);
  }

  stop(when = 0) {
    this.osc.stop(when);
  }

  setWaveformType(waveformType) {
    this.osc.type = waveformType;
  }

}