export class VCDC extends HTMLElement {
  _template: any;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._template = document.createElement('template');
    this._template.innerHTML += `<slot></slot>`;
  }

  render() {
    this.shadowRoot.appendChild(this._template.content.cloneNode(true));
  }
}
