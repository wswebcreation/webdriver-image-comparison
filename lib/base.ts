import {join, normalize} from 'path';
import {removeSync} from 'fs-extra';
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

    let baselineFolder;
    let baseFolder;

    if (typeof options.baselineFolder === 'function') {
      baselineFolder = options.baselineFolder(options);
    } else {
      baselineFolder = normalize(options.baselineFolder || FOLDERS.DEFAULT.BASE);
    }

    if (typeof options.screenshotPath === 'function') {
      baseFolder = options.screenshotPath(options);
    } else {
      baseFolder = normalize(options.screenshotPath || FOLDERS.DEFAULT.SCREENSHOTS);
    }

    this.folders = {
      actualFolder: join(baseFolder, FOLDERS.ACTUAL),
      baselineFolder,
      diffFolder: join(baseFolder, FOLDERS.DIFF),
    };

    if (options.clearRuntimeFolder) {
      console.log('\n\n\n##############################');
      console.log('!!CLEARING!!');
      console.log('##############################\n\n\n');
      removeSync(this.folders.actualFolder);
      removeSync(this.folders.diffFolder);
    }
  }
}
