import { DefaultOptions } from '../helpers/options.interface';
import { CheckMethodOptions } from './check.interfaces';

export interface SaveScreenOptions {
  wic: DefaultOptions;
  method: SaveScreenMethodOptions;
}

export interface SaveScreenMethodOptions {
  // Disable all css animations
  disableCSSAnimation?: boolean;
  // Hide scrollbars, this is optional
  hideScrollBars?: boolean;
  // Elements that need to be hidden (visibility: hidden) before saving a screenshot
  hideElements?: HTMLElement[];
  // Elements that need to be removed (display: none) before saving a screenshot
  removeElements?: HTMLElement[];
}

export interface CheckScreenMethodOptions extends SaveScreenMethodOptions, CheckMethodOptions {}

export interface CheckScreenOptions {
  wic: DefaultOptions;
  method: CheckScreenMethodOptions;
}
