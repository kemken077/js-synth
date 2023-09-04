import { getWaveform }  from './audio.js';
import oscillator from "./oscillator.js";
import { EVENT_TYPES, UI_ELEMENTS } from "./utils.js";

const createOscillator = (context, waveform, masterVolume) => {
  const osc = new oscillator(context, waveform);
  osc.setFrequencyValueAtTime(220, 0);
  osc.connectToMasterVolume(masterVolume);
  osc.setWaveformType(waveform);
  return osc;
};

let OSCILLATORS = {
  currentOscillator: null,
};



function playPauseControls(context, masterVolume) {
  // UI
  UI_ELEMENTS.START.addEventListener(EVENT_TYPES.click, () => {
    if (OSCILLATORS.currentOscillator) {
      console.warn('Sound already started');
    } else {
      const selectedWaveform = getWaveform();
      OSCILLATORS.currentOscillator = createOscillator(context, selectedWaveform, masterVolume);
      OSCILLATORS.currentOscillator.start(0);
    }
  });

  UI_ELEMENTS.STOP.addEventListener(EVENT_TYPES.click, () => {
    OSCILLATORS.currentOscillator.stop(0);
    delete OSCILLATORS.currentOscillator;
  });
}

function waveformSelection() {
  UI_ELEMENTS.WAVE_FORMS.forEach((waveInput) => {
    waveInput.addEventListener(EVENT_TYPES.change, () => {
      if (OSCILLATORS.currentOscillator) {
        const waveform = getWaveform();
        OSCILLATORS.currentOscillator.setWaveformType(waveform);
      }
    });
  });
}

let Mappings = {};
Mappings = {
  playPauseControls,
  waveformSelection,
};

export default Mappings;