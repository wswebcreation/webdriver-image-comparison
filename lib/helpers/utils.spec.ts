import {pathExistsSync, removeSync} from 'fs-extra';
import {join} from 'path';
import {
  checkAndroidChromeDriverScreenshot,
  checkAndroidNativeWebScreenshot,
  checkIsAndroid,
  checkIsIos,
  checkIsMobile,
  checkTestInBrowser, checkTestInMobileBrowser, formatFileName, getAndCreatePath,
} from './utils';
import {FormatFileNameOptions, GetAndCreatePathOptions} from './utils.interfaces';

describe('', () => {

  describe('getAndCreatePath', () => {
    const folder = join(process.cwd(), '/.tmp');

    beforeEach(() => removeSync(folder));

    it('should create the folder and return the folder name for a device that needs to have it\s own folder', () => {
      const options: GetAndCreatePathOptions = {
        browserName: '',
        deviceName: 'deviceName',
        isMobile: true,
        savePerInstance: true,
      };
      const expectedFolderName = join(folder, options.deviceName);

      expect(pathExistsSync(expectedFolderName)).toEqual(false);
      expect(getAndCreatePath(folder, options)).toEqual(expectedFolderName);
      expect(pathExistsSync(expectedFolderName)).toEqual(true);
    });

    it('should create the folder and return the folder name for a browser that needs to have it\s own folder', () => {
      const options: GetAndCreatePathOptions = {
        browserName: 'browser',
        deviceName: '',
        isMobile: false,
        savePerInstance: true,
      };
      const expectedFolderName = join(folder, `desktop_${options.browserName}`);

      expect(pathExistsSync(expectedFolderName)).toEqual(false);
      expect(getAndCreatePath(folder, options)).toEqual(expectedFolderName);
      expect(pathExistsSync(expectedFolderName)).toEqual(true);
    });

    it('should create the folder and return the folder name for a browser', () => {
      const options: GetAndCreatePathOptions = {
        browserName: 'browser',
        deviceName: '',
        isMobile: false,
        savePerInstance: false,
      };

      expect(pathExistsSync(folder)).toEqual(false);
      expect(getAndCreatePath(folder, options)).toEqual(folder);
      expect(pathExistsSync(folder)).toEqual(true);
    });
  });

  describe('formatFileName', () => {
    const formatFileOptions: FormatFileNameOptions = {
      browserName: '',
      deviceName: '',
      devicePixelRatio: 2,
      formatImageName: '',
      isMobile: false,
      isTestInBrowser: true,
      logName: '',
      name: '',
      outerHeight: 768,
      outerWidth: 1366,
      screenHeight: 900,
      screenWidth: 1400,
      tag: 'theTag',
    };

    it('should format a string with all options provided', () => {
      formatFileOptions.formatImageName = '{browserName}-{dpr}-{height}-{logName}-{name}-{tag}-{width}';
      formatFileOptions.browserName = 'chrome';
      formatFileOptions.logName = 'chrome-latest';
      formatFileOptions.name = 'chrome-name';

      expect(formatFileName(formatFileOptions)).toEqual('chrome-2-768-chrome-latest-chrome-name-theTag-1366.png');
    });

    it('should format a string for mobile app', () => {
      formatFileOptions.formatImageName = '{tag}-{mobile}-{dpr}-{width}x{height}';
      formatFileOptions.deviceName = 'iPhoneX';
      formatFileOptions.isMobile = true;
      formatFileOptions.isTestInBrowser = false;

      expect(formatFileName(formatFileOptions)).toEqual('theTag-app-2-1400x900.png');
    });

    it('should format a string for mobile browser', () => {
      formatFileOptions.formatImageName = '{tag}-{mobile}-{dpr}-{width}x{height}';
      formatFileOptions.browserName = 'chrome';
      formatFileOptions.deviceName = 'iPhoneX';
      formatFileOptions.isMobile = true;
      formatFileOptions.isTestInBrowser = true;

      expect(formatFileName(formatFileOptions)).toEqual('theTag-chrome-2-1400x900.png');
    });
  });

  describe('checkIsMobile', () => {
    it('should return false when no platform name is provided', () => {
      expect(checkIsMobile('')).toEqual(false);
    });

    it('should return true when a platform name is provided', () => {
      expect(checkIsMobile('ios')).toEqual(true);
    });
  });

  describe('checkIsAndroid', () => {
    it('should return false when no platform name is provided', () => {
      expect(checkIsAndroid('')).toEqual(false);
    });

    it('should return false when a platform name is provided that is not accepted', () => {
      expect(checkIsAndroid('chrome')).toEqual(false);
    });

    it('should return true when a valid platform name is provided', () => {
      expect(checkIsAndroid('androId')).toEqual(true);
    });
  });

  describe('checkIsIos', () => {
    it('should return false when no platform name is provided', () => {
      expect(checkIsIos('')).toEqual(false);
    });

    it('should return false when a platform name is provided that is not accepted', () => {
      expect(checkIsIos('chrome')).toEqual(false);
    });

    it('should return true when a valid platform name is provided', () => {
      expect(checkIsIos('IoS')).toEqual(true);
    });
  });

  describe('checkTestInBrowser', () => {
    it('should return false when no browser name is provided', () => {
      expect(checkTestInBrowser('')).toEqual(false);
    });

    it('should return true when a browser name is provided', () => {
      expect(checkTestInBrowser('chrome')).toEqual(true);
    });
  });

  describe('checkTestInMobileBrowser', () => {
    it('should return false when no platform name is provided', () => {
      expect(checkTestInMobileBrowser('', 'chrome')).toEqual(false);
    });

    it('should return false when a plaform but no browser name is provided', () => {
      expect(checkTestInMobileBrowser('ios', '')).toEqual(false);
    });

    it('should return true when a plaform and a browser name is provided', () => {
      expect(checkTestInMobileBrowser('ios', 'chrome')).toEqual(true);
    });
  });

  describe('checkAndroidNativeWebScreenshot', () => {
    it('should return false when no platform name is provided', () => {
      expect(checkAndroidNativeWebScreenshot('', false)).toEqual(false);
    });

    it('should return false when iOS and nativeWebscreenshot true is provided', () => {
      expect(checkAndroidNativeWebScreenshot('ios', true)).toEqual(false);
    });

    it('should return false when iOS and nativeWebscreenshot false is provided', () => {
      expect(checkAndroidNativeWebScreenshot('ios', false)).toEqual(false);
    });

    it('should return false when Android and nativeWebscreenshot false is provided', () => {
      expect(checkAndroidNativeWebScreenshot('Android', false)).toEqual(false);
    });

    it('should return true when Android and nativeWebscreenshot true is provided ', () => {
      expect(checkAndroidNativeWebScreenshot('Android', true)).toEqual(true);
    });
  });

  describe('checkAndroidChromeDriverScreenshot', () => {
    it('should return false when no platform name is provided', () => {
      expect(checkAndroidChromeDriverScreenshot('', false)).toEqual(false);
    });

    it('should return false when iOS and nativeWebscreenshot true is provided', () => {
      expect(checkAndroidChromeDriverScreenshot('ios', true)).toEqual(false);
    });

    it('should return false when iOS and nativeWebscreenshot false is provided', () => {
      expect(checkAndroidChromeDriverScreenshot('ios', false)).toEqual(false);
    });

    it('should return false when Android and nativeWebscreenshot true is provided', () => {
      expect(checkAndroidChromeDriverScreenshot('Android', true)).toEqual(false);
    });

    it('should return true when Android and nativeWebscreenshot false is provided ', () => {
      expect(checkAndroidChromeDriverScreenshot('Android', false)).toEqual(true);
    });
  });
});
