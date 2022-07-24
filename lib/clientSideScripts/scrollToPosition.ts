/**
 * Scroll to y = variable position in the screen
 */
/* istanbul ignore next */
export default function scrollToPosition(yPosition: number): void {
  let element;
  const htmlNode = document.querySelector('html');
  const bodyNode = document.querySelector('body');

  if (htmlNode.scrollHeight > htmlNode.clientHeight) {
    element = htmlNode;
  } else if (bodyNode.scrollHeight > bodyNode.clientHeight) {
    element = bodyNode;
  } else {
    element = document.scrollingElement || document.documentElement;
  }

  element.scrollTop = yPosition;
}
