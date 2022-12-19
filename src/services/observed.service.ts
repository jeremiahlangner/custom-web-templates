export class Observed {
  _obj: any;
  _getter: (key: string) => unknown;
  _setter: (key: string, val: unknown, old: unknown) => void;

  constructor(getter: any, setter: any, obj) {
    const self = this;
    const handler = {
      get(target, key) {
        if (typeof target[key] === 'object' && target[key] !== null) {
          return new Proxy(target[key], handler);
        } else {
          self._getter(key);
          return target[key];
        }
      },
      set(target, key, val) {
        if (target[key] === val) return;
        self._setter(key, val, target[key]);
        target[key] = val;
        return;
      }
    };
    this._obj = new Proxy(obj, handler);
    return this._obj;
  }
}
