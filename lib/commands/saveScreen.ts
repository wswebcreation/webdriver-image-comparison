import {takeBase64Screenshot} from '../methods/screenshots';
import {makeCroppedBase64Image} from '../methods/images';
import beforeScreenshot from '../helpers/beforeScreenshot';
import afterScreenshot from '../helpers/afterScreenshot';
import {determineScreenRectangles} from '../methods/rectangles';
import {Methods} from '../methods/methods.interface';
import {Folders} from '../base.interface';
import {SaveScreenOptions} from './screen.interfaces';
import {BeforeScreenshotOptions, BeforeScreenshotResult} from '../helpers/beforeScreenshot.interface';
import {InstanceData} from '../methods/instanceData.interfaces';
import {AfterScreenshotOptions, ScreenshotOutput} from '../helpers/afterScreenshot.interfaces';
import {RectanglesOutput, ScreenRectanglesOptions} from '../methods/rectangles.interfaces';

/**
 * Saves an image of the viewport of the screen
 */
export default async function saveScreen(
  methods: Methods,
  instanceData: InstanceData,
  folders: Folders,
  tag: string,
  saveScreenOptions: SaveScreenOptions
): Promise<ScreenshotOutput> {

  // 1a. Set some variables
  const {addressBarShadowPadding, formatImageName, savePerInstance, toolBarShadowPadding} = saveScreenOptions.wic;

  // 1b. Set the method options to the right values
  const hideScrollBars: boolean = 'hideScrollBars' in saveScreenOptions.method
    ? saveScreenOptions.method.hideScrollBars
    : saveScreenOptions.wic.hideScrollBars;
  const disableCSSAnimation: boolean = 'disableCSSAnimation' in saveScreenOptions.method
    ? saveScreenOptions.method.disableCSSAnimation
    : saveScreenOptions.wic.disableCSSAnimation;

  // 2.  Prepare the beforeScreenshot
  const beforeOptions: BeforeScreenshotOptions = {
    instanceData,
    addressBarShadowPadding,
    disableCSSAnimation,
    noScrollBars: hideScrollBars,
    toolBarShadowPadding,
  };
  const enrichedInstanceData: BeforeScreenshotResult = await beforeScreenshot(methods.executor, beforeOptions);

  // 3.  Take the screenshot
  const screenshot:string = await takeBase64Screenshot(methods.screenShot);

  // Determine the rectangles
  const screenRectangleOptions: ScreenRectanglesOptions = {
    devicePixelRatio: enrichedInstanceData.dimensions.window.devicePixelRatio,
    innerHeight: enrichedInstanceData.dimensions.window.innerHeight,
    innerWidth: enrichedInstanceData.dimensions.window.innerWidth,
    isAndroidChromeDriverScreenshot: enrichedInstanceData.isAndroidChromeDriverScreenshot,
    isAndroidNativeWebScreenshot: enrichedInstanceData.isAndroidNativeWebScreenshot,
    isIos: enrichedInstanceData.isIos,
  };
  const rectangles: RectanglesOutput = determineScreenRectangles(screenshot, screenRectangleOptions);

  // 4.  Make a cropped base64 image
  const croppedBase64Image: string = await makeCroppedBase64Image(screenshot, rectangles);

  // 5.  The after the screenshot methods
  const afterOptions: AfterScreenshotOptions = {
    actualFolder: folders.actualFolder,
    base64Image: croppedBase64Image,
    hideScrollBars,
    filePath: {
      browserName: enrichedInstanceData.browserName,
      deviceName: enrichedInstanceData.deviceName,
      isMobile: enrichedInstanceData.isMobile,
      savePerInstance,
    },
    fileName: {
      browserName: enrichedInstanceData.browserName,
      deviceName: enrichedInstanceData.deviceName,
      devicePixelRatio: enrichedInstanceData.dimensions.window.devicePixelRatio,
      formatImageName,
      isMobile: enrichedInstanceData.isMobile,
      isTestInBrowser: enrichedInstanceData.isTestInBrowser,
      logName: enrichedInstanceData.logName,
      name: enrichedInstanceData.name,
      outerHeight: enrichedInstanceData.dimensions.window.outerHeight,
      outerWidth: enrichedInstanceData.dimensions.window.outerWidth,
      screenHeight: enrichedInstanceData.dimensions.window.screenHeight,
      screenWidth: enrichedInstanceData.dimensions.window.screenWidth,
      tag,
    },
  };

  // 6.  Return the data
  return afterScreenshot(methods.executor, afterOptions);
}
