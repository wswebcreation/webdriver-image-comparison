import getElementPositionTopWindow from '../clientSideScripts/getElementPositionTopWindow';
import getElementPositionTopDom from '../clientSideScripts/getElementPositionTopDom';
import { getElementPositionTopScreenNativeMobile } from '../clientSideScripts/getElementPositionTopScreenNativeMobile';
import { OFFSETS } from '../helpers/constants';
import { Executor } from './methods.interface';
import { ElementPosition } from '../clientSideScripts/elementPosition.interfaces';
import getAndroidStatusAddressToolBarHeight from '../clientSideScripts/getAndroidStatusAddressToolBarHeight';
import getIosStatusAddressToolBarHeight from '../clientSideScripts/getIosStatusAddressToolBarHeight';
import { StatusAddressToolBarHeight } from '../clientSideScripts/statusAddressToolBarHeight.interfaces';

/**
 * Get the element position on a Android device
 */
export async function getElementPositionAndroid(
  executor: Executor,
  isNativeWebScreenshot: boolean,
  element: HTMLElement,
): Promise<ElementPosition> {
  // This is the native webscreenshot
  if (isNativeWebScreenshot) {
    const { height } = (<StatusAddressToolBarHeight>await executor(getAndroidStatusAddressToolBarHeight, OFFSETS.ANDROID, false))
      .statusAddressBar;

    return executor(getElementPositionTopScreenNativeMobile, height, element);
  }

  // This is the ChromeDriver screenshot
  return executor(getElementPositionTopWindow, element);
}

/**
 * Get the element position on a desktop browser
 *
 * @param {function} executor         The function to execute JS in the browser
 * @param {number}   innerHeight      The inner height of the screen
 * @param {number}   screenshotHeight The screenshot height
 * @param {element}  element          The element
 *
 * @returns {Promise<{
 * 		height: number,
 *    width: number,
 *    x: number,
 *    y: number
 * }>}
 */
export async function getElementPositionDesktop(
  executor: Executor,
  innerHeight: number,
  screenshotHeight: number,
  element: HTMLElement,
): Promise<ElementPosition> {
  if (screenshotHeight > innerHeight) {
    return executor(getElementPositionTopDom, element);
  }

  return executor(getElementPositionTopWindow, element);
}

/**
 * Get the element position on iOS Safari
 */
export async function getElementPositionIos(executor: Executor, element: HTMLElement): Promise<ElementPosition> {
  // Determine status and address bar height
  const { height } = (<StatusAddressToolBarHeight>await executor(getIosStatusAddressToolBarHeight, OFFSETS.IOS)).statusAddressBar;

  return executor(getElementPositionTopScreenNativeMobile, height, element);
}
