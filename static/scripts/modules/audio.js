export function getNewAudioContext() {
  let AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContext;
  return context;
}
