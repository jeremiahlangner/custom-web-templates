import { Shared } from "../providers/shared";
import { Application } from "../providers/application";

export class ComponentService {
  _application: Application;
  _hashes: string[] = [];

  constructor() {
    Shared.getProvider("Application").then((app) => {
      this._application = app;
    });
  }

  hash() {
    let s = "";
    while (_hashes.find(s)) {
      s = (Math.random() + 1).toString(36).substring(7);
    }
    this._hashes.push(s);
    return s;
  }

  delete(hash) {}

  // also identifiable as "move"
  insert(hash) {}
}
