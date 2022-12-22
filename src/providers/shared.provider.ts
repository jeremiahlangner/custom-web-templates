export abstract class Shared {
  static _providers: { [name: string]: Promise<any> } = {
    Application: Promise.resolve((window as any).vcdc),
  };
  static _services: { [name: string]: Promise<any> } = {};

  static async getProvider(name: string) {
    return await Shared._providers[name];
  }

  static load() {
    this._services = (window as any).vcdc.services;
  }

  static async getService(name: string) {
    Shared.load();
    console.log(name, await Shared._services[name]);
    return await Shared._services[name];
  }

  static registerServices(services: { [name: string]: any }) {
    for (const service in services) {
      this.registerService(service, services[service]);
    }
  }

  static registerService(name: string, service: any) { // TODO: define limited shared service types for singletons
    Shared._services[name] = service;
    if ((window as any).vcdc.services[name]) return;
    (window as any).vcdc.services[name] = service;
  }
}
