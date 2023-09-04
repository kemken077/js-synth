import { EVENT_TYPES } from "./utils.js";

export default class envelope {
  constructor(controls) {
    this.attackTime = 0.3; // Default value
    this.sustainLevel = 0.8; // Default value
    this.releaseTime = 0.3; // Default value

    this.attackControl = document.querySelector(controls.attackElementQuery);
    this.releaseControl = document.querySelector(controls.releaseElementQuery);

    this.attackControl.addEventListener(EVENT_TYPES.input, function() {
      console.log({value: this.value});
      this.attackTime = parseFloat(this.value);
    });

    this.releaseControl.addEventListener(EVENT_TYPES.input, function() {
      console.log({value: this.value});
      this.releaseTime = parseFloat(this.value);
    });
  }

  getNewNoteGain(context) {
    const noteGain = context.createGain();
    noteGain.gain.setValueAtTime(0, 0);
    noteGain.gain.linearRampToValueAtTime(this.sustainLevel, context.currentTime + this.attackTime);
    noteGain.gain.setValueAtTime(this.sustainLevel, context.currentTime + 1 - this.releaseTime);
    noteGain.gain.linearRampToValueAtTime(0, context.currentTime + 1);
    return noteGain;
  }

}
