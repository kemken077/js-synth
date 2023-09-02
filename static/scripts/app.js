import log from "./modules/log.js";
import {
  getNewAudioContext,
  connectMasterVolume,
  mapVolumeControls,
  setWaveforms,
 } from './modules/audio.js';

function main() {
  const context = getNewAudioContext();
  const masterVolume = connectMasterVolume(context);
  const waveforms = setWaveforms();

  log({
    context,
    masterVolume,
    waveforms,
  });
}

window.addEventListener('DOMContentLoaded', () => {
  main();
});
