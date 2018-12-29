import {DefaultOptions} from '../helpers/options.interface';
import {ResizeDimensions} from '../methods/images.interfaces';
import {CheckMethodOptions} from './check.interfaces';

export interface SaveElementOptions {
  wic: DefaultOptions;
  method: SaveElementMethodOptions;
}

export interface SaveElementMethodOptions {
  // The padding that needs to be added to the address bar on iOS and Android
  addressBarShadowPadding?: number;
  // Disable all css animations
  disableCSSAnimation?: boolean;
  // Hide all scrollbars
  hideScrollBars?: boolean;
  // The resizeDimensions, for backwards compatibility this will be an object or a number
  resizeDimensions?: ResizeDimensions | number;
  // The padding that needs to be added to the tool bar on iOS and Android
  toolBarShadowPadding?: number;
}

interface CheckOptions extends SaveElementMethodOptions, CheckMethodOptions {
}

export interface CheckElementOptions {
  wic: DefaultOptions;
  method: CheckOptions;
}
