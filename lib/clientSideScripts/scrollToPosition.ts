/**
 * Scroll to a x = 0 and y = variable position in the screen
 * Sometimes a scroll can't be done on the window, so the scroll needs to be done on the largest
 * element on the screen
 */
export default function scrollToPosition(yPosition: number): void {
  const initialScroll = document.documentElement.scrollTop;

  // If for some reason the scroll didn't work, find the first largest element and use that to scroll on
  let largestNode: HTMLElement;

  // Scroll with the default way of scrolling
  window.scrollTo(0, yPosition);

  /* istanbul ignore else */
  if (initialScroll === document.documentElement.scrollTop && yPosition > 0) {
    largestFirstNode(document.documentElement.childNodes).scrollTo(0, yPosition);
  }

  /**
   * Find the first largest node in the page so it  can be used for scrolling
   */
  function largestFirstNode(nodesList: any) {
    let node: HTMLElement;

    // Loop over the nodes
    for (let i = nodesList.length - 1; i >= 0; i--) {
      node = nodesList[i];

      // Stop if the largest node has been found
      /* istanbul ignore next */
      if (largestNode) {
        break;
      }

      // Check if the element has a scroll / client height
      /* istanbul ignore next */
      if (node.scrollHeight && node.clientHeight) {
        const viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const elHeight = Math.max(node.scrollHeight, node.clientHeight);

        // If the element is bigger than the viewport, then we got our scroll container
        if (elHeight > viewPortHeight) {
          largestNode = node;
          break;
        }
      }

      if (node.childNodes.length) {
        largestFirstNode(node.childNodes);
      }
    }

    // If the largestNode is the body then return the window
    return (document.body === largestNode || !largestNode) ? window : largestNode;
  }
}
