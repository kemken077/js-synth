import { EVENT_TYPES } from "./utils.js";

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
  const volumeControlElement = document.getElementById('volume-control');
  const changeVolume = (event) => {
    masterVolume.gain.value = event.target.value;
  };
  volumeControlElement.addEventListener(EVENT_TYPES.input, changeVolume);
}

export function setWaveforms() {
  const waveforms = document.getElementsByName('waveform');
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
