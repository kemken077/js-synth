import log from "./modules/log.js";
import {
  getNewAudioContext,
  connectMasterVolume,
  mapVolumeControls,
 } from './modules/audio.js';

function main() {
  const context = getNewAudioContext();
  const masterVolume = connectMasterVolume(context);

  mapVolumeControls(masterVolume);

  log({context, masterVolume});
}

main();
