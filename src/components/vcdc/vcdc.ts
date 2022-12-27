import { VCDCConfig } from '../../types';
import { ComponentService } from '../../services/component.service';
import { Rules } from '../../services/rules.service';
import { Shared } from '../../providers/shared.provider';

export class VCDC extends HTMLElement {
  componentService: ComponentService;
  rules: Rules;

  hash: string;
  selector: `${string}-${string}`;
  template: string;
  customStyle: string;
  dataPath: string;
  config: VCDCConfig;
  _config: VCDCConfig;
  _template: HTMLTemplateElement;

  constructor() {
    super();

    this.init().then(() => {
      this.attachShadow({ mode: 'open' });
      this._template = document.createElement('template');

      this.configure();
      this.render();
    });
  }

  async init() {
    const promises = [
      Shared.getService('ComponentService').then(componentService => this.componentService = componentService),
      Shared.getService('Rules').then(rules => this.rules = rules)
    ];
    return Promise.all(promises);
  }

  // update configuration and element properties.
  configure() {
    if (!this.config) this.config = {};

    if (!this._config) this._config = this.config;

    if (this.config.style !== this._config.style) {
      this._config.style = this.config.style;
      this.setAttribute('style', this._config.style || '');
    }

    if (this.config.class && this.config.class !== this._config.class) {
      this._config.class = this.config.class;
      this._template.classList.forEach(c => this._template.classList.remove(c));

      if (Array.isArray(this.config.class)) {
        this.config.class.forEach(c => this._template.classList.add(c));
      } else {
        this._template.classList.add(this.config.class);
      }
    }

    if (this.config.layout !== this._config.layout) {
      this._config.layout = this.config.layout;
    }

  }

  render() {
    // Diff top level config and rerender only if necessary.
    this._template.innerHTML += `<slot></slot>${this.template}`;
    // Rules check before render.
    this.shadowRoot?.appendChild(this._template.content.cloneNode(true));
  }
}

customElements.define('vcdc-app', VCDC);
