/**
 * Hide or remove elements on the page
 */
export default function hideRemoveElements(hideRemoveElements: { hide: HTMLElement[], remove: HTMLElement[] }, hideRemove: boolean): void {
  hideRemoveElements.hide.forEach(element => element.style.visibility = hideRemove ? 'hidden' : '');
  hideRemoveElements.remove.forEach(element => element.style.display = hideRemove ? 'none' : '');
}
