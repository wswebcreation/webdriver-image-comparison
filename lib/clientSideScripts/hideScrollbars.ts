/**
 * Hide the scrollbars
 */
export default function hideScrollBars(hide: boolean): void {
  if (hide) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}
