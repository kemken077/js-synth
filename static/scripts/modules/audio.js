import { EVENT_TYPES, UI_ELEMENTS } from "./utils.js";

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

export function mapVolumeControls(masterVolume) {
  const changeVolume = (event) => {
    masterVolume.gain.value = event.target.value;
  };
  UI_ELEMENTS.VOLUME.addEventListener(EVENT_TYPES.input, changeVolume);
}

export function setWaveforms() {
  const waveforms = UI_ELEMENTS.WAVE_FORMS;
  let waveform;
  for (let i = 0; i < waveforms.length; i++) {
    if (waveforms[i].checked) {
      waveform = waveforms[i].value;
    }
  }
  return {
    waveforms,
    waveform,
  };
}
