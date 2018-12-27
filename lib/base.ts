import {join, normalize} from 'path';
import {defaultOptions} from './helpers/options';
import {FOLDERS} from './helpers/constants';
import {Folders} from './base.interface';
import {ClassOptions, DefaultOptions} from './helpers/options.interface';

export default class BaseClass {
  defaultOptions: DefaultOptions;
  folders: Folders;

  constructor(options: ClassOptions) {
    // determine default options
    this.defaultOptions = defaultOptions(options);

    const baselineFolder = normalize(options.baselineFolder || FOLDERS.DEFAULT.BASE);
    const baseFolder = normalize(options.screenshotPath || FOLDERS.DEFAULT.SCREENSHOTS);

    this.folders = {
      actualFolder: join(baseFolder, FOLDERS.ACTUAL),
      baselineFolder,
      diffFolder: join(baseFolder, FOLDERS.DIFF),
    };
  }
}
