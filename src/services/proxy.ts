export class ProxyObj {
  _get: any;
  _set: any;
  _obj: any;

  constructor(getter: any, setter: void, obj) {
    this._get = getter;
    this._set = setter;

    const self = this;
    this._obj = new Proxy(obj, { get: self._get, set: self._set });
    return this._obj;
  }
}
