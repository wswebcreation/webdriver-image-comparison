import {DefaultOptions} from '../helpers/options.interface';
import {ResizeDimensions} from '../methods/images.interfaces';
import {CheckMethodOptions} from './check.interfaces';

export interface SaveFullPageOptions {
  wic: DefaultOptions;
  method: SaveFullPageMethodOptions;
}

interface SaveFullPageMethodOptions {
  // The padding that needs to be added to the address bar on iOS and Android
  addressBarShadowPadding?: number;
  // Disable all css animations
  disableCSSAnimation?: boolean;
  // Hide all scrollbars
  hideScrollBars?: boolean;
  // The amount of milliseconds to wait for a new scroll
  fullPageScrollTimeout?:number;
  // The resizeDimensions, for backwards compatibility this will be an object or a number
  resizeDimensions?: ResizeDimensions | number;
  // The padding that needs to be added to the tool bar on iOS and Android
  toolBarShadowPadding?: number;
}

interface CheckOptions extends SaveFullPageMethodOptions, CheckMethodOptions {
}

export interface CheckFullPageOptions {
  wic: DefaultOptions;
  method: CheckOptions;
}
