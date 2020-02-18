export interface FullPageScreenshotsData {
  // The height of the full page
  fullPageHeight: number;
  // The width of the full page
  fullPageWidth: number;
  data: ScreenshotData[];
}

interface ScreenshotData {
  // The width of the canvas
  canvasWidth: number;
  // The y position on the  canvas
  canvasYPosition: number;
  // The height if the image
  imageHeight: number;
  // The width of the image
  imageWidth: number;
  // The y position in the image to start from
  imageYPosition: number;
  // The screenshot itself
  screenshot: string;
}

export interface FullPageScreenshotDataOptions {
  // The address bar padding for iOS or Android
  addressBarShadowPadding: number;
  // The device pixel ratio
  devicePixelRatio: number;
  // The amount of milliseconds to wait for a new scroll
  fullPageScrollTimeout: number;
  // Elements that need to be hidden after the first scroll for a fullpage scroll
  hideAfterFirstScroll: (HTMLElement | HTMLElement[])[];
  // The innerheight
  innerHeight: number;
  // If the instance is an Android device
  isAndroid: boolean;
  // If this is an Android native screenshot
  isAndroidNativeWebScreenshot: boolean;
  // If this is an Android ChromeDriver screenshot
  isAndroidChromeDriverScreenshot: boolean;
  // Is it an hybrid app or not
  isHybridApp: boolean;
  // If the instance is an iOS device
  isIos: boolean;
  // The address bar padding for iOS or Android
  toolBarShadowPadding: number;
}

export interface FullPageScreenshotNativeMobileOptions {
  // The address bar padding for iOS or Android
  addressBarShadowPadding: number;
  // The device pixel ratio
  devicePixelRatio: number;
  // The amount of milliseconds to wait for a new scroll
  fullPageScrollTimeout: number;
  // The innerheight
  innerHeight: number;
  // The height of the status and the address bar
  statusAddressBarHeight: number;
  // The address bar padding for iOS or Android
  toolBarShadowPadding: number;
  // Elements that need to be hidden after the first scroll for a fullpage scroll
  hideAfterFirstScroll: (HTMLElement | HTMLElement[])[];
}

export interface FullPageScreenshotOptions {
  // The device pixel ratio
  devicePixelRatio: number;
  // The timeout to wait after a scroll
  fullPageScrollTimeout: number;
  // The innerheight
  innerHeight: number;
  // Elements that need to be hidden after the first scroll for a fullpage scroll
  hideAfterFirstScroll: (HTMLElement | HTMLElement[])[];
}
