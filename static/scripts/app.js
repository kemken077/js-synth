import log from "./modules/log.js";
import {
  getNewAudioContext,
  connectMasterVolume,
  mapVolumeControls,
  setWaveforms,
 } from './modules/audio.js';
import oscillator from "./modules/oscillator.js";
import { EVENT_TYPES, UI_ELEMENTS } from "./modules/utils.js";

function main() {
  const context = getNewAudioContext();
  const masterVolume = connectMasterVolume(context);
  mapVolumeControls(masterVolume);
  const { waveforms } = setWaveforms();

  const createOscillator = (context, waveform) => {
    const osc = new oscillator(context, waveform);
    osc.setFrequencyValueAtTime(220, 0);
    osc.connectToMasterVolume(masterVolume);
    osc.setWaveformType(waveform);
    return osc;
  };
  let OSCILLATORS = {
    currentOscillator: null,
  };

  UI_ELEMENTS.START.addEventListener(EVENT_TYPES.click, () => {
    if (OSCILLATORS.currentOscillator) {
      console.warn('Sound already started');
    } else {
      const selectedWaveform = setWaveforms();
      OSCILLATORS.currentOscillator = createOscillator(context, selectedWaveform.waveform);
      OSCILLATORS.currentOscillator.start(0);
    }
  });

  UI_ELEMENTS.STOP.addEventListener(EVENT_TYPES.click, () => {
    OSCILLATORS.currentOscillator.stop(0);
    delete OSCILLATORS.currentOscillator;
  });

  waveforms.forEach((waveInput) => {
    waveInput.addEventListener(EVENT_TYPES.change, () => {
      if (OSCILLATORS.currentOscillator) {
        const { waveform } = setWaveforms();
        OSCILLATORS.currentOscillator.setWaveformType(waveform);
      }
    });
  });

  log({
    context,
    masterVolume,
    waveforms,
    oscillatorIntance: OSCILLATORS.currentOscillator,
    oscillator,
  });
}

window.addEventListener(EVENT_TYPES.domContentLoaded, () => {
  main();
});
