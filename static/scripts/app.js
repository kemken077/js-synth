import log from "./modules/log.js";
import {
  getNewAudioContext,
  connectMasterVolume,
  mapVolumeControls,
 } from './modules/audio.js';
import oscillator from "./modules/oscillator.js";
import { EVENT_TYPES } from "./modules/utils.js";
import Mappings from "./modules/mappings.js";

function main() {
  const context = getNewAudioContext();
  const masterVolume = connectMasterVolume(context);
  mapVolumeControls(masterVolume);


  // UI
  Mappings.playPauseControls(context, masterVolume);
  Mappings.waveformSelection();
  // END UI.

  log({
    context,
  });
}

window.addEventListener(EVENT_TYPES.domContentLoaded, () => {
  main();
});
