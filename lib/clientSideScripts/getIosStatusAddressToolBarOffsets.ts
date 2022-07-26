import { StatusAddressToolBarOffsets } from './statusAddressToolBarOffsets.interfaces';
import { IosOffsets } from '../helpers/constants.interfaces';

/**
 * Get the current height of the iOS status and address bar
 */
export default function getIosStatusAddressToolBarOffsets(iosOffsets: IosOffsets): StatusAddressToolBarOffsets {
  // 1. Determine screen width/height to determine the current iPhone/iPad offset data
  //    For data on the screen sizes check the constants.ts-file
  const { width, height } = window.screen;
  const isIphone = width < 1024 && height < 1024;
  const deviceType = isIphone ? 'IPHONE' : 'IPAD';
  // Need to use matchMedia because the height/size is not always accurate when rotated
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;
  const orientationType = isLandscape ? 'LANDSCAPE' : 'PORTRAIT';
  const defaultPortraitHeight = isIphone ? 667 : 1024;
  const portraitHeight = width > height ? width : height;
  // Not sure if it's a bug, but in Landscape mode the height is the width
  const deviceWidth = isLandscape ? height : width;
  const offsetPortraitHeight =
    Object.keys(iosOffsets[deviceType]).indexOf(portraitHeight.toString()) > -1 ? portraitHeight : defaultPortraitHeight;
  const currentOffsets = iosOffsets[deviceType][offsetPortraitHeight][orientationType];

  // 2. Get the statusbar height
  const statusBarHeight = currentOffsets.STATUS_BAR;
  // 4. Determine the address bar height
  //    Since iOS 15 the address bar for iPhones is at the bottom by default
  //    This is also what we assume because we can't determine it from the
  //    web context
  const osVersion = parseInt(navigator.appVersion.match(/(?:OS |Version\/)(\d+)(?:_|\.)(\d+)(?:_|\.)?(\d+)?/)[1], 10);
  const addressBarOnTop = (!isLandscape && isIphone && osVersion < 15) || isLandscape || !isIphone;
  const statusAddressBarHeight = statusBarHeight + (addressBarOnTop ? currentOffsets.ADDRESS_BAR : 0);
  // 4. Determine the toolbar offsets
  //    In Landscape mode the toolbar is hidden by default and we need to add
  //    home bar data
  const { innerHeight } = window;
  const toolBarHeight = height - innerHeight - statusAddressBarHeight;
  const toolBarOffsets = isLandscape
    ? currentOffsets.HOME_BAR
    : {
        height: toolBarHeight,
        width: deviceWidth,
        x: 0,
        y: height - toolBarHeight,
      };

  // 5. Return the offsets
  return {
    statusAddressBar: {
      height: statusAddressBarHeight,
      width: deviceWidth,
      x: 0,
      y: 0,
    },
    toolBar: toolBarOffsets,
  };
}
