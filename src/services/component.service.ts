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

  hash(): string {
    let h: string = ''; // eslint-disable-line
    while (this._hashes.find(k => k == h)) {
      h = Math.random().toString(16).substring(2, 15);
    }
    this._hashes.push(h);
    return h;
  }

  delete(hash: string) {
    document.getElementById(hash)?.remove();
  }

  insert(el: HTMLElement, hash: string, parentHash?: string, siblingHash?: string) {
    el.id = hash;
    if (!parentHash) document.body.appendChild(el);
    if (!siblingHash) document.getElementById(parentHash)?.appendChild(el);
    document.getElementById(siblingHash);
  }
}
