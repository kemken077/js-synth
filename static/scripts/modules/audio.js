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
  volumeControlElement.addEventListener(EVENT_TYPES.input, function() {
    masterVolume.gain.value = this.value;
  });
}
