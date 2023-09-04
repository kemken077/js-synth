import log from "./modules/log.js";
import {
  getNewAudioContext,
  connectMasterVolume,
 } from './modules/audio.js';
import { EVENT_TYPES } from "./modules/utils.js";
import {
  volumeControls,
  playPauseControls,
  waveformSelection,
  envelopeControls,
} from "./modules/mappings.js";

function main() {
  const context = getNewAudioContext();
  const masterVolume = connectMasterVolume(context);
  volumeControls(masterVolume);
  playPauseControls(context, masterVolume);
  waveformSelection();
  envelopeControls('#attack-control', '#release-control');


  log({
    context,
  });
}

window.addEventListener(EVENT_TYPES.domContentLoaded, () => {
  main();
});
