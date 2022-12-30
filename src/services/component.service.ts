import { Shared } from '../providers/shared.provider';
import { Application } from '../providers/application.provider';

export class ComponentService {
  _application: Application;
  _hashes: string[] = [];

  constructor() {
    Shared.getProvider('Application').then((app) => {
      this._application = app;
    });
  }

  hash() {
    let s;
    while (this._hashes.find(h => h == s)) {
      s = Math.random().toString(16).substring(2, 15);
    }
    this._hashes.push(s); // change hashes to represent data paths for each component by hash
    return s;
  }

  delete(hash) {
    document.getElementById(hash).remove();
  }

  // also identifiable as "move"
  insert(el: HTMLElement, hash: string, parentHash?: string, siblingHash?: string) {
    el.id = hash;
    if (!parentHash) document.body.appendChild(el);
    if (!siblingHash) document.getElementById(parentHash)?.appendChild(el);
    document.getElementById(siblingHash);
  }
}
