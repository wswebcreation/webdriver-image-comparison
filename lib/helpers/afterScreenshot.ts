import hideScrollBars from '../clientSideScripts/hideScrollbars';
import removeCustomCss from '../clientSideScripts/removeCustomCss';
import {CUSTOM_CSS_ID} from './constants';
import {checkIsMobile, formatFileName, getAndCreatePath} from './utils';
import {saveBase64Image} from '../methods/images';
import {join} from 'path';
import {Executor} from '../methods/methods.interface';
import {AfterScreenshotOptions, ScreenshotOutput} from './afterScreenshot.interfaces';
import hideRemoveElements from '../clientSideScripts/hideRemoveElements';

/**
 * Methods that need to be executed after a screenshot has been taken
 * to set all back to the original state
 */
export default async function afterScreenshot(executor: Executor, options: AfterScreenshotOptions): Promise<ScreenshotOutput> {
  const {
    actualFolder,
    base64Image,
    disableCSSAnimation,
    fileName: fileNameOptions,
    filePath,
    hideElements,
    hideScrollBars: noScrollBars,
    platformName,
    removeElements,
  } = options;

  // Get the path
  const path = getAndCreatePath(actualFolder, filePath);

  // Get the filePath
  const fileName = formatFileName(fileNameOptions);

  // Save the element
  await saveBase64Image(base64Image, join(path, fileName));

  // Show the scrollbars again
  /* istanbul ignore else */
  if (noScrollBars) {
    await executor(hideScrollBars, !noScrollBars);
  }

  // Show elements again
  /* istanbul ignore else */
  if (hideElements.length > 0 || removeElements.length > 0) {
    await executor(hideRemoveElements, {hide: hideElements, remove: removeElements}, false);
  }

  // Remove the custom set css
  /* istanbul ignore else */
  if (disableCSSAnimation || checkIsMobile(platformName)) {
    await executor(removeCustomCss, CUSTOM_CSS_ID);
  }

  // Return the needed data
  return {
    fileName,
    path,
    devicePixelRatio: fileNameOptions.devicePixelRatio,
  };
}
