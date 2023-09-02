export const EVENT_TYPES = {
  click: 'click',
  input: 'input',
  change: 'change',
  domContentLoaded: 'DOMContentLoaded',
};

export const WAVE_FORMS = {
  sine: 'sine',
  square: 'square',
  triangle: 'triangle',
  sawtooth: 'sawtooth',
};

export const UI_ELEMENTS = {
  START: document.querySelector('#play'),
  STOP: document.querySelector('#stop'),
  VOLUME: document.querySelector('#volume-control'),
  WAVE_FORMS: document.getElementsByName('waveform'),
};
