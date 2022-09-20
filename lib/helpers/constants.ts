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
// You can also check:
// - mydevice.io
// - https://useyourloaf.com/archives/
// Corners come from:
// - https://github.com/kylebshr/ScreenCorners
//   One point is the equivalent of 1.333(3) pixels.
//   On the other hand, one pixel is the equivalent of 0.75 points.
//------------------------------------------------------------------
// iPhones
// 6/7/8/SE/2020:                                667
// 6/7/8/Plus:                                   736
// X|XS|11Pro|12Mini|13Mini (notch):             812
// 12|12Pro|13|13Pro|14 (notch):                 844
// 14Pro (notch):                                852
// XSMax|XR|11|11ProMax (notch):                 896
// 12ProMax|13ProMax|14Plus (notch):             926
// 14ProMax (notch):                             932
//------------------------------------------------------------------
// iPads
// 9.7|Air 1/2|Mini 1/2/3/4/2019|Pro 9.7:       1024
// 10.2 1/2019/2020/2021                        1080
// Pro 10.5/2017/2019:                          1112
// Mini 2021 (notch):                           1133
// Air 2020/2022 (notch):                       1180
// Pro 11 2018/2021 (notch):                    1194
// Pro 12.9 2017 (no notch)/2018/2021 (notch):  1366
//------------------------------------------------------------------
const pointsToPixels = (points: number) => Math.round(points / 0.75);
export const IOS_OFFSETS: IosOffsets = {
  IPHONE: {
    // 6/7/8/SE/2020
    667: {
      LANDSCAPE: {
        SAFE_AREA: 0,
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: 0,
        },
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
      PORTRAIT: {
        SAFE_AREA: 0,
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: 0,
        },
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
    },
    // 6/7/8/Plus
    736: {
      LANDSCAPE: {
        SAFE_AREA: 0,
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: 0,
        },
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
      PORTRAIT: {
        SAFE_AREA: 0,
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: 0,
        },
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
    },
    // X|XS|11Pro|12Mini|13Mini (notch)
    812: {
      LANDSCAPE: {
        SAFE_AREA: 44,
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // iPhone X/Xs/11 Pro/11ProMax	39.0
          default: pointsToPixels(39),
          // iPhone 12mini/13mini	44.0
          medium: pointsToPixels(344),
        },
        HOME_BAR: { x: 300, y: 359, height: 9, width: 212 },
      },
      PORTRAIT: {
        SAFE_AREA: 44,
        STATUS_BAR: 44,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // iPhone X/Xs/11 Pro/11ProMax	39.0
          default: pointsToPixels(39),
          // iPhone 12mini/13mini	44.0
          medium: pointsToPixels(344),
        },
        HOME_BAR: { x: 118, y: 796, height: 9, width: 137 },
      },
    },
    // 12|12Pro|13|13Pro|14 (notch)
    844: {
      LANDSCAPE: {
        SAFE_AREA: 47,
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // iPhone 13/13Pro/14	47.33
          default: pointsToPixels(47.33),
        },
        HOME_BAR: { x: 312, y: 375, height: 9, width: 220 },
      },
      PORTRAIT: {
        SAFE_AREA: 47,
        STATUS_BAR: 47,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // iPhone 13/13Pro/14	47.33
          default: pointsToPixels(47.33),
        },
        HOME_BAR: { x: 124, y: 829, height: 9, width: 143 },
      },
    },
    // 14Pro (notch)
    852: {
      LANDSCAPE: {
        SAFE_AREA: 59,
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // iPhone 14Pro	55.0
          default: pointsToPixels(55),
        },
        HOME_BAR: { x: 316, y: 378, height: 9, width: 220 },
      },
      PORTRAIT: {
        SAFE_AREA: 59,
        STATUS_BAR: 59,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // iPhone 14Pro	55.0
          default: pointsToPixels(55),
        },
        HOME_BAR: { x: 125, y: 837, height: 9, width: 143 },
      },
    },
    // XSMax|XR|11|11ProMax (notch)
    896: {
      LANDSCAPE: {
        SAFE_AREA: 48,
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // XsMax 39.0
          default: pointsToPixels(39),
          // iPhone 12/12Pro	47.33
          medium: pointsToPixels(47.33),
        },
        HOME_BAR: { x: 331, y: 399, height: 9, width: 234 },
      },
      PORTRAIT: {
        SAFE_AREA: 48,
        STATUS_BAR: 48,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // XsMax 39.0
          default: pointsToPixels(39),
          // iPhone 12/12Pro	47.33
          medium: pointsToPixels(47.33),
        },
        HOME_BAR: { x: 131, y: 881, height: 9, width: 152 },
      },
    },
    // 12ProMax|13ProMax|14Plus (notch)
    926: {
      LANDSCAPE: {
        SAFE_AREA: 47,
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // iPhone 12ProMax/13ProMax/14PluS	53.33
          default: pointsToPixels(53.33),
        },
        HOME_BAR: { x: 342, y: 413, height: 9, width: 242 },
      },
      PORTRAIT: {
        SAFE_AREA: 47,
        STATUS_BAR: 47,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // iPhone 12ProMax/13ProMax/14PluS	53.33
          default: pointsToPixels(53.33),
        },
        HOME_BAR: { x: 136, y: 911, height: 9, width: 156 },
      },
    },
    // 14ProMax (notch)
    932: {
      LANDSCAPE: {
        SAFE_AREA: 59,
        STATUS_BAR: 0,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // iPhone 14ProMax	55.0
          default: pointsToPixels(55),
        },
        HOME_BAR: { x: 345, y: 415, height: 9, width: 242 },
        NOTCH: { x: 11, y: 152, height: 126, width: 38 },
      },
      PORTRAIT: {
        SAFE_AREA: 59,
        STATUS_BAR: 59,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          // iPhone 14ProMax	55.0
          default: pointsToPixels(55),
        },
        HOME_BAR: { x: 137, y: 917, height: 9, width: 158 },
        NOTCH: { x: 152, y: 11, height: 38, width: 126 },
      },
    },
  },
  IPAD: {
    // 9.7|Air 1/2|Mini 1/2/3/4/2019|Pro 9.7
    1024: {
      LANDSCAPE: {
        SAFE_AREA: 0,
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: 0,
        },
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
      PORTRAIT: {
        SAFE_AREA: 0,
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: 0,
        },
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
    },
    // 10.2 1/2019/2020/2021
    1080: {
      LANDSCAPE: {
        SAFE_AREA: 0,
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: 0,
        },
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
      PORTRAIT: {
        SAFE_AREA: 0,
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: 0,
        },
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
    },
    // Pro 10.5/2017/2019
    1112: {
      LANDSCAPE: {
        SAFE_AREA: 0,
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: 0,
        },
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
      PORTRAIT: {
        SAFE_AREA: 0,
        STATUS_BAR: 20,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: 0,
        },
        HOME_BAR: { x: 0, y: 0, height: 0, width: 0 },
      },
    },
    // With Home bar
    // Mini 2021 (notch)
    1133: {
      LANDSCAPE: {
        SAFE_AREA: 0,
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: pointsToPixels(18),
        },
        HOME_BAR: { x: 408, y: 729, height: 9, width: 318 },
      },
      PORTRAIT: {
        SAFE_AREA: 0,
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: pointsToPixels(18),
        },
        HOME_BAR: { x: 234, y: 1118, height: 9, width: 276 },
      },
    },
    // Air 2020/2022 (notch)
    1180: {
      LANDSCAPE: {
        SAFE_AREA: 0,
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: pointsToPixels(18),
        },
        HOME_BAR: { x: 431, y: 805, height: 9, width: 318 },
      },
      PORTRAIT: {
        SAFE_AREA: 0,
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: pointsToPixels(18),
        },
        HOME_BAR: { x: 272, y: 1165, height: 9, width: 276 },
      },
    },
    // Pro 11 2018/2021 (notch)
    1194: {
      LANDSCAPE: {
        SAFE_AREA: 0,
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: pointsToPixels(18),
        },
        HOME_BAR: { x: 438, y: 819, height: 9, width: 318 },
      },
      PORTRAIT: {
        SAFE_AREA: 0,
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: pointsToPixels(18),
        },
        HOME_BAR: { x: 279, y: 1179, height: 9, width: 276 },
      },
    },
    // Pro 12.9 2017 (no notch)/2018/2021 (notch)
    1366: {
      LANDSCAPE: {
        SAFE_AREA: 0,
        // The iPad Pro (12.9 inch) (1st generation) has a status bar of 20px
        // STATUS_BAR: 24,
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: pointsToPixels(18),
        },
        HOME_BAR: { x: 508, y: 1009, height: 9, width: 350 },
      },
      PORTRAIT: {
        SAFE_AREA: 0,
        STATUS_BAR: 24,
        ADDRESS_BAR: 50,
        BEZEL_CORNERS: {
          default: pointsToPixels(18),
        },
        HOME_BAR: { x: 352, y: 1351, height: 9, width: 320 },
      },
    },
  },
};

export const IOS_CORNERS = {
  IPHONE: {
    812: {
      // iPhone X/Xs/11 Pro/11ProMax	39.0
      default: pointsToPixels(39),
      // iPhone 12mini/13mini	44.0
      medium: pointsToPixels(344),
    },
    844: {
      // iPhone 13/13Pro/14	47.33
      default: pointsToPixels(47.33),
    },
    852: {
      // iPhone 14Pro	55.0
      default: pointsToPixels(55),
    },
    896: {
      // XsMax 39.0
      default: pointsToPixels(39),
      // iPhone 12/12Pro	47.33
      medium: pointsToPixels(47.33),
    },
    926: {
      // iPhone 12ProMax/13ProMax/14PluS	53.33
      default: pointsToPixels(53.33),
    },
    932: {
      // iPhone 14ProMax	55.0
      default: pointsToPixels(55),
    },
  },
  IPAD: {
    // 1133/1180/1194/1366
    // iPad Air/iPadPro11-inch/12.9-inch	18.0
    1133: {
      default: pointsToPixels(18),
    },
    1180: {
      default: pointsToPixels(18),
    },
    1194: {
      default: pointsToPixels(18),
    },
    1366: {
      default: pointsToPixels(18),
    },
  },
};
