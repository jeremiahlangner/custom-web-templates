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

  async getProvider(name: string) {
    return await Shared._providers[name];
  }

  async getService(name: string) {
    return await Shared._services[name];
  }
}
