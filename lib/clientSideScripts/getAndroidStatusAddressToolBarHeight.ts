import {StatusAddressToolBarHeight} from './statusAddressToolBarHeight.interfaces';
import {AndroidOffsets} from '../helpers/constants.interfaces';

/**
 * Get the current height of the Android status and address bar
 */
export default function getAndroidStatusAddressToolBarHeight(
  androidOffsets: AndroidOffsets
): StatusAddressToolBarHeight {
  // Determine version for the right offsets
  const {height, width} = window.screen;
  const {innerHeight} = window;
  const match = (navigator.appVersion).match(/Android (\d+).(\d+).?(\d+)?/);
  const majorVersion = parseInt(match[1], 10);
  const versionOffsets = androidOffsets[majorVersion];
  const statusAddressBarHeight = versionOffsets.STATUS_BAR + versionOffsets.ADDRESS_BAR;
  const toolBarHeight = height - innerHeight - statusAddressBarHeight;

  // Determine status, address and tool bar height
  return {
    statusAddressBar: {
      height: statusAddressBarHeight,
      width,
      x: 0,
      y: 0,
    },
    toolBar: {
      height: toolBarHeight,
      width,
      x: 0,
      y: height - toolBarHeight,
    },
  };
}
