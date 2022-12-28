export abstract class Application {
  static _app: any = {};
  static _data: any = {};

  get app() {
    return this._app;
  }
  set app(app: any) {
    Application._app = app;
    window["vcdcApp"] = app;
  }

  getByPath(obj: any, path: string) { // eslint-disable-line
    const keys = path.split('.');
    for (const key of keys) {
      if (!obj[key]) return undefined;
      obj = obj[key];
    }
    return obj;
  }
}
