/**
 * Hide the scrollbars
 */
export default function hideScrollBars(hide: boolean): void {
  if (hide) {
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.documentElement.style.overflow = '';
  }
}
