import BaseClass from './base';
import saveScreen from './commands/saveScreen';
import saveElement from './commands/saveElement';
import saveFullPageScreen from './commands/saveFullPageScreen';
import checkScreen from './commands/checkScreen';
import checkElement from './commands/checkElement';
import checkFullPageScreen from './commands/checkFullPageScreen';
import {ClassOptions} from './helpers/options.interface';
import {ImageCompareResult} from './methods/images.interfaces';

export {
  BaseClass,
  ClassOptions,
  ImageCompareResult,
  saveScreen,
  saveElement,
  saveFullPageScreen,
  checkScreen,
  checkElement,
  checkFullPageScreen,
};
