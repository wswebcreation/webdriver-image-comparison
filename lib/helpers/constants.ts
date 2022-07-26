import { IosOffsets } from './constants.interfaces';

export const DEFAULT_FORMAT_STRING = '{tag}-{browserName}-{width}x{height}-dpr-{dpr}';
export const PLATFORMS = {
  ANDROID: 'android',
  IOS: 'ios',
};
export const FOLDERS = {
  ACTUAL: 'actual',
  DIFF: 'diff',
  TEMP_FULL_SCREEN: 'tempFullScreen',
  DEFAULT: {
    BASE: './wic/baseline/',
    SCREENSHOTS: '.tmp/',
  },
};
export const DEFAULT_SHADOW = {
  ADDRESS_BAR: 6,
  TOOL_BAR: 6,
};
export const DESKTOP = 'desktop';
export const CUSTOM_CSS_ID = 'pic-css';
export const DEFAULT_RESIZE_DIMENSIONS = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
export const FULL_PAGE_SCROLL_TIMEOUT = 1500;
export const DEFAULT_TABBABLE_OPTIONS = {
  circle: {
    backgroundColor: '#ff0000',
    borderColor: '#000',
    borderWidth: 1,
    fontColor: '#fff',
    fontFamily: 'Arial',
    fontSize: 10,
    size: 10,
    showNumber: true,
  },
  line: {
    color: '#000',
    width: 1,
  },
};

/**
 * Android and iOS offsets data
 */
const ANDROID_DEFAULT_OFFSETS = {
  STATUS_BAR: 24,
  ADDRESS_BAR: 56,
  TOOL_BAR: 48,
};
export const ANDROID_OFFSETS = {
  6: { ...ANDROID_DEFAULT_OFFSETS },
  7: { ...ANDROID_DEFAULT_OFFSETS },
  8: { ...ANDROID_DEFAULT_OFFSETS },
  9: { ...ANDROID_DEFAULT_OFFSETS },
  10: { ...ANDROID_DEFAULT_OFFSETS },
  11: { ...ANDROID_DEFAULT_OFFSETS },
  12: { ...ANDROID_DEFAULT_OFFSETS },
};

//=========================
// iPhone/iPad screen data
//=========================
// Height of screen in portrait mode, this is also what you get back
// when you:
//  - ask for the screen dimensions in WebdriverIO `getWindowSize`
//  - with `screen.height` in Safari devtools
//  - with http://whatismyscreenresolution.net/
//------------------------------------------------------------------
// iPhones
// 6/7/8/SE/2020:                                667 (DEFAULT)
// 6/7/8/Plus:                                   736 (PLUS)
// X|XS|11Pro|12Mini|13Mini (notch):             812 (SMALL)
// 12|12Pro|13|13Pro (notch):                    844 (MEDIUM)
// XSMax|XR|11|11ProMax (notch):                 896 (LARGE)
// 12ProMax|13ProMax (notch):                    926 (EXTRA_LARGE)
//------------------------------------------------------------------
// iPads
// 9.7|Air 1/2|Mini 1/2/3/4/2019|Pro 9.7:       1024 (DEFAULT)
// 10.2 1/2019/2020/2021                        1080 (IPAD_10_2)
// Pro 10.5/2017/2019:                          1112 (PRO_10_5)
// Mini 2021 (notch):                           1133 (SMALL)
// Air 2020/2022 (notch):                       1180 (MEDIUM)
// Pro 11 2018/2021 (notch):                    1194 (LARGE)
// Pro 12.9 2017 (no notch)/2018/2021 (notch):  1366 (EXTRA_LARGE)
//------------------------------------------------------------------
export const IOS_OFFSETS: IosOffsets = {
  IPHONE: {
    667: {
      LANDSCAPE: {
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
      PORTRAIT: {
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
    },
    736: {
      LANDSCAPE: {
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
      PORTRAIT: {
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
    },
    // With Notch
    812: {
      LANDSCAPE: {
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 300, y: 359, height: 9, width: 212 },
      },
      PORTRAIT: {
        STATUS_BAR: 44,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 118, y: 796, height: 9, width: 137 },
      },
    },
    844: {
      LANDSCAPE: {
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 312, y: 375, height: 9, width: 220 },
      },
      PORTRAIT: {
        STATUS_BAR: 47,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 124, y: 829, height: 9, width: 143 },
      },
    },
    896: {
      LANDSCAPE: {
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 331, y: 399, height: 9, width: 234 },
      },
      PORTRAIT: {
        STATUS_BAR: 48,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 131, y: 881, height: 9, width: 152 },
      },
    },
    926: {
      LANDSCAPE: {
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 342, y: 413, height: 9, width: 242 },
      },
      PORTRAIT: {
        STATUS_BAR: 47,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 136, y: 911, height: 9, width: 156 },
      },
    },
  },
  IPAD: {
    1024: {
      LANDSCAPE: {
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
      PORTRAIT: {
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
    },
    1080: {
      LANDSCAPE: {
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
      PORTRAIT: {
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
    },
    1112: {
      LANDSCAPE: {
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
      PORTRAIT: {
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
    },
    // With Notch
    1133: {
      LANDSCAPE: {
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 408, y: 739, height: 9, width: 318 },
      },
      PORTRAIT: {
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 234, y: 1118, height: 9, width: 276 },
      },
    },
    1180: {
      LANDSCAPE: {
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 431, y: 805, height: 9, width: 318 },
      },
      PORTRAIT: {
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 272, y: 1165, height: 9, width: 276 },
      },
    },
    1194: {
      LANDSCAPE: {
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 438, y: 819, height: 9, width: 318 },
      },
      PORTRAIT: {
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 279, y: 1179, height: 9, width: 276 },
      },
    },
    1366: {
      LANDSCAPE: {
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 508, y: 1009, height: 9, width: 350 },
      },
      PORTRAIT: {
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        HOME_BAR: { x: 352, y: 1351, height: 9, width: 320 },
      },
    },
  },
};
