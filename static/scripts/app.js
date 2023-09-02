import log from "./modules/log.js";
import {
  getNewAudioContext,
  connectMasterVolume,
  mapVolumeControls,
  setWaveforms,
 } from './modules/audio.js';
import oscillator from "./modules/oscillator.js";

function main() {
  const context = getNewAudioContext();
  const masterVolume = connectMasterVolume(context);
  mapVolumeControls(masterVolume);
  const [waveforms, waveform] = setWaveforms();
  const oscillatorA = new oscillator(context);

  oscillatorA.setFrequencyValueAtTime(220, 0);
  oscillatorA.start(0);
  oscillatorA.setWaveformType(waveform);


  log({
    context,
    masterVolume,
    waveforms,
    oscillatorA,
    oscillator,
  });
}

window.addEventListener('DOMContentLoaded', () => {
  main();
});
