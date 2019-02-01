import {getBase64FullPageScreenshotsData} from './screenshots';
import {FullPageScreenshotDataOptions} from './screenshots.interfaces';
import {IMAGE_STRING} from '../../mocks/mocks';

describe('screenshots', () => {
  describe('getBase64FullPageScreenshotsData', () => {
    const MOCKED_TAKESCREENSHOT = jest.fn()
      .mockResolvedValue(IMAGE_STRING);

    it('should get the Android nativeWebScreenshot fullpage screenshot data', async () => {
      const options: FullPageScreenshotDataOptions = {
        addressBarShadowPadding: 6,
        devicePixelRatio: 2,
        fullPageScrollTimeout: 1,
        innerHeight: 800,
        isAndroid: true,
        isAndroidNativeWebScreenshot: true,
        isAndroidChromeDriverScreenshot: false,
        isIos: false,
        toolBarShadowPadding: 6,
      };
      const MOCKED_EXECUTOR = jest.fn()
        .mockResolvedValueOnce({statusAddressBar: {height: 56}})
        // THIS NEEDS TO BE FIXED IN THE FUTURE
        // getFullPageScreenshotsDataNativeMobile: For await executor(scrollToPosition, scrollY)
        .mockResolvedValueOnce({})
        // getFullPageScreenshotsDataNativeMobile: For await executor(getDocumentScrollHeight)
        .mockResolvedValueOnce(788);

      expect(await getBase64FullPageScreenshotsData(MOCKED_TAKESCREENSHOT, MOCKED_EXECUTOR, options)).toMatchSnapshot();
    });

    it('should get the Android ChromeDriver fullpage screenshot data', async () => {
      const options: FullPageScreenshotDataOptions = {
        addressBarShadowPadding: 6,
        devicePixelRatio: 2,
        fullPageScrollTimeout: 1,
        innerHeight: 800,
        isAndroid: true,
        isAndroidNativeWebScreenshot: false,
        isAndroidChromeDriverScreenshot: true,
        isIos: false,
        toolBarShadowPadding: 6,
      };
      const MOCKED_EXECUTOR = jest.fn()
        // THIS NEEDS TO BE FIXED IN THE FUTURE
        // getFullPageScreenshotsDataNativeMobile: For await executor(scrollToPosition, scrollY)
        .mockResolvedValueOnce({})
        // getFullPageScreenshotsDataNativeMobile: For await executor(getDocumentScrollHeight)
        .mockResolvedValueOnce(1200)
        // THIS NEEDS TO BE FIXED IN THE FUTURE
        // getFullPageScreenshotsDataNativeMobile: For await executor(scrollToPosition, scrollY)
        .mockResolvedValueOnce({})
        // getFullPageScreenshotsDataNativeMobile: For await executor(getDocumentScrollHeight)
        .mockResolvedValueOnce(1200);

      // await getBase64FullPageScreenshotsData(MOCKED_TAKESCREENSHOT, MOCKED_EXECUTOR, options);
      expect(await getBase64FullPageScreenshotsData(MOCKED_TAKESCREENSHOT, MOCKED_EXECUTOR, options)).toMatchSnapshot();
    });

    it('should get the iOS fullpage screenshot data', async() => {
      const options: FullPageScreenshotDataOptions = {
        addressBarShadowPadding: 6,
        devicePixelRatio: 2,
        fullPageScrollTimeout: 1,
        innerHeight: 800,
        isAndroid: false,
        isAndroidNativeWebScreenshot: false,
        isAndroidChromeDriverScreenshot: false,
        isIos: true,
        toolBarShadowPadding: 6,
      };
      const MOCKED_EXECUTOR = jest.fn()
        .mockResolvedValueOnce({statusAddressBar: {height: 94}})
        // THIS NEEDS TO BE FIXED IN THE FUTURE
        // getFullPageScreenshotsDataNativeMobile: For await executor(scrollToPosition, scrollY)
        .mockResolvedValueOnce({})
        // getFullPageScreenshotsDataNativeMobile: For await executor(getDocumentScrollHeight)
        .mockResolvedValueOnce(1200)
        // THIS NEEDS TO BE FIXED IN THE FUTURE
        // getFullPageScreenshotsDataNativeMobile: For await executor(scrollToPosition, scrollY)
        .mockResolvedValueOnce({})
        // getFullPageScreenshotsDataNativeMobile: For await executor(getDocumentScrollHeight)
        .mockResolvedValueOnce(1200);

      expect(await getBase64FullPageScreenshotsData(MOCKED_TAKESCREENSHOT, MOCKED_EXECUTOR, options)).toMatchSnapshot();
    });

    it('should get the desktop browser fullpage screenshot data', async () => {
      const options: FullPageScreenshotDataOptions = {
        addressBarShadowPadding: 6,
        devicePixelRatio: 2,
        fullPageScrollTimeout: 1,
        innerHeight: 768,
        isAndroid: false,
        isAndroidNativeWebScreenshot: false,
        isAndroidChromeDriverScreenshot: false,
        isIos: false,
        toolBarShadowPadding: 6,
      };
      const MOCKED_EXECUTOR = jest.fn()
        // THIS NEEDS TO BE FIXED IN THE FUTURE
        // getFullPageScreenshotsDataNativeMobile: For await executor(scrollToPosition, scrollY)
        .mockResolvedValueOnce({})
        // getFullPageScreenshotsDataNativeMobile: For await executor(getDocumentScrollHeight)
        .mockResolvedValueOnce(3200)
        // getFullPageScreenshotsDataNativeMobile: For await executor(scrollToPosition, scrollY)
        .mockResolvedValueOnce({})
        // getFullPageScreenshotsDataNativeMobile: For await executor(getDocumentScrollHeight)
        .mockResolvedValueOnce(3200)
        // getFullPageScreenshotsDataNativeMobile: For await executor(scrollToPosition, scrollY)
        .mockResolvedValueOnce({})
        // getFullPageScreenshotsDataNativeMobile: For await executor(getDocumentScrollHeight)
        .mockResolvedValueOnce(3200)
        // getFullPageScreenshotsDataNativeMobile: For await executor(scrollToPosition, scrollY)
        .mockResolvedValueOnce({})
        // getFullPageScreenshotsDataNativeMobile: For await executor(getDocumentScrollHeight)
        .mockResolvedValueOnce(3200)
        // getFullPageScreenshotsDataNativeMobile: For await executor(scrollToPosition, scrollY)
        .mockResolvedValueOnce({})
        // getFullPageScreenshotsDataNativeMobile: For await executor(getDocumentScrollHeight)
        .mockResolvedValueOnce(3200);

      expect(await getBase64FullPageScreenshotsData(MOCKED_TAKESCREENSHOT, MOCKED_EXECUTOR, options)).toMatchSnapshot();
    });
  });

});
