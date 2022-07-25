import { calculateDprData, checkAndroidNativeWebScreenshot, checkIsIos, getScreenshotSize } from '../helpers/utils';
import { getElementPositionAndroid, getElementPositionDesktop, getElementPositionIos } from './elementPosition';
import { OFFSETS } from '../helpers/constants';
import {
  ElementRectangles,
  RectanglesOutput,
  ScreenRectanglesOptions,
  StatusAddressToolBarRectangles,
  StatusAddressToolBarRectanglesOptions,
} from './rectangles.interfaces';
import { Executor } from './methods.interface';
import getIosStatusAddressToolBarHeight from '../clientSideScripts/getIosStatusAddressToolBarHeight';
import getAndroidStatusAddressToolBarHeight from '../clientSideScripts/getAndroidStatusAddressToolBarHeight';

/**
 * Determine the element rectangles on the page / screenshot
 */
export async function determineElementRectangles({
  executor,
  base64Image,
  options,
  element,
}: ElementRectangles): Promise<RectanglesOutput> {
  // Determine screenshot data
  const { devicePixelRatio, innerHeight, isAndroid, isAndroidNativeWebScreenshot, isIos } = options;
  const { height } = getScreenshotSize(base64Image, devicePixelRatio);
  let elementPosition;

  // Determine the element position on the screenshot
  if (isIos) {
    elementPosition = await getElementPositionIos(executor, element);
  } else if (isAndroid) {
    elementPosition = await getElementPositionAndroid(executor, isAndroidNativeWebScreenshot, element);
  } else {
    elementPosition = await getElementPositionDesktop(executor, innerHeight, height, element);
  }

  // Validate if the element is visible
  if (elementPosition.height === 0 || elementPosition.width === 0) {
    let selectorMessage = ' ';
    if (element.selector) {
      selectorMessage = `, with selector "$(${element.selector})",`;
    }
    const message = `The element${selectorMessage}is not visible. The dimensions are ${elementPosition.width}x${elementPosition.height}`;
    throw new Error(message);
  }

  // Determine the rectangles based on the device pixel ratio
  return calculateDprData(
    {
      height: elementPosition.height,
      width: elementPosition.width,
      x: elementPosition.x,
      y: elementPosition.y,
    },
    devicePixelRatio,
  );
}

/**
 * Determine the rectangles of the screen for the screenshot
 */
export function determineScreenRectangles(base64Image: string, options: ScreenRectanglesOptions): RectanglesOutput {
  // Determine screenshot data
  const { devicePixelRatio, innerHeight, innerWidth, isIos, isAndroidChromeDriverScreenshot, isAndroidNativeWebScreenshot } =
    options;
  const { height, width } = getScreenshotSize(base64Image, devicePixelRatio);

  // Determine the width
  const screenshotWidth = isAndroidChromeDriverScreenshot ? width : innerWidth;

  // Determine the rectangles
  return calculateDprData(
    {
      height: isIos || isAndroidNativeWebScreenshot ? height : innerHeight,
      width: screenshotWidth,
      x: 0,
      y: 0,
    },
    devicePixelRatio,
  );
}

/**
 * Determine the rectangles for the mobile devices
 */
export async function determineStatusAddressToolBarRectangles(
  executor: Executor,
  options: StatusAddressToolBarRectanglesOptions,
): Promise<StatusAddressToolBarRectangles> {
  const {
    blockOutStatusBar,
    blockOutToolBar,
    isHybridApp,
    isMobile,
    isViewPortScreenshot,
    platformName,
    isAndroidNativeWebScreenshot,
  } = options;
  const rectangles = [];

  if (
    isViewPortScreenshot &&
    isMobile &&
    (checkAndroidNativeWebScreenshot(platformName, isAndroidNativeWebScreenshot) || checkIsIos(platformName))
  ) {
    const { statusAddressBar, toolBar } = await (checkIsIos(platformName)
      ? executor(getIosStatusAddressToolBarHeight, OFFSETS.IOS)
      : executor(getAndroidStatusAddressToolBarHeight, OFFSETS.ANDROID, isHybridApp));

    if (blockOutStatusBar) {
      rectangles.push(statusAddressBar);
    }

    if (blockOutToolBar) {
      rectangles.push(toolBar);
    }
  }

  return rectangles;
}
