const content = `
  <other-custom-element>This is testing to see if the secondary test element will also show up.</other-custom-element>
`;

class OtherCustomEl extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML += `This is a better test`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

class CustomTestEl extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML += `<slot></slot> ${content}`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define("other-custom-element", OtherCustomEl);
customElements.define("custom-test-element", CustomTestEl);
