import {StatusAddressToolBarHeight} from './statusAddressToolBarHeight.interfaces';
import {IosOffsets} from '../helpers/constants.interfaces';

/**
 * Get the current height of the iOS status and address bar
 */
export default function getIosStatusAddressToolBarHeight(iosOffsets: IosOffsets): StatusAddressToolBarHeight {
  // Determine version for the right offsets
  const match = (navigator.appVersion).match(/(?:OS |Version\/)(\d+)(?:_|\.)(\d+)(?:_|\.)?(\d+)?/);
  const majorVersion = parseInt(match[1], 10);
  const versionOffsets = iosOffsets[majorVersion];

  // Determine screen width/height to determine iPhone X series address bar height
  const {width, height} = window.screen;
  const iPhoneHasNotch =
    // iPhone X|XS|11Pro|12Mini|13Mini
    (width === 812 || height === 812)
    // iPone XSMax|XR|11|11ProMax
    || (width === 896 || height === 896)
    // iPhone 12|12Pro|13|13Pro
    || (width === 844 || height === 844)
    // iPhone 12ProMax|13ProMax
    || (width === 926 || height === 926);

  // Determine if iPad Pro with no touchID for higher status bar
  const {innerWidth, innerHeight} = window;
  const isIpadNoTouch = (
    (innerHeight + versionOffsets.ADDRESS_BAR + versionOffsets.STATUS_BAR_PRO) === height ||
    (innerWidth + versionOffsets.ADDRESS_BAR + versionOffsets.STATUS_BAR_PRO) === width
  );

  // Determine address bar height
  let statusBarHeight;
  if (iPhoneHasNotch) {
    statusBarHeight = versionOffsets.STATUS_BAR_X;
  } else if (isIpadNoTouch) {
    statusBarHeight = versionOffsets.STATUS_BAR_PRO;
  } else {
    statusBarHeight = versionOffsets.STATUS_BAR;
  }

  const statusAddressBarHeight = statusBarHeight + versionOffsets.ADDRESS_BAR;
  const toolBarHeight = height - innerHeight - statusAddressBarHeight;
  const toolBar = {
    height: toolBarHeight,
    width,
    x: 0,
    y: height - toolBarHeight,
  };

  // The status and address can be smaller due to a "manual" scroll meaning there is no toolbar
  if (toolBar.height < 0) {
    toolBar.height = 0;
    toolBar.y = 0;
  }
  // Add the handlebar on iPhone X series as a blockout, it can colour with the background
  if (toolBar.height === 0 && iPhoneHasNotch) {
    // Needs to be verbose to support the correct injection
    toolBar.height = versionOffsets.HOME_BAR.DEFAULT.height;
    toolBar.width = versionOffsets.HOME_BAR.DEFAULT.width;
    toolBar.x = versionOffsets.HOME_BAR.DEFAULT.x;
    toolBar.y = versionOffsets.HOME_BAR.DEFAULT.y;

    // For the XS Max
    if ((width === 896 || height === 896)) {
      // Needs to be verbose to support the correct injection
      toolBar.height = versionOffsets.HOME_BAR.LARGE.height;
      toolBar.width = versionOffsets.HOME_BAR.LARGE.width;
      toolBar.x = versionOffsets.HOME_BAR.LARGE.x;
      toolBar.y = versionOffsets.HOME_BAR.LARGE.y;
    }
  }

  // Determine status, address and tool bar height and width
  return {
    statusAddressBar: {
      height: statusAddressBarHeight,
      width,
      x: 0,
      y: 0,
    },
    toolBar,
  };
}
