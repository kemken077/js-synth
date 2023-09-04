export default class CustomElement extends HTMLElement {
  constructor(tagname) {
    super();
    this.tagname = tagname;
    this.el = null;
  }
  create() {
    this.el = document.createElement(this.tagname);
  }
  append() {
    if (this.el) {
      document.body.appendChild(this.el);
    } else {
      console.warn(`Need to create an element before appending it to the Document's body`);
    }
  }
  define(elTagName, classDeclaration) {
    window.customElements.define(elTagName, classDeclaration);
  }
  attachListener(event, fn) {
    document.querySelector(this.tagname).addEventListener(event, fn);
  }
}
