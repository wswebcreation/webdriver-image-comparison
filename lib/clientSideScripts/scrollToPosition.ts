// THIS CAN'T BE UNIT TESTED, BUT IS NOT CRITICAL, SO IGNORE IT
/* istanbul ignore file */

/**
 * Scroll to a x = 0 and y = variable position in the screen
 */
export default function scrollToPosition(yPosition:number):void {
	window.scrollTo(0, yPosition);
}
