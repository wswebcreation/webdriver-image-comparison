import {WebElement} from 'selenium-webdriver';

/**
 * Hide or remove elements on the page
 */
export default function hideRemoveElements(
  hideRemoveElements:
    {
      hide: (HTMLElement | HTMLElement[] | WebElement | WebElement[])[],
      remove: (HTMLElement | HTMLElement[])[],
    },
  hideRemove: boolean): any {

  hideRemoveElements.hide.forEach(element => {
    if (Array.isArray(element)) {
      return element.forEach((singleElement: HTMLElement | WebElement) => hideRemoveEl(singleElement, 'visibility', hideRemove));
    }
    hideRemoveEl(element, 'visibility', hideRemove, true);
  });

  hideRemoveElements.remove.forEach(element => {
    if (Array.isArray(element)) {
      return element.forEach((singleElement: HTMLElement | WebElement) => hideRemoveEl(singleElement, 'display', hideRemove));
    }
    hideRemoveEl(element, 'display', hideRemove, true);
  });

  function hideRemoveEl(el: HTMLElement | WebElement, prop: string, hideRemove: boolean, singleElement: boolean = false) {
    const value = prop === 'visibility' ? 'hidden' : 'none';
    try {
      // Here we get the HTMLElement, if this fails we have a WebElement
      // @ts-ignore
      el.style[prop] = hideRemove ? value : '';
    } catch (e) {
      /// Here we have the WebElement
      if (singleElement) {
        // @ts-ignore
        return document.querySelector(el.selector).style[prop] = hideRemove ? value : '';
      }

      // @ts-ignore
      return document.querySelectorAll(el.selector).forEach(singleEl => singleEl.style[prop] = hideRemove ? value : '');
    }
  }
}
