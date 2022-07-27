import { StatusAddressToolBarOffsets } from './statusAddressToolBarOffsets.interfaces';
import { AndroidOffsets } from '../helpers/constants.interfaces';

/**
 * Get the current height of the Android status and address bar
 */
export default function getAndroidStatusAddressToolBarOffsets(
  androidOffsets: AndroidOffsets,
  isHybridApp: boolean,
): StatusAddressToolBarOffsets {
  // Determine version for the right offsets
  const { height, width } = window.screen;
  const { innerHeight } = window;
  const match = navigator.appVersion.match(/Android (\d+).?(\d+)?.?(\d+)?/);
  const majorVersion = parseInt(match[1], 10);
  const versionOffsets = androidOffsets[majorVersion];
  const statusAddressBarHeight = versionOffsets.STATUS_BAR + (isHybridApp ? 0 : versionOffsets.ADDRESS_BAR);
  let toolBarHeight = height - innerHeight - statusAddressBarHeight;

  if (toolBarHeight < 0) {
    toolBarHeight = versionOffsets.TOOL_BAR;
  }

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
