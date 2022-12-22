import { Observed } from './services/observed.service';
import { Shared } from './providers/shared.provider';
import { ApiService } from './services/api.service';
import { Storage } from './services/storage.service';
import { ComponentService } from './services/component.service';

class App {
  changeList = [];

  constructor() {
    (window as any).vcdc = {
      services: {},
      components: {},
      app: {}
    };

    const data = new Observed({}, () => void 0, this.changes);
    this.registerServices();
    this.registerComponents();
  }

  changes() {
    // for each component renderer, the main data observer/service will need
    // to maintain a registry of functions to execute when the Proxy recongnizes
    // a change in the data; 
    //
    // proxy can cause execution on observation, or on change.
    // components must individually check if any changes have occurred only on their immediate level.
    for (const fn of this.changeList) {
    }
  }

  async registerComponents() {
    const apiService = await Shared.getService('ApiService');
    const components = await apiService.request({ url: './assets/configs/components.json' });
    console.log(components);
  }

  registerServices() {
    Shared.registerServices({
      ApiService: new ApiService(),
      Storage: new Storage(),
      ComponentService: new ComponentService(),
    });
  }
}

const app = new App();

