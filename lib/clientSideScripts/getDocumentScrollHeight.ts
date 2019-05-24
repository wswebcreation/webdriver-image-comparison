/**
 * Get the document scroll height, this means the actual height of the page from the top to the bottom of the DOM
 */
export default function getDocumentScrollHeight(): number {
  const viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const scrollHeight = document.documentElement.scrollHeight;
  const bodyScrollHeight = document.body.scrollHeight;

  // In some situations the default scrollheight can be equal to the viewport height
  // but the body scroll height can be different, then return that one
  if ((viewPortHeight === scrollHeight) && (bodyScrollHeight > scrollHeight)) {
    return bodyScrollHeight;
  }

  // In some cases we can have a challenge determining the height of the page
  // due to for example a `vh` property on the body element.
  // If that is the case we need to walk over all the elements and determine the highest element
  // this is a very time consuming thing, so our last hope :(
  if (bodyScrollHeight === scrollHeight && bodyScrollHeight === viewPortHeight){
    let pageHeight = 0;

    // @ts-ignore
    function findHighestNode(nodesList: any) {
      for (var i = nodesList.length - 1; i >= 0; i--) {
        if (nodesList[i].scrollHeight && nodesList[i].clientHeight) {
          var elHeight = Math.max(nodesList[i].scrollHeight, nodesList[i].clientHeight);
          pageHeight = Math.max(elHeight, pageHeight);
        }
        if (nodesList[i].childNodes.length) {
          findHighestNode(nodesList[i].childNodes);
        }
      }
    }

    findHighestNode(document.documentElement.childNodes);

    return pageHeight;
  }

  // The scrollHeight is good enough
  return scrollHeight;
}
