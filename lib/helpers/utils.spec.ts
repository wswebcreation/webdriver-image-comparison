import {pathExistsSync, removeSync} from 'fs-extra';
import {join} from 'path';
import {
  checkIsAndroid,
  checkIsIos,
  checkIsMobile,
  checkTestInBrowser, getAndCreatePath,
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

  // describe('formatFileName', () => {
  //   const folder = join(process.cwd(), '/.tmp');
  //
  //   it('should format a string with all options provided', () => {
  //     const options: FormatFileNameOptions = {
  //       browserName: '',
  //       deviceName: '',
  //       devicePixelRatio: '',
  //       formatImageName: '',
  //       isMobile: '',
  //       isTestInBrowser: '',
  //       logName: '',
  //       name: '',
  //       outerHeight: '',
  //       outerWidth: '',
  //       screenHeight: '',
  //       screenWidth: '',
  //       tag: '',
  //     };
  //     const expectedFolderName = join(folder, options.deviceName);
  //
  //     expect(pathExistsSync(expectedFolderName)).toEqual(false);
  //     expect(getAndCreatePath(folder, options)).toEqual(expectedFolderName);
  //     expect(pathExistsSync(expectedFolderName)).toEqual(true);
  //   });
  // });

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
});
