/**
 * Hide the scrollbars
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
