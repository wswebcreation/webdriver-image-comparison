import { red, yellow } from 'chalk';
import { access, copySync, outputFile, readFileSync } from 'fs-extra';
import { join } from 'path';
import { createCanvas, loadImage } from 'canvas';
import compareImages from '../resemble/compareImages';
import { calculateDprData, getAndCreatePath, getScreenshotSize } from '../helpers/utils';
import { DEFAULT_RESIZE_DIMENSIONS } from '../helpers/constants';
import { determineStatusAddressToolBarRectangles } from './rectangles';
import {
  CompareOptions,
  CroppedBase64Image,
  IgnoreBoxes,
  ImageCompareOptions,
  ImageCompareResult,
  RotateBase64ImageOptions,
} from './images.interfaces';
import { FullPageScreenshotsData } from './screenshots.interfaces';
import { Executor } from './methods.interface';
import { CompareData } from '../resemble/compare.interfaces';
import { LogLevel } from '../helpers/options.interface';

/**
 * Check if the image exists and create a new baseline image if needed
 */
export async function checkBaselineImageExists(
  actualFilePath: string,
  baselineFilePath: string,
  autoSaveBaseline: boolean,
  logLevel: LogLevel,
): Promise<void> {
  return new Promise((resolve, reject) => {
    access(baselineFilePath, (error) => {
      if (error) {
        if (autoSaveBaseline) {
          try {
            copySync(actualFilePath, baselineFilePath);
            if (logLevel === LogLevel.info) {
              console.log(
                yellow(`
#####################################################################################
 INFO:
 Autosaved the image to
 ${baselineFilePath}
#####################################################################################
`),
              );
            }
          } catch (error) {
            /* istanbul ignore next */
            reject(
              red(`
#####################################################################################
 Image could not be copied. The following error was thrown:
 ${error}
#####################################################################################
`),
            );
          }
        } else {
          reject(
            red(`
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 ${actualFilePath}
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
`),
          );
        }
      }
      resolve();
    });
  });
}

/**
 * Make a cropped image with Canvas
 */
export async function makeCroppedBase64Image({
  base64Image,
  devicePixelRatio,
  isLandscape,
  logLevel,
  rectangles,
  resizeDimensions = DEFAULT_RESIZE_DIMENSIONS,
}: CroppedBase64Image): Promise<string> {
  // Determine if the image is rotated
  const { height: screenshotHeight, width: screenshotWidth } = getScreenshotSize(base64Image, devicePixelRatio);
  const isRotated = isLandscape && screenshotHeight > screenshotWidth;
  // If so we need to rotate is -90 degrees
  const newBase64Image = isRotated
    ? await rotateBase64Image({ base64Image, degrees: -90, newHeight: screenshotWidth, newWidth: screenshotHeight })
    : base64Image;
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
    if (logLevel === LogLevel.debug || logLevel === LogLevel.warn) {
      console.log(
        yellow(`
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
`),
      );
    }
  } else {
    resizeValues = resizeDimensions;
  }

  const { top, right, bottom, left }: { top: number; right: number; bottom: number; left: number } = {
    ...DEFAULT_RESIZE_DIMENSIONS,
    ...resizeValues,
  };
  const { height, width, x, y } = rectangles;
  const canvasWidth = width + left + right;
  const canvasHeight = height + top + bottom;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const image = await loadImage(`data:image/png;base64,${newBase64Image}`);
  const ctx = canvas.getContext('2d');

  let sourceXStart = x - left;
  let sourceYStart = y - top;

  if (sourceXStart < 0) {
    if (logLevel === LogLevel.debug || logLevel === LogLevel.warn) {
      console.log(
        yellow(`
#####################################################################################
 THE RESIZE DIMENSION LEFT '${left}' MADE THE CROPPING GO OUT OF
 THE IMAGE BOUNDARIES RESULTING IN AN IMAGE STARTPOSITION '${sourceXStart}'.
 THIS HAS BEEN DEFAULTED TO '0'
#####################################################################################
`),
      );
    }
    sourceXStart = 0;
  }

  if (sourceYStart < 0) {
    if (logLevel === LogLevel.debug || logLevel === LogLevel.warn) {
      console.log(
        yellow(`
#####################################################################################
 THE RESIZE DIMENSION LEFT '${top}' MADE THE CROPPING GO OUT OF
 THE IMAGE BOUNDARIES RESULTING IN AN IMAGE STARTPOSITION '${sourceYStart}'.
 THIS HAS BEEN DEFAULTED TO '0'
#####################################################################################
`),
      );
    }
    sourceYStart = 0;
  }

  ctx.drawImage(
    image,
    // Start at x/y pixels from the left and the top of the image (crop)
    sourceXStart,
    sourceYStart,
    // 'Get' a (w * h) area from the source image (crop)
    canvasWidth,
    canvasHeight,
    // Place the result at 0, 0 in the canvas,
    0,
    0,
    // With as width / height: 100 * 100 (scale)
    canvasWidth,
    canvasHeight,
  );

  return canvas.toDataURL().replace(/^data:image\/png;base64,/, '');
}

/**
 * Execute the image compare
 */
export async function executeImageCompare(
  executor: Executor,
  options: ImageCompareOptions,
  isViewPortScreenshot = false,
): Promise<ImageCompareResult | number> {
  // 1. Set some variables
  const { devicePixelRatio, fileName, isAndroidNativeWebScreenshot, isHybridApp, isLandscape, logLevel, platformName } = options;
  const { actualFolder, autoSaveBaseline, baselineFolder, browserName, deviceName, diffFolder, isMobile, savePerInstance } =
    options.folderOptions;
  let diffFilePath;
  const imageCompareOptions = { ...options.compareOptions.wic, ...options.compareOptions.method };

  // 2. 	Create all needed folders
  const createFolderOptions = { browserName, deviceName, isMobile, savePerInstance };
  const actualFolderPath = getAndCreatePath(actualFolder, createFolderOptions);
  const baselineFolderPath = getAndCreatePath(baselineFolder, createFolderOptions);
  const actualFilePath = join(actualFolderPath, fileName);
  const baselineFilePath = join(baselineFolderPath, fileName);

  // 3. 	Check if there is a baseline image, and determine if it needs to be auto saved or not
  await checkBaselineImageExists(actualFilePath, baselineFilePath, autoSaveBaseline, logLevel);

  // 4. 	Prepare the compare
  // 4a.	Determine the ignore options
  const resembleIgnoreDefaults = ['alpha', 'antialiasing', 'colors', 'less', 'nothing'];
  const ignore = resembleIgnoreDefaults.filter((option) =>
    Object.keys(imageCompareOptions).find(
      (key) =>
        // @ts-ignore
        key.toLowerCase().includes(option) && imageCompareOptions[key],
    ),
  );

  // 4b.	Determine the ignore rectangles for the blockouts
  const blockOut = 'blockOut' in imageCompareOptions ? imageCompareOptions.blockOut : [];
  const statusAddressToolBarOptions = {
    blockOutStatusBar: imageCompareOptions.blockOutStatusBar,
    blockOutToolBar: imageCompareOptions.blockOutToolBar,
    isHybridApp,
    isLandscape,
    isMobile,
    isViewPortScreenshot,
    isAndroidNativeWebScreenshot,
    platformName,
  };

  const ignoredBoxes = blockOut
    .concat(
      // 4c.	Add the mobile rectangles that need to be ignored
      await determineStatusAddressToolBarRectangles(executor, statusAddressToolBarOptions),
    )
    .map(
      // 4d.	Make sure all the rectangles are equal to the dpr for the screenshot
      (rectangles) => {
        return calculateDprData(
          {
            // Adjust for the ResembleJS API
            bottom: rectangles.y + rectangles.height,
            right: rectangles.x + rectangles.width,
            left: rectangles.x,
            top: rectangles.y,
          },
          devicePixelRatio,
        );
      },
    );

  const compareOptions: CompareOptions = {
    ignore,
    ...(ignoredBoxes.length > 0 ? { output: { ignoredBoxes } } : {}),
    scaleToSameSize: imageCompareOptions.scaleImagesToSameSize,
  };

  // 5.		Execute the compare and retrieve the data
  const data: CompareData = await compareImages(readFileSync(baselineFilePath), readFileSync(actualFilePath), compareOptions);
  const misMatchPercentage = imageCompareOptions.rawMisMatchPercentage
    ? data.rawMisMatchPercentage
    : Number(data.rawMisMatchPercentage.toFixed(2));

  // 6.		Save the diff when there is a diff or when debug mode is on
  if (misMatchPercentage > imageCompareOptions.saveAboveTolerance || logLevel === LogLevel.debug) {
    const isDifference = misMatchPercentage > imageCompareOptions.saveAboveTolerance;
    const isDifferenceMessage = 'WARNING:\n There was a difference. Saved the difference to';
    const debugMessage = 'INFO:\n Debug mode is enabled. Saved the debug file to:';
    const diffFolderPath = getAndCreatePath(diffFolder, createFolderOptions);
    diffFilePath = join(diffFolderPath, fileName);

    await saveBase64Image(await addBlockOuts(Buffer.from(data.getBuffer()).toString('base64'), ignoredBoxes), diffFilePath);

    if (logLevel === LogLevel.debug || logLevel === LogLevel.warn) {
      console.log(
        yellow(`
#####################################################################################
 ${isDifference ? isDifferenceMessage : debugMessage}
 ${diffFilePath}
#####################################################################################
`),
      );
    }
  }

  // 7. 	Return the comparison data
  return imageCompareOptions.returnAllCompareData
    ? {
        fileName,
        folders: {
          actual: actualFilePath,
          baseline: baselineFilePath,
          ...(diffFilePath ? { diff: diffFilePath } : {}),
        },
        misMatchPercentage,
      }
    : misMatchPercentage;
}

/**
 * Make a full page image with Canvas
 */
export async function makeFullPageBase64Image(
  screenshotsData: FullPageScreenshotsData,
  { devicePixelRatio, isLandscape }: { devicePixelRatio: number; isLandscape: boolean },
): Promise<string> {
  const amountOfScreenshots = screenshotsData.data.length;
  const { fullPageHeight: canvasHeight, fullPageWidth: canvasWidth } = screenshotsData;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  // Load all the images
  for (let i = 0; i < amountOfScreenshots; i++) {
    const currentScreenshot = screenshotsData.data[i].screenshot;
    // Determine if the image is rotated
    const { height: screenshotHeight, width: screenshotWidth } = getScreenshotSize(currentScreenshot, devicePixelRatio);
    const isRotated = isLandscape && screenshotHeight > screenshotWidth;
    // If so we need to rotate is -90 degrees
    const newBase64Image = isRotated
      ? await rotateBase64Image({
          base64Image: currentScreenshot,
          degrees: -90,
          newHeight: screenshotWidth,
          newWidth: screenshotHeight,
        })
      : currentScreenshot;
    const { canvasYPosition, imageHeight, imageWidth, imageXPosition, imageYPosition } = screenshotsData.data[i];
    const image = await loadImage(`data:image/png;base64,${newBase64Image}`);

    ctx.drawImage(
      image,
      // Start at x/y pixels from the left and the top of the image (crop)
      imageXPosition,
      imageYPosition,
      // 'Get' a (w * h) area from the source image (crop)
      imageWidth,
      imageHeight,
      // Place the result at 0, 0 in the canvas,
      0,
      canvasYPosition,
      // With as width / height: 100 * 100 (scale)
      imageWidth,
      imageHeight,
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

/**
 * Create a canvas with the ignore boxes if they are present
 */
export async function addBlockOuts(screenshot: string, ignoredBoxes: IgnoreBoxes[]): Promise<string> {
  // Create canvas and load image
  const { height, width } = getScreenshotSize(screenshot);
  const canvas = createCanvas(width, height);
  const image = await loadImage(`data:image/png;base64,${screenshot}`);
  const canvasContext = canvas.getContext('2d');

  // Draw the image on canvas
  canvasContext.drawImage(
    image,
    // Start at x/y pixels from the left and the top of the image (crop)
    0,
    0,
    // 'Get' a (w * h) area from the source image (crop)
    width,
    height,
    // Place the result at 0, 0 in the canvas,
    0,
    0,
    // With as width / height: 100 * 100 (scale)
    width,
    height,
  );

  // Loop over all ignored areas and add them to the current canvas
  ignoredBoxes.forEach((ignoredBox) => {
    const { right: ignoredBoxWidth, bottom: ignoredBoxHeight, left: x, top: y } = ignoredBox;
    const ignoreCanvas = createCanvas(ignoredBoxWidth - x, ignoredBoxHeight - y);
    const ignoreContext = ignoreCanvas.getContext('2d');

    // Add a background color to the ignored box
    ignoreContext.globalAlpha = 0.5;
    ignoreContext.fillStyle = '#39aa56';
    ignoreContext.fillRect(0, 0, ignoredBoxWidth - x, ignoredBoxHeight - y);

    // add to canvasContext
    canvasContext.drawImage(ignoreCanvas, x, y);
  });

  // Return the screenshot
  return canvas.toDataURL().replace(/^data:image\/png;base64,/, '');
}

/**
 * Rotate a base64 image
 * Tnx to https://gist.github.com/Zyndoras/6897abdf53adbedf02564808aaab94db
 */
async function rotateBase64Image({ base64Image, degrees, newHeight, newWidth }: RotateBase64ImageOptions): Promise<string> {
  const canvas = createCanvas(newWidth, newHeight);
  const ctx = canvas.getContext('2d');
  const image = await loadImage(`data:image/png;base64,${base64Image}`);

  canvas.width = degrees % 180 === 0 ? image.width : image.height;
  canvas.height = degrees % 180 === 0 ? image.height : image.width;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((degrees * Math.PI) / 180);
  ctx.drawImage(image, image.width / -2, image.height / -2);

  return canvas.toDataURL().replace(/^data:image\/png;base64,/, '');
}
