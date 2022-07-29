import { join } from 'path';
import { DESKTOP, PLATFORMS } from './constants';
import { ensureDirSync } from 'fs-extra';
import {
  FormatFileDefaults,
  FormatFileNameOptions,
  GetAddressBarShadowPaddingOptions,
  GetAndCreatePathOptions,
  GetToolBarShadowPaddingOptions,
  ScreenshotSize,
} from './utils.interfaces';

/**
 * Get and create a folder
 */
export function getAndCreatePath(folder: string, options: GetAndCreatePathOptions): string {
  const { browserName, deviceName, isMobile, savePerInstance } = options;
  const instanceName = (isMobile ? deviceName : `${DESKTOP}_${browserName}`).replace(/ /g, '_');
  const subFolder = savePerInstance ? instanceName : '';
  const folderName = join(folder, subFolder);

  ensureDirSync(folderName);

  return folderName;
}

/**
 * Format the filename
 */
export function formatFileName(options: FormatFileNameOptions): string {
  const defaults: FormatFileDefaults = {
    browserName: options.browserName,
    browserVersion: options.browserVersion,
    deviceName: options.deviceName,
    dpr: options.devicePixelRatio,
    height: options.isMobile ? options.screenHeight : options.outerHeight,
    logName: options.logName,
    mobile: options.isMobile && options.isTestInBrowser ? options.browserName : options.isMobile ? 'app' : '',
    name: options.name,
    platformName: options.platformName,
    platformVersion: options.platformVersion,
    tag: options.tag,
    width: options.isMobile ? options.screenWidth : options.outerWidth,
  };

  let fileName = options.formatImageName;

  Object.keys(defaults).forEach((value: string) => {
    // @ts-ignore
    // @TODO: Fix this in a proper way
    fileName = fileName.replace(`{${value}}`, defaults[value]);
  });

  return `${fileName.replace(/ /g, '_')}.png`;
}

/**
 * Checks if it is mobile
 */
export function checkIsMobile(platformName: string): boolean {
  return checkIsAndroid(platformName) || checkIsIos(platformName);
}

/**
 * Checks if the os is Android
 */
export function checkIsAndroid(platformName: string): boolean {
  return platformName.toLowerCase() === PLATFORMS.ANDROID;
}

/**
 * Checks if the os is IOS
 */
export function checkIsIos(platformName: string): boolean {
  return platformName.toLowerCase() === PLATFORMS.IOS;
}

/**
 * Checks if the test is executed in a browser
 */
export function checkTestInBrowser(browserName: string): boolean {
  return browserName !== '';
}

/**
 * Checks if the test is executed in a browser on a mobile phone
 */
export function checkTestInMobileBrowser(platformName: string, browserName: string): boolean {
  return checkIsMobile(platformName) && checkTestInBrowser(browserName);
}

/**
 * Checks if this is a native webscreenshot on android
 */
export function checkAndroidNativeWebScreenshot(platformName: string, nativeWebscreenshot: boolean): boolean {
  return (checkIsAndroid(platformName) && nativeWebscreenshot) || false;
}

/**
 * Checks if this is an Android chromedriver screenshot
 */
export function checkAndroidChromeDriverScreenshot(platformName: string, nativeWebScreenshot: boolean): boolean {
  return checkIsAndroid(platformName) && !checkAndroidNativeWebScreenshot(platformName, nativeWebScreenshot);
}

/**
 * Get the address bar shadow padding. This is only needed for Android native webscreenshot and iOS
 */
export function getAddressBarShadowPadding(options: GetAddressBarShadowPaddingOptions): number {
  const { platformName, browserName, nativeWebScreenshot, addressBarShadowPadding, addShadowPadding } = options;
  const isTestInMobileBrowser = checkTestInMobileBrowser(platformName, browserName);
  const isAndroidNativeWebScreenshot = checkAndroidNativeWebScreenshot(platformName, nativeWebScreenshot);
  const isAndroid = checkIsAndroid(platformName);
  const isIos = checkIsIos(platformName);

  return isTestInMobileBrowser && ((isAndroidNativeWebScreenshot && isAndroid) || isIos) && addShadowPadding
    ? addressBarShadowPadding
    : 0;
}

/**
 * Get the tool bar shadow padding. This is only needed for iOS
 */
export function getToolBarShadowPadding(options: GetToolBarShadowPaddingOptions): number {
  const { platformName, browserName, toolBarShadowPadding, addShadowPadding } = options;

  return checkTestInMobileBrowser(platformName, browserName) && checkIsIos(platformName) && addShadowPadding
    ? checkIsIos(platformName)
      ? // The 9 extra are for iOS home bar for iPhones with a notch or iPads with a home bar
        toolBarShadowPadding + 9
      : toolBarShadowPadding
    : 0;
}

/**
 * Calculate the data based on the device pixel ratio
 */
export function calculateDprData<T>(data: T, devicePixelRatio: number): T {
  // @ts-ignore
  // @TODO: need to figure this one out
  Object.keys(data).map((key) => (data[key] = typeof data[key] === 'number' ? data[key] * devicePixelRatio : data[key]));

  return data;
}

/**
 * Wait for an amount of milliseconds
 */
export async function waitFor(milliseconds: number): Promise<void> {
  /* istanbul ignore next */
  return new Promise((resolve) => setTimeout(() => resolve(), milliseconds));
}

/**
 * Get the size of a screenshot in pixels without the device pixel ratio
 */
export function getScreenshotSize(screenshot: string, devicePixelRation = 1): ScreenshotSize {
  return {
    height: Buffer.from(screenshot, 'base64').readUInt32BE(20) / devicePixelRation,
    width: Buffer.from(screenshot, 'base64').readUInt32BE(16) / devicePixelRation,
  };
}
