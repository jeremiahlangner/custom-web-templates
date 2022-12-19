class customTestEl extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.render();
  }

  render() {
    const template = document.createElement('template');
    template.innerHTML += '<slot></slot>';
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('custom-test-element', customTestEl);
