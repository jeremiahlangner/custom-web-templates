export class ProxyObj {
  _obj: any;

  constructor(getter: any, setter: any, obj) {
    const handler = {
      get(target, key) {
        getter(target, key);
        return target[key];
      },
      set(target, key, val) {
        if (typeof val === "object") {
          target[key] = new Proxy(val, this);
        } else {
          setter(target, key, val);
          target[key] = val;
          return true;
        }
      },
    };
    this._obj = new Proxy(obj, handler);
    return this._obj;
  }
}
