export abstract class Shared {
  static _providers: { [name: string]: Promise<any> } = {
    Application: Promise.resolve((window as any).vcdcApp),
  };
  static _services: { [name: string]: Promise<any> } = {
    Component: Promise.resolve(
      (window as any).vcdcApp.services.ComponentService
    ),
    Observed: Promise.resolve((window as any).vcdcApp.services.Observed),
  };

  static async getProvider(name: string) {
    return await Shared._providers[name];
  }

  static async getService(name: string) {
    return await Shared._services[name];
  }

  static registerService(service: any) { // TODO: define limited shared service types for singletons
    const key = service.name;
    Shared._services[key] = service;
  }
}
