/**
 * Scroll to y = variable position in the screen
 */
/* istanbul ignore next */
export default function scrollToPosition(yPosition: number): void {
  // Scroll with the default way of scrolling
  (document.scrollingElement || document.documentElement).scrollTop = yPosition;
}
