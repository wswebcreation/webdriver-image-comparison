import {executeImageCompare} from '../methods/images';
import {checkIsMobile} from '../helpers/utils';
import saveElement from './saveElement';
import {ImageCompareResult} from '../methods/images.interfaces';
import {Methods} from '../methods/methods.interface';
import {InstanceData} from '../methods/instanceData.interfaces';
import {Folders} from '../base.interface';
import {CheckElementOptions, SaveElementOptions} from './element.interfaces';
import {methodCompareOptions} from '../helpers/options';

/**
 * Compare  an image of the element
 */
export default async function checkElement(
  methods: Methods,
  instanceData: InstanceData,
  folders: Folders,
  element: HTMLElement,
  tag: string,
  checkElementOptions: CheckElementOptions,
): Promise<ImageCompareResult | number> {

  // 1. Take the actual element screenshot and retrieve the needed data
  const saveElementOptions: SaveElementOptions = {
    wic: checkElementOptions.wic,
    method: {
      ...('disableCSSAnimation' in checkElementOptions.method ? {disableCSSAnimation: checkElementOptions.method.disableCSSAnimation} : {}),
      ...('hideScrollBars' in checkElementOptions.method ? {hideScrollBars: checkElementOptions.method.hideScrollBars} : {}),
      ...('resizeDimensions' in checkElementOptions.method ? {resizeDimensions: checkElementOptions.method.resizeDimensions} : {}),
    }
  };
  const {devicePixelRatio, fileName} = await saveElement(methods, instanceData, folders, element, tag, saveElementOptions);

  // 2a. Determine the options
  const compareOptions = methodCompareOptions(checkElementOptions.method);
  const executeCompareOptions = {
    debug: checkElementOptions.wic.debug,
    devicePixelRatio,
    compareOptions: {
      wic: checkElementOptions.wic.compareOptions,
      method: compareOptions,
    },
    fileName,
    folderOptions: {
      autoSaveBaseline: checkElementOptions.wic.autoSaveBaseline,
      actualFolder: folders.actualFolder,
      baselineFolder: folders.baselineFolder,
      diffFolder: folders.diffFolder,
      browserName: instanceData.browserName,
      deviceName: instanceData.deviceName,
      isMobile: checkIsMobile(instanceData.platformName),
      savePerInstance: checkElementOptions.wic.savePerInstance,
    },
    isAndroidNativeWebScreenshot: instanceData.nativeWebScreenshot,
    platformName: instanceData.platformName,
  };

  // 2b Now execute the compare and return the data
  return executeImageCompare(methods.executor, executeCompareOptions);
}
