/**
 * Hide the scrollbars
 *
 * There is a `try/catch` for this issue
 * https://github.com/wswebcreation/webdriver-image-comparison/issues/30
 * Some browsers don't wrap XML into a body element, so this will fail
 */
export default function hideScrollBars(hide: boolean): void {
  try {
    if (hide) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  } catch (e) {
    // Do nothing
  }
}
