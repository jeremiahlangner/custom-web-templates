(()=>{var e=class extends HTMLElement{constructor(){super();this.attachShadow({mode:"open"}),this._template=document.createElement("template"),this._template.innerHTML+="<slot></slot>"}render(){this.shadowRoot.appendChild(this._template.content.cloneNode(!0))}};})();
