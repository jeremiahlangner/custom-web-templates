import { VCDCConfig } from '../../types';

export class VCDC extends HTMLElement {
  hash: string;
  selector: `${string}-${string}`;
  template: string;
  customStyle: string;
  config: VCDCConfig;
  _template: HTMLTemplateElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create the element for the component; We'll update later if necessary.
    this._template = document.createElement('template');
    // Add a slot for rendering information inserted via html template files between component tags.
    this._template.innerHTML += `<slot></slot>`;

    if (this.config?.class) {
      this._template.classList.add(this.config.class);
    }

    this.render();
  }

  render() {
    this.shadowRoot?.appendChild(this._template.content.cloneNode(true));
  }
}

customElements.define('vcdc-app', VCDC);
