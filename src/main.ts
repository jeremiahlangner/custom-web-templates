import { Observed } from './services/observed.service';
import { Shared } from './providers/shared.provider';

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
    // components must individually check if any changes have occurred only on their immediate level.
    for(const fn of changeList) {
      fn();
    }
  }

  registerServices() {
    const services = {
      ApiService: new ApiService(),
      StorageService: new StorageService(),
    };
    for (const service in services) {
      Shared.registerService(services[service]);
    }
  }
}

const app = new App();

