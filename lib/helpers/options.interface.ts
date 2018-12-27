export interface ClassOptions{
  /**
   * Class options
   */
  addressBarShadowPadding?: number;
  autoSaveBaseline?: boolean;
  baselineFolder?: string;
  debug?: boolean;
  formatImageName?: string;
  nativeWebScreenshot?: boolean;
  savePerInstance?: boolean;
  screenshotPath?: string;
  toolBarShadowPadding?: number;

  /**
   * Class and method options
   */
  disableCSSAnimation?: boolean;
  fullPageScrollTimeout?: number;
  hideScrollBars?: boolean;

  /**
   * Compare options
   */
  blockOutStatusBar?: boolean;
  blockOutToolBar?: boolean;
  ignoreAlpha?: boolean;
  ignoreAntialiasing?: boolean;
  ignoreColors?: boolean;
  ignoreLess?: boolean;
  ignoreNothing?: boolean;
  ignoreTransparentPixel?: boolean;
  rawMisMatchPercentage?: boolean;
  returnAllCompareData?: boolean;
  saveAboveTolerance?: number;
}

export interface DefaultOptions {
  addressBarShadowPadding: number;
  autoSaveBaseline: boolean;
  debug: boolean;
  formatImageName: string;
  nativeWebScreenshot: boolean;
  savePerInstance: boolean;
  toolBarShadowPadding: number;
  resizeDimensions: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  disableCSSAnimation: boolean;
  fullPageScrollTimeout: number;
  hideScrollBars: boolean;
  compareOptions: CompareOptions
}

interface CompareOptions {
  blockOutStatusBar: boolean;
  blockOutToolBar: boolean;
  ignoreAlpha: boolean;
  ignoreAntialiasing: boolean;
  ignoreColors: boolean;
  ignoreLess: boolean;
  ignoreNothing: boolean;
  ignoreTransparentPixel: boolean;
  rawMisMatchPercentage: boolean;
  returnAllCompareData: boolean;
  saveAboveTolerance: number;
}
