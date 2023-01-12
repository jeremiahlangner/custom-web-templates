export abstract class Application {
  static _app: any = {};
  static _data: any = {};
  static _views;
  static _components;
  static _rules;

  get app() {
    return Application._app;
  }
  set app(app: any) {
    Application._app = app;
  }

  getByPath(path: string) { // eslint-disable-line
    const parts = path.split('.');
    const getData = (obj: any) => { // eslint-disable-line
      for (let i = 0; i < parts.length; i++) {
        if (parts[i] === '$') continue;
        if (obj[parts[i]] && i === parts.length - 1)
          return obj[parts[i]];
        obj = obj[parts[i]];
      }
    };
    if (path === '$') return Application._data;
    return getData(Application._data);
  }
}
