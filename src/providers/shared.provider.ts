export abstract class Shared {
  static _providers: { [name: string]: Promise<any> } = {
    Application: Promise.resolve((window as any).vcdcApp),
  };

  async getProvider(name: string) {
    return await Shared._providers[name];
  }
}
