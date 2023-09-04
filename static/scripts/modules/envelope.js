import CustomElement from "./custom-element";

export default class envelope extends CustomElement {
  constructor() {
    this.attackTime = 0.3
    this.sustainLevel = 0.8
    this.releaseTime = 0.3
  }
}

