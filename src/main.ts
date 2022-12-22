import { Observed } from './services/observed.service';

class App {
  serviceWorker: Worker;
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

