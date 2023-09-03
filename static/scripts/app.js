import log from "./modules/log.js";
import {
  getNewAudioContext,
  connectMasterVolume,
  mapVolumeControls,
  getWaveform,
 } from './modules/audio.js';
import oscillator from "./modules/oscillator.js";
import { EVENT_TYPES, UI_ELEMENTS } from "./modules/utils.js";

function main() {
  const context = getNewAudioContext();
  const masterVolume = connectMasterVolume(context);
  mapVolumeControls(masterVolume);

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
      const selectedWaveform = getWaveform();
      OSCILLATORS.currentOscillator = createOscillator(context, selectedWaveform);
      OSCILLATORS.currentOscillator.start(0);
    }
  });

  UI_ELEMENTS.STOP.addEventListener(EVENT_TYPES.click, () => {
    OSCILLATORS.currentOscillator.stop(0);
    delete OSCILLATORS.currentOscillator;
  });

  UI_ELEMENTS.WAVE_FORMS.forEach((waveInput) => {
    waveInput.addEventListener(EVENT_TYPES.change, () => {
      if (OSCILLATORS.currentOscillator) {
        const waveform = getWaveform();
        OSCILLATORS.currentOscillator.setWaveformType(waveform);
      }
    });
  });

  log({
    context,
    masterVolume,
    oscillatorIntance: OSCILLATORS.currentOscillator,
    oscillator,
  });
}

window.addEventListener(EVENT_TYPES.domContentLoaded, () => {
  main();
});
