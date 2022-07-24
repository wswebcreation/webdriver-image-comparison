import { determineElementRectangles, determineScreenRectangles, determineStatusAddressToolBarRectangles } from './rectangles';
import { IMAGE_STRING } from '../mocks/mocks';

describe('rectangles', () => {
  describe('determineElementRectangles', () => {
    it('should determine them for iOS', async () => {
      const options = {
        isAndroid: false,
        devicePixelRatio: 2,
        isAndroidNativeWebScreenshot: false,
        innerHeight: 678,
        isIos: true,
      };
      const MOCKED_EXECUTOR = jest
        .fn()
        // getElementPositionIos for: getIosStatusAddressToolBarHeight
        .mockResolvedValueOnce({
          statusAddressBar: {
            height: 94,
            width: 375,
            x: 0,
            y: 0,
          },
          toolBar: {
            height: 5,
            width: 135,
            x: 120,
            y: 799,
          },
        })
        // getElementPositionIos for: getElementPositionTopScreenNativeMobile
        .mockResolvedValueOnce({
          height: 120,
          width: 120,
          x: 100,
          y: 10,
        });

      expect(
        await determineElementRectangles({
          executor: MOCKED_EXECUTOR,
          base64Image: IMAGE_STRING,
          options,
          element: 'element',
        }),
      ).toMatchSnapshot();
    });

    it('should determine them for Android Native webscreenshot', async () => {
      const options = {
        isAndroid: true,
        devicePixelRatio: 3,
        isAndroidNativeWebScreenshot: true,
        innerHeight: 678,
        isIos: false,
      };
      const MOCKED_EXECUTOR = jest
        .fn()
        // getElementPositionAndroid for: getAndroidStatusAddressToolBarHeight
        .mockResolvedValueOnce({
          statusAddressBar: {
            height: 20,
            width: 375,
            x: 0,
            y: 0,
          },
          toolBar: {
            height: 5,
            width: 135,
            x: 120,
            y: 799,
          },
        })
        // getElementPositionIos for: getElementPositionTopScreenNativeMobile
        .mockResolvedValueOnce({
          height: 120,
          width: 120,
          x: 100,
          y: 10,
        });

      expect(
        await determineElementRectangles({
          executor: MOCKED_EXECUTOR,
          base64Image: IMAGE_STRING,
          options,
          element: 'element',
        }),
      ).toMatchSnapshot();
    });

    it('should determine them for Android ChromeDriver', async () => {
      const options = {
        isAndroid: true,
        devicePixelRatio: 1,
        isAndroidNativeWebScreenshot: false,
        innerHeight: 678,
        isIos: false,
      };
      const MOCKED_EXECUTOR = jest
        .fn()
        // getElementPositionAndroid for: getElementPositionTopWindow
        .mockResolvedValueOnce({
          height: 20,
          width: 375,
          x: 0,
          y: 0,
        });

      expect(
        await determineElementRectangles({
          executor: MOCKED_EXECUTOR,
          base64Image: IMAGE_STRING,
          options,
          element: 'element',
        }),
      ).toMatchSnapshot();
    });

    it('should determine them for a desktop browser', async () => {
      const options = {
        isAndroid: false,
        devicePixelRatio: 2,
        isAndroidNativeWebScreenshot: false,
        innerHeight: 500,
        isIos: false,
      };
      const MOCKED_EXECUTOR = jest
        .fn()
        // getElementPositionDesktop for: getElementPositionTopWindow
        .mockResolvedValueOnce({
          height: 20,
          width: 375,
          x: 12,
          y: 34,
        });

      expect(
        await determineElementRectangles({
          executor: MOCKED_EXECUTOR,
          base64Image: IMAGE_STRING,
          options,
          element: 'element',
        }),
      ).toMatchSnapshot();
    });
  });

  describe('determineScreenRectangles', () => {
    it('should determine them for iOS', async () => {
      const options = {
        innerHeight: 553,
        innerWidth: 375,
        isAndroidNativeWebScreenshot: false,
        isAndroidChromeDriverScreenshot: false,
        isIos: true,
        devicePixelRatio: 2,
      };

      expect(await determineScreenRectangles(IMAGE_STRING, options)).toMatchSnapshot();
    });

    it('should determine them for Android ChromeDriver', async () => {
      const options = {
        innerHeight: 553,
        innerWidth: 375,
        isAndroidNativeWebScreenshot: false,
        isAndroidChromeDriverScreenshot: true,
        isIos: false,
        devicePixelRatio: 2,
      };

      expect(await determineScreenRectangles(IMAGE_STRING, options)).toMatchSnapshot();
    });

    it('should determine them for Android Native webscreenshot', async () => {
      const options = {
        innerHeight: 553,
        innerWidth: 375,
        isAndroidNativeWebScreenshot: true,
        isAndroidChromeDriverScreenshot: false,
        isIos: false,
        devicePixelRatio: 2,
      };

      expect(await determineScreenRectangles(IMAGE_STRING, options)).toMatchSnapshot();
    });
  });

  describe('determineStatusAddressToolBarRectangles', () => {
    it('should determine the rectangles for the iOS with a status and toolbar blockout', async () => {
      const options = {
        isHybridApp: false,
        isMobile: true,
        isViewPortScreenshot: true,
        platformName: 'iOS',
        isAndroidNativeWebScreenshot: false,
        blockOutStatusBar: true,
        blockOutToolBar: true,
      };
      const MOCKED_EXECUTOR = jest
        .fn()
        // determineStatusAddressToolBarRectangles for: getIosStatusAddressToolBarHeight
        .mockResolvedValueOnce({
          statusAddressBar: {
            height: 94,
            width: 375,
            x: 0,
            y: 0,
          },
          toolBar: {
            height: 5,
            width: 135,
            x: 120,
            y: 799,
          },
        });

      expect(await determineStatusAddressToolBarRectangles(MOCKED_EXECUTOR, options)).toMatchSnapshot();
    });

    it('should determine the rectangles for the iOS without a status and toolbar blockout', async () => {
      const options = {
        isHybridApp: false,
        isMobile: true,
        isViewPortScreenshot: true,
        platformName: 'iOS',
        isAndroidNativeWebScreenshot: false,
        blockOutStatusBar: false,
        blockOutToolBar: false,
      };
      const MOCKED_EXECUTOR = jest
        .fn()
        // determineStatusAddressToolBarRectangles for: getIosStatusAddressToolBarHeight
        .mockResolvedValueOnce({
          statusAddressBar: {
            height: 94,
            width: 375,
            x: 0,
            y: 0,
          },
          toolBar: {
            height: 5,
            width: 135,
            x: 0,
            y: 799,
          },
        });

      expect(await determineStatusAddressToolBarRectangles(MOCKED_EXECUTOR, options)).toMatchSnapshot();
    });

    it('should determine the rectangles for Android with a status and toolbar blockout', async () => {
      const options = {
        isHybridApp: false,
        isMobile: true,
        isViewPortScreenshot: true,
        platformName: 'Android',
        isAndroidNativeWebScreenshot: true,
        blockOutStatusBar: true,
        blockOutToolBar: true,
      };
      const MOCKED_EXECUTOR = jest
        .fn()
        // determineStatusAddressToolBarRectangles for: getAndroidStatusAddressToolBarHeight
        .mockResolvedValueOnce({
          statusAddressBar: {
            height: 40,
            width: 320,
            x: 0,
            y: 0,
          },
          toolBar: {
            height: 100,
            width: 320,
            x: 0,
            y: 600,
          },
        });

      expect(await determineStatusAddressToolBarRectangles(MOCKED_EXECUTOR, options)).toMatchSnapshot();
    });

    it('should determine the rectangles that there are no rectangles for this device', async () => {
      const options = {
        isHybridApp: false,
        isMobile: true,
        isViewPortScreenshot: false,
        platformName: 'Android',
        isAndroidNativeWebScreenshot: false,
        blockOutStatusBar: false,
        blockOutToolBar: false,
      };
      const MOCKED_EXECUTOR = jest
        .fn()
        // determineStatusAddressToolBarRectangles for: getAndroidStatusAddressToolBarHeight
        .mockResolvedValueOnce({
          statusAddressBar: {
            height: 40,
            width: 320,
            x: 0,
            y: 0,
          },
          toolBar: {
            height: 100,
            width: 320,
            x: 0,
            y: 600,
          },
        });

      expect(await determineStatusAddressToolBarRectangles(MOCKED_EXECUTOR, options)).toMatchSnapshot();
    });
  });
});
