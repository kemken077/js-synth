import log from "./modules/log.js";
import {
  getNewAudioContext,
  connectMasterVolume,
 } from './modules/audio.js';
import { EVENT_TYPES } from "./modules/utils.js";
import {
  volumeControls,
  soundOnAndOff,
  waveformSelection,
  envelopeControls,
} from "./modules/mappings.js";

function main() {
  const context = getNewAudioContext();
  const masterVolume = connectMasterVolume(context);
  const env = envelopeControls('#attack-control', '#release-control');
  volumeControls(masterVolume);
  soundOnAndOff(context, masterVolume, env);
  waveformSelection();




  log({
    context,
  });
}

window.addEventListener(EVENT_TYPES.domContentLoaded, () => {
  main();
});
