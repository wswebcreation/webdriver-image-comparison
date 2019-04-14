// @ts-ignore
import {red, yellow} from 'chalk';
import {access, copySync, outputFile, readFileSync} from 'fs-extra';
import {join} from 'path';
import compareImages from '../resemble/compareImages';
import {calculateDprData, getAndCreatePath} from '../helpers/utils';
import {DEFAULT_RESIZE_DIMENSIONS} from '../helpers/constants';
import {determineStatusAddressToolBarRectangles} from './rectangles';
import {RectanglesOutput} from './rectangles.interfaces';
import {CompareOptions, ImageCompareOptions, ImageCompareResult, ResizeDimensions} from './images.interfaces';
import {FullPageScreenshotsData} from './screenshots.interfaces';
import {Executor} from './methods.interface';
import {CompareData} from '../resemble/compare.interfaces';

const {createCanvas, loadImage} = require('canvas');

/**
 * Check if the image exists and create a new baseline image if needed
 */
export async function checkBaselineImageExists(
  actualFilePath: string,
  baselineFilePath: string,
  autoSaveBaseline: boolean,
): Promise<void> {

  return new Promise((resolve, reject) => {
    access(baselineFilePath, error => {
      if (error) {
        if (autoSaveBaseline) {
          try {
            copySync(actualFilePath, baselineFilePath);
            console.log(yellow(`
#####################################################################################
 INFO: 
 Autosaved the image to 
 ${baselineFilePath}
#####################################################################################
`));
          } catch (error) {
            /* istanbul ignore next */
            reject(red(`
#####################################################################################
 Image could not be copied. The following error was thrown: 
 ${error}
#####################################################################################
`));
          }
        } else {
          reject(red(`
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 ${actualFilePath}
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
`));
        }
      }
      resolve();
    });
  });
}

/**
 * Execute the image compare
 */
export async function executeImageCompare(
  executor: Executor,
  options: ImageCompareOptions,
  isViewPortScreenshot: boolean = false,
): Promise<ImageCompareResult | number> {

  // 1. Set some variables
  const {debug, devicePixelRatio, fileName, isAndroidNativeWebScreenshot, platformName} = options;
  const {
    actualFolder,
    autoSaveBaseline,
    baselineFolder,
    browserName,
    deviceName,
    diffFolder,
    isMobile,
    savePerInstance,
  } = options.folderOptions;
  let diffFilePath;
  const imageCompareOptions = {...options.compareOptions.wic, ...options.compareOptions.method};

  // 2. 	Create all needed folders
  const createFolderOptions = {browserName, deviceName, isMobile, savePerInstance};
  const actualFolderPath = getAndCreatePath(actualFolder, createFolderOptions);
  const baselineFolderPath = getAndCreatePath(baselineFolder, createFolderOptions);
  const actualFilePath = join(actualFolderPath, fileName);
  const baselineFilePath = join(baselineFolderPath, fileName);

  // 3. 	Check if there is a baseline image, and determine if it needs to be auto saved or not
  await checkBaselineImageExists(actualFilePath, baselineFilePath, autoSaveBaseline);

  // 4. 	Prepare the compare
  // 4a.	Determine the ignore options
  const resembleIgnoreDefaults = ['alpha', 'antialiasing', 'colors', 'less', 'nothing'];
  const ignore = resembleIgnoreDefaults.filter(option =>
    Object.keys(imageCompareOptions).find(key =>
      // @ts-ignore
      key.toLowerCase().includes(option) && imageCompareOptions[key]
    ));

  // 4b.	Determine the ignore rectangles for the blockouts
  const blockOut = 'blockOut' in imageCompareOptions ? imageCompareOptions.blockOut : [];
  const statusAddressToolBarOptions = {
    isMobile,
    isViewPortScreenshot,
    platformName,
    isAndroidNativeWebScreenshot,
    blockOutStatusBar: imageCompareOptions.blockOutStatusBar,
    blockOutToolBar: imageCompareOptions.blockOutToolBar,
  };

  const ignoreRectangles = blockOut.concat(
    // 4c.	Add the mobile rectangles that need to be ignored
    await determineStatusAddressToolBarRectangles(executor, statusAddressToolBarOptions)
  ).map(
    // 4d.	Make sure all the rectangles are equal to the dpr for the screenshot
    rectangles => calculateDprData(rectangles, devicePixelRatio)
  );

  // 4e.		Add the ignore transparant pixel
  const ignoreTransparentPixel = imageCompareOptions.ignoreTransparentPixel;

  const compareOptions: CompareOptions = {ignore, ignoreRectangles, ignoreTransparentPixel};

  // 5.		Execute the compare and retrieve the data
  const data: CompareData = await compareImages(readFileSync(baselineFilePath), readFileSync(actualFilePath), compareOptions);
  const misMatchPercentage = imageCompareOptions.rawMisMatchPercentage ?
    data.rawMisMatchPercentage :
    Number(data.rawMisMatchPercentage.toFixed(2));

  // 6.		Save the diff when there is a diff or when debug mode is on
  if (misMatchPercentage > imageCompareOptions.saveAboveTolerance || debug) {
    const isDifference = misMatchPercentage > imageCompareOptions.saveAboveTolerance;
    const isDifferenceMessage = 'WARNING:\n There was a difference. Saved the difference to';
    const debugMessage = 'INFO:\n Debug mode is enabled. Saved the debug file to:';
    const diffFolderPath = getAndCreatePath(diffFolder, createFolderOptions);
    diffFilePath = join(diffFolderPath, fileName);

    await saveBase64Image(Buffer.from(data.getBuffer()).toString('base64'), diffFilePath);

    console.log(yellow(`
#####################################################################################
 ${isDifference ? isDifferenceMessage : debugMessage}
 ${diffFilePath}
#####################################################################################
`));
  }

  // 7. 	Return the comparison data
  return imageCompareOptions.returnAllCompareData ? {
    fileName,
    folders: {
      actual: actualFilePath,
      baseline: baselineFilePath,
      ...(diffFilePath ? {diff: diffFilePath} : {}),
    },
    misMatchPercentage,
  } : misMatchPercentage;
}

/**
 * Make a cropped image with Canvas
 */
export async function makeCroppedBase64Image(
  base64Image: string,
  rectangles: RectanglesOutput,
  resizeDimensions: number | ResizeDimensions = DEFAULT_RESIZE_DIMENSIONS,
): Promise<string> {
  /**
   * This is in for backwards compatibility, it will be removed in the future
   */
  let resizeValues;
  if (typeof resizeDimensions === 'number') {
    resizeValues = {
      top: resizeDimensions,
      right: resizeDimensions,
      bottom: resizeDimensions,
      left: resizeDimensions,
    };

    console.log(yellow(`
#####################################################################################
 WARNING:
 THE 'resizeDimensions' NEEDS TO BE AN OBJECT LIKE
 {
    top: 10,
    right: 20,
    bottom: 15,
    left: 25,
 }
 NOW IT WILL BE DEFAULTED TO
  {
    top: ${resizeDimensions},
    right: ${resizeDimensions},
    bottom: ${resizeDimensions},
    left: ${resizeDimensions},
 }
 THIS IS DEPRACATED AND WILL BE REMOVED IN A NEW MAJOR RELEASE
#####################################################################################
`));
  } else {
    resizeValues = resizeDimensions;
  }

  const {top, right, bottom, left} = {...DEFAULT_RESIZE_DIMENSIONS, ...resizeValues};
  const {height, width, x, y} = rectangles;
  const canvasWidth = width + left + right;
  const canvasHeight = height + top + bottom;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const image = await loadImage(`data:image/png;base64,${base64Image}`);
  const ctx = canvas.getContext('2d');

  let sourceXStart = x - left;
  let sourceYStart = y - top;

  if (sourceXStart < 0) {
    console.log(yellow(`
#####################################################################################
 THE RESIZE DIMENSION LEFT '${left}' MADE THE CROPPING GO OUT OF
 THE IMAGE BOUNDARIES RESULTING IN AN IMAGE STARTPOSITION '${sourceXStart}'.
 THIS HAS BEEN DEFAULTED TO '0'
#####################################################################################
`));
    sourceXStart = 0;
  }

  if (sourceYStart < 0) {
    console.log(yellow(`
#####################################################################################
 THE RESIZE DIMENSION LEFT '${top}' MADE THE CROPPING GO OUT OF
 THE IMAGE BOUNDARIES RESULTING IN AN IMAGE STARTPOSITION '${sourceYStart}'.
 THIS HAS BEEN DEFAULTED TO '0'
#####################################################################################
`));
    sourceYStart = 0;
  }

  ctx.drawImage(image,
    // Start at x/y pixels from the left and the top of the image (crop)
    sourceXStart, sourceYStart,
    // 'Get' a (w * h) area from the source image (crop)
    canvasWidth, canvasHeight,
    // Place the result at 0, 0 in the canvas,
    0, 0,
    // With as width / height: 100 * 100 (scale)
    canvasWidth, canvasHeight
  );

  return canvas.toDataURL().replace(/^data:image\/png;base64,/, '');
}

/**
 * Make a full page image with Canvas
 */
export async function makeFullPageBase64Image(screenshotsData: FullPageScreenshotsData): Promise<string> {
  const amountOfScreenshots = screenshotsData.data.length;
  const {fullPageHeight: canvasHeight, fullPageWidth: canvasWidth} = screenshotsData;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Load all the images
  for (let i = 0; i < amountOfScreenshots; i++) {
    const {canvasYPosition, imageHeight, imageWidth, imageYPosition} = screenshotsData.data[i];
    const image = await loadImage(`data:image/png;base64,${screenshotsData.data[i].screenshot}`);

    ctx.drawImage(image,
      // Start at x/y pixels from the left and the top of the image (crop)
      0, imageYPosition,
      // 0, 0,
      // 'Get' a (w * h) area from the source image (crop)
      imageWidth, imageHeight,
      // Place the result at 0, 0 in the canvas,
      0, canvasYPosition,
      // With as width / height: 100 * 100 (scale)
      imageWidth, imageHeight,
    );
  }

  return canvas.toDataURL().replace(/^data:image\/png;base64,/, '');
}

/**
 * Save the base64 image to a file
 */
export async function saveBase64Image(base64Image: string, filePath: string): Promise<void> {
  return outputFile(filePath, base64Image, 'base64');
}
