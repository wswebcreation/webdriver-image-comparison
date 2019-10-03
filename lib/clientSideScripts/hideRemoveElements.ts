/**
 * Hide or remove elements on the page
 */
export default function hideRemoveElements(
  hideRemoveElements:
    {
      hide: (HTMLElement | HTMLElement[])[],
      remove: (HTMLElement | HTMLElement[])[],
    },
  hideRemove: boolean): void {

  hideRemoveElements.hide.forEach(element => {
    if (Array.isArray(element)) {
      return element.forEach(singleElement => {
        singleElement.style.visibility = hideRemove ? 'hidden' : '';
      });
    }

    return element.style.visibility = hideRemove ? 'hidden' : '';
  });

  hideRemoveElements.remove.forEach(element => {
    if (Array.isArray(element)) {
      return element.forEach(singleElement => singleElement.style.display = hideRemove ? 'none' : '');
    }

    return element.style.display = hideRemove ? 'none' : '';
  });
}
