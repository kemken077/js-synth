import log from "./modules/log.js";
import { getNewAudioContext } from './modules/audio.js';

function main() {
  const context = getNewAudioContext();
  log({context});
}

main();