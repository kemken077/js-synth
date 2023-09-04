import { UI_ELEMENTS } from "./utils.js";
import oscillator from "./oscillator.js";

export function getNewAudioContext() {
  let AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContext;
  return context;
}

export function connectMasterVolume(context) {
  const masterVolume = context.createGain();
  masterVolume.connect(context.destination);
  masterVolume.gain.value = .1;
  return masterVolume;
}

export function getWaveform() {
  const waveforms = UI_ELEMENTS.WAVE_FORMS;
  let waveform = '';
  for (let i = 0; i < waveforms.length; i++) {
    if (waveforms[i].checked) {
      waveform = waveforms[i].value;
    }
  }
  return waveform;
}

export function createOscillator(context, waveform, masterVolume, synthEnvelope = null) {
  const osc = new oscillator(context, waveform);
  osc.setFrequencyValueAtTime(220, 0);

  if (synthEnvelope) {
    const envGain = synthEnvelope.getNewNoteGain(context);
    osc.connectTo(envGain);
    envGain.connect(masterVolume);
  } else { // with no envelope passed in.
    osc.connectTo(masterVolume);
  }

  osc.setWaveformType(waveform);
  return osc;
};
