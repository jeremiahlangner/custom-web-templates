type VCDCComponentTypes = 'container' | 'row' | 'column' | 'text' | 'html' | 'button' | 'input' | 'radio' | 'app';

interface VCDCConfig {
  type: VCDCComponentTypes,
  layout: any[], // TODO: can be any VCDCConfig or extended VCDCConfig
  value?: string,

}

interface ContainerConfig extends VCDCConfig {
  type: 'container',
  template: string,
}

interface RowConfig extends VCDCConfig {
  type: 'row',
  templat: string
}

interface ColumnConfig extends VCDCConfig {
  type: 'column',
  template: string
}

export {
  VCDCConfig,
  VCDCComponentTypes,
  ContainerConfig,
  RowConfig,
  ColumnConfig
};
