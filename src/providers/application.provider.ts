export abstract class Application {
  static _app: any = {};
  static _data: any = {};

  get app() {
    return this._app;
  }
  set app(app: any) {
    Application._app = app;
    this.window["vcdcApp"] = app;
  }
}
