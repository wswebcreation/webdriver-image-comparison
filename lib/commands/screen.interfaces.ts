import {DefaultOptions} from '../helpers/options.interface';
import {CheckMethodOptions} from './check.interfaces';

export interface SaveScreenOptions {
  wic: DefaultOptions;
  method: SaveScreenMethodOptions;
}

interface SaveScreenMethodOptions {
  // Disable all css animations
  disableCSSAnimation?: boolean;
  // Hide scrollbars, this is optional
  hideScrollBars?: boolean;
}

interface CheckOptions extends SaveScreenMethodOptions, CheckMethodOptions {
}

export interface CheckScreenOptions {
  wic: DefaultOptions;
  method: CheckOptions;
}
