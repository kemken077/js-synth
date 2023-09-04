import { getWaveform, createOscillator, doesOscillatorExists }  from './audio.js';
import envelope from './envelope.js';
import { EVENT_TYPES, UI_ELEMENTS } from "./utils.js";

let OSCILLATORS = {
  currentOscillator: null,
};

export function soundOnAndOff(context, masterVolume, synthEnvelope) {
  // UI
  UI_ELEMENTS.START.addEventListener(EVENT_TYPES.click, () => {
    if (doesOscillatorExists(OSCILLATORS.currentOscillator)) {
      console.warn('Sound already started');
    } else {
      const selectedWaveform = getWaveform();
      OSCILLATORS.currentOscillator = createOscillator(context, selectedWaveform, masterVolume, synthEnvelope);
      OSCILLATORS.currentOscillator.start(0);
    }
  });

  UI_ELEMENTS.STOP.addEventListener(EVENT_TYPES.click, () => {
    if (doesOscillatorExists(OSCILLATORS.currentOscillator)) {
      OSCILLATORS.currentOscillator.stop(0);
      delete OSCILLATORS.currentOscillator;
      console.warn('Sound stopped.')
    }
  });
}

export function waveformSelection() {
  UI_ELEMENTS.WAVE_FORMS.forEach((waveInput) => {
    waveInput.addEventListener(EVENT_TYPES.change, () => {
      if (OSCILLATORS.currentOscillator) {
        const waveform = getWaveform();
        OSCILLATORS.currentOscillator.setWaveformType(waveform);
      }
    });
  });
}

export function volumeControls(masterVolume) {
  const changeVolume = (event) => {
    masterVolume.gain.value = event.target.value;
  };
  UI_ELEMENTS.VOLUME.addEventListener(EVENT_TYPES.input, changeVolume);
}

export function envelopeControls(attackElementQuery, releaseElementQuery) {
  const opt = {
    attackElementQuery,
    releaseElementQuery
  };
  let newEnv = new envelope(opt);

  return newEnv;
}
