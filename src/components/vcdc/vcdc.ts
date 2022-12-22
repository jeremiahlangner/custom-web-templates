import { VCDCConfig } from '../types';

export class VCDC extends HTMLElement {
  hash: string;
  selector: `${string}-${string}`;
  template: string;
  style: string;
  config: VCDCConfig;
  _template: HTMLTemplateElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._template = document.createElement('template');
    this._template.innerHTML += `<slot></slot>`;
    this.render();
  }
  
  render() {
    this.shadowRoot.appendChild(this._template.content.cloneNode(true));
  }
}

customElements.define('vcdc-app', VCDC);
