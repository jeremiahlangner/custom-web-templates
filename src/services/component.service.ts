import { Shared } from '../providers/shared.provider';

export class ComponentService {
  _hashPaths: { [key: string]: string } = {};

  constructor() {
  }

  hash(): string {
    let h: string = ''; // eslint-disable-line
    while (this._hashPaths[h])
      h = Math.random().toString(16).substring(2, 15);
    this._hashPaths[h] = '';
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
