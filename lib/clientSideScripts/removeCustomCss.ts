/**
 * Remove the custom style that has been added
 */
export default function removeCustomCss(id: string): void {
  const elem = document.querySelector(`style#${id}`);
  if (elem != null) {
    elem.parentNode.removeChild(elem);
  }
}
