import {EnrichedInstanceData, InstanceData} from '../methods/instanceData.interfaces';

export interface BeforeScreenshotOptions {
  // The instance data
  instanceData: InstanceData;
  // The padding that needs to be added to the address bar on iOS and Android to do a proper cutout of the the viewport.
  addressBarShadowPadding: number;
  // Disable all css animations
  disableCSSAnimation: boolean;
  // Hide all scrollbars
  noScrollBars: boolean;
  // The padding that needs to be added to the tool bar on iOS and Android
  toolBarShadowPadding: number;
}

export interface BeforeScreenshotResult extends EnrichedInstanceData {};
