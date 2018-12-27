import {ElementPosition} from './elementPosition.interfaces';

/**
 * Get the element position to the top of the screen of the device, not the top of the webview
 * This method is used for Android native and iOS screenshots
 */
export function getElementPositionTopScreenNativeMobile(
  statusBarAddressBarHeight: number,
  element: HTMLElement,
): ElementPosition {
  // Get some heights and widths
  const {width, height} = window.screen;
  const {innerHeight} = window;

  // Determine element position
  const elementPosition = element.getBoundingClientRect();
  let y;

  if (height === innerHeight || width === innerHeight) {
    /* an app with a transparent statusbar */
    y = elementPosition.top;
  } else {
    y = statusBarAddressBarHeight + elementPosition.top;
  }

  return {
    height: elementPosition.height,
    width: elementPosition.width,
    x: elementPosition.left,
    y: y
  };
}
