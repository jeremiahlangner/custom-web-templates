export class Observed {
  _obj: any;
  _getter: (key: string) => unknown;
  _setter: (key: string, val: unknown, old: unknown) => void;

  constructor(getter: any, setter: any, obj) {
    const self = this; // eslint-disable-line
    const handler = {
      get(target, key) {
        if (typeof target[key] === 'object' && target[key] !== null) {
          // TODO: check for pre-existing proxy rather than returning new Proxy; memory leak/sink otherwise.
          return new Proxy(target[key], handler);
        } else {
          self._getter(key);
          return target[key];
        }
      },
      set(target, key, val) {
        if (target[key] === val) return true;
        self._setter(key, val, target[key]);
        target[key] = val;
        return true;
      }
    };
    this._obj = new Proxy(obj, handler);
    return this._obj;
  }
}
