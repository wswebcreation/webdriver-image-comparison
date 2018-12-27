import {ScreenDimensions} from './screenDimensions.interfaces';

/**
 * Get all the screen dimensions
 */
export default function getScreenDimensions():ScreenDimensions {
  const body = document.body;
  const html = document.documentElement;

  return {
    dimensions: {
      body: {
        scrollHeight: body.scrollHeight,
        offsetHeight: body.offsetHeight
      },
      html: {
        clientHeight: html.clientHeight,
        clientWidth: html.clientWidth,
        scrollHeight: html.scrollHeight,
        scrollWidth: html.scrollWidth,
        offsetHeight: html.offsetHeight
      },
      window: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerHeight: window.outerHeight === 0 ? html.clientHeight : window.outerHeight,
        outerWidth: window.outerWidth === 0 ? html.clientWidth : window.outerWidth,
        devicePixelRatio: typeof window.devicePixelRatio === 'undefined' ? 1 : window.devicePixelRatio,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      }
    }
  };
}
