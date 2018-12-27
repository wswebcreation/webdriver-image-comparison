/**
 * Get the document scroll height, this means the actual height of the page from the top to the bottom of the DOM
 */
export default function getDocumentScrollHeight(): number {
  return document.documentElement.scrollHeight;
}
