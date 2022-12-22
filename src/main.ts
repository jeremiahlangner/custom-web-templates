import { Observed } from './services/observed.service';

class App {
  changeList = [];

  constructor() {
    window.vcdc = {
      services: {},
      app: {}
    };

    const data = new Observed({}, () => void 0, this.changes);
    this.registerServices(); 
  }

  changes() {
    // for each component renderer, the main data observer/service will need
    // to maintain a registry of functions to execute when the Proxy recongnizes
    // a change in the data; 
    //
    // proxy can cause execution on observation, or on change.
    for(const fn of changeList) {
      fn();
    }
  }

  registerServices() {
    window.vcdc.services = {
      storage: new StorageService(),
    };
  }
}
const app = new App();

