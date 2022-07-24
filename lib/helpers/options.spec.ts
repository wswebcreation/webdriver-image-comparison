import { defaultOptions, methodCompareOptions, screenMethodCompareOptions } from './options';
import { ClassOptions } from './options.interface';
import { ScreenMethodImageCompareCompareOptions } from '../methods/images.interfaces';

describe('options', () => {
  describe('defaultOptions', () => {
    it('should return the default options when no options are provided', () => {
      expect(defaultOptions({})).toMatchSnapshot();
    });

    it('should return the provided options when options are provided', () => {
      const options: ClassOptions = {
        addressBarShadowPadding: 1,
        autoSaveBaseline: true,
        formatImageName: '{foo}-{bar}',
        savePerInstance: true,
        toolBarShadowPadding: 1,
        disableCSSAnimation: true,
        fullPageScrollTimeout: 12345,
        hideScrollBars: true,
        blockOutStatusBar: true,
        blockOutToolBar: true,
        ignoreAlpha: true,
        ignoreAntialiasing: true,
        ignoreColors: true,
        ignoreLess: true,
        ignoreNothing: true,
        rawMisMatchPercentage: true,
        returnAllCompareData: true,
        saveAboveTolerance: 12,
        scaleImagesToSameSize: true,
        tabbableOptions: {
          circle: {
            backgroundColor: 'backgroundColor',
            borderColor: 'borderColor',
            borderWidth: 123,
            fontColor: 'fontColor',
            fontFamily: 'fontFamily',
            fontSize: 321,
            size: 567,
            showNumber: false,
          },
          line: {
            color: 'color',
            width: 987,
          },
        },
      };

      expect(defaultOptions(options)).toMatchSnapshot();
    });
  });

  describe('methodCompareOptions', () => {
    it('should not return the method options when no options are provided', () => {
      expect(methodCompareOptions({})).toMatchSnapshot();
    });

    it('should return the provided options when options are provided', () => {
      const options = {
        blockOut: [{ height: 1, width: 2, x: 3, y: 4 }],
        ignoreAlpha: true,
        ignoreAntialiasing: true,
        ignoreColors: true,
        ignoreLess: true,
        ignoreNothing: true,
        rawMisMatchPercentage: true,
        returnAllCompareData: true,
        saveAboveTolerance: 12,
        scaleImagesToSameSize: true,
      };

      expect(methodCompareOptions(options)).toMatchSnapshot();
    });
  });

  describe('screenMethodCompareOptions', () => {
    it('should not return the screen method options when no options are provided', () => {
      expect(screenMethodCompareOptions({})).toMatchSnapshot();
    });

    it('should return the provided options when options are provided', () => {
      const options: ScreenMethodImageCompareCompareOptions = {
        blockOutStatusBar: false,
        blockOutToolBar: false,
        blockOut: [{ height: 1, width: 2, x: 3, y: 4 }],
        ignoreAlpha: true,
        ignoreAntialiasing: true,
        ignoreColors: true,
        ignoreLess: true,
        ignoreNothing: true,
        rawMisMatchPercentage: true,
        returnAllCompareData: true,
        saveAboveTolerance: 12,
        scaleImagesToSameSize: true,
      };

      expect(screenMethodCompareOptions(options)).toMatchSnapshot();
    });
  });
});
