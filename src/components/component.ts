const elements = [1, 2, 3, 4, 5];

// Make all elements custom web elements. Supported by webkit?
const observedProps = {
  'for': { // WIP....
    _getter(prototype: Element) {
      // TODO: write for
      const statement = prototype.getAttribute('for');
      const statements = statement.split(';');
      const iterated = eval(statements[0].split(' ')[3]);
      const iterName = statements[0].split(' ')[1];
      const html = prototype.outerHTML;
      prototype.innerHTML = '';
      for (const i of iterated) {
        prototype.insertAdjacentHTML('afterend', html);
      }
      return statement;
    },
    _setter(prototype: Element, val: string) {
      prototype.setAttribute('for', val);
      return prototype.getAttribute('for');
    }
  },
  'if': {
    _getter(prototype: any) {
      const statement = prototype.getAttribute('if');
      eval(statement) ? prototype.style.display = 'block' : prototype.style.display = 'none';
      return statement;
    },
    _setter(prototype: any, val: string) {
      prototype.setAttribute('if', val);
      return prototype.getAttribute('if');
    }
  }
};

for (const prop in observedProps) {
  Object.defineProperty(Element.prototype, prop, {
    get() {
      console.log(prop, 'testing');
      return observedProps[prop]._getter(this);
    },
    set(val: string) {
      observedProps[prop]._setter(this, val);
    }
  });
}

class Component extends HTMLElement {
  _data: any;

  // kk, how bout I set up getter/setters in an object for these...
  static get observedAttributes() {
    return [
      'for',
      'if',
      'data',
      'visible'
    ];
  }

  // Define fns prior to referencing with vals.
  private attrFns: any = {
    'for': (attr?: string, old?: any, val?: any) => {
      // must observer for
      if (!attr && !old && !val) {
        const statement = this.getAttribute('for');
        const val = eval(statement);
        return val; // naive/non-real representation of the components that will be necessary
      }

      // setter
    },
    'if': (attr?: string, old?: any, val?: any) => {
      // Should observe if?
      if (!attr && !old && !val) {
        const statement = this.getAttribute('if');
        const val = eval(statement);
        return val;
      }
      return eval(val) ? this.style.display = 'block' : this.style.display = 'none';
    },
    data: (attr?: string, old?: any, val?: any) => {
      if (!attr && !val && !val) {
        return this.getAttribute('data');
      }
      // setter
    },
    visible: (attr?: string, old?: any, val?: any) => {
      // Should observe visible?
      if (!attr && !old && !val) {
        const statement = this.getAttribute('if');
        const val = eval(statement);
        return val;
      }
      if (val) {
        this.setAttribute('visible', '');
      } else {
        this.removeAttribute('visible');
      }
    }
  };

  get 'if'() { return this.attrFns['if'](); }
  set 'if'(val: string) { this.attrFns['if'](this.getAttribute('if'), null, val); }
  get 'for'() { return this.attrFns['for'](); }
  set 'for'(val: string) { this.attrFns['for'](this.getAttribute('for'), null, val); }
  get data() { return this.attrFns['data'](); }
  set data(val) {
    const old = this._data;
    this._data = val;
    this.attrFns['data']('data', old, val);
  }
  get visible() { return this.attrFns['visible'](); }
  set visible(val: string) { this.attrFns['visible'](this.getAttribute('visible'), null, val); }

  attributeChangedCallback(attr: string, old: any, val: any) {
    return this.attrFns[attr](attr, old, val);
  }

  constructor() {
    super();
    setTimeout(() => {
      console.log('test');
      this['if'] = 'true';
    }, 5000);
  }

  // onload
  connectedCallback() { }

  // onunload
  disconnectedCallback() { }
}

window.customElements.define('cs-component', Component);
setTimeout(() => {
  const el = document.createElement('div');
  el.innerText = 'testing 123';
  el['if'] = 'false';
  document.body.appendChild(el);
}, 5000);
setTimeout(() => {
  document.querySelector('div')['if'] = 'true';
  document.querySelector('div')['for'] = 'let test of elements';
}, 7500);

