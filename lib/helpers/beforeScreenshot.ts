import hideScrollBars from '../clientSideScripts/hideScrollbars';
import setCustomCss from '../clientSideScripts/setCustomCss';
import {CUSTOM_CSS_ID} from './constants';
import {getAddressBarShadowPadding, getToolBarShadowPadding} from './utils';
import getEnrichedInstanceData from '../methods/instanceData';
import {BeforeScreenshotOptions, BeforeScreenshotResult} from './beforeScreenshot.interface';
import {Executor} from '../methods/methods.interface';
import hideRemoveElements from '../clientSideScripts/hideRemoveElements';

/**
 * Methods that need to be executed before a screenshot will be taken
 */
export default async function beforeScreenshot(
  executor: Executor,
  options: BeforeScreenshotOptions,
  addShadowPadding: boolean = false
): Promise<BeforeScreenshotResult> {

  const {browserName, nativeWebScreenshot, platformName} = options.instanceData;
  const {
    addressBarShadowPadding,
    disableCSSAnimation,
    hideElements,
    noScrollBars,
    removeElements,
    toolBarShadowPadding,
  } = options;
  const addressBarPadding = getAddressBarShadowPadding({
    platformName,
    browserName,
    nativeWebScreenshot,
    addressBarShadowPadding,
    addShadowPadding,
  });
  const toolBarPadding = getToolBarShadowPadding({platformName, browserName, toolBarShadowPadding, addShadowPadding});

  // Hide the scrollbars
  await executor(hideScrollBars, noScrollBars);

  // Hide and or Remove elements
  if (hideElements.length > 0 || removeElements.length > 0) {
    await executor(hideRemoveElements, {hide: hideElements, remove: removeElements}, true);
  }

  // Set some custom css
  await executor(setCustomCss, {addressBarPadding, disableCSSAnimation, id: CUSTOM_CSS_ID, toolBarPadding});

  // Get all the needed instance data
  const instanceOptions = {
    addressBarShadowPadding: options.addressBarShadowPadding,
    toolBarShadowPadding: options.toolBarShadowPadding,
    ...(options.instanceData),
  };

  return getEnrichedInstanceData(executor, instanceOptions, addShadowPadding);
}
