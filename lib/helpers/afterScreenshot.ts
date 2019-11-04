// @ts-ignore
import {red, yellow} from 'chalk';
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
    colorToBlack
  } = options;

  // Get/create the path to save image
  const pathForSaving = getAndCreatePath(actualFolder, filePath);
  
  // Format a file name for image
  const savedImageFileName = formatFileName(fileNameOptions);

  // Join path and filename
  const savedImagePath = join(pathForSaving, savedImageFileName);

  let mutatableBase64Image : any;

  const switchColorToBlack = (base64Image: string) => {
    return new Promise((resolve, reject) => {
      const fs = require('fs');
      const originalImagePath = savedImagePath.replace(".png", "-orig.png");  
      const monochromeImagePath = savedImagePath.replace(".png", "-mono.png");
      fs.writeFileSync(originalImagePath, base64Image, { encoding: 'base64' });

      const gm = require('gm');
      const platformBlackThreshold = platformName.toLowerCase().includes("ios") ? "85%" : "100%";
      gm(originalImagePath).blackThreshold(platformBlackThreshold).write(monochromeImagePath, function (error: any) { 
        if (error) {
          console.log(red(`
#####################################################################################
  ⚠️  An error occurred while attempting to convert colors in image to black:
  ❗  ${error}
#####################################################################################
          `))
          if (error.toString().indexOf("gm/convert binaries can't be found")) {
            console.log(red(`
#####################################################################################
  📦  Binaries are missing, install GraphicsMagick
#####################################################################################
            `))
          }
          resolve(base64Image)
        } else {
          const base64ImageConverter = require('base64-img');
          const base64ImageMonochrome = base64ImageConverter.base64Sync(monochromeImagePath).replace("data:image/png;base64,", "");        
          resolve(base64ImageMonochrome);
        }
      });
    });
  }

  // Apply color to black transformation to base64 image data
  if (colorToBlack) { 
    mutatableBase64Image = await switchColorToBlack(base64Image);
  }
  
  // Save the element
  await saveBase64Image(mutatableBase64Image, savedImagePath);

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
    fileName: savedImageFileName,
    path: pathForSaving,
    devicePixelRatio: fileNameOptions.devicePixelRatio,
  };
}
