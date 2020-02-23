import {ScreenshotOutput} from '../helpers/afterScreenshot.interfaces';
import {Methods} from '../methods/methods.interface';
import {InstanceData} from '../methods/instanceData.interfaces';
import {Folders} from '../base.interface';
import drawTabbableOnCanvas from "../clientSideScripts/drawTabbableOnCanvas";
import saveFullPageScreen from "./saveFullPageScreen";
import {SaveTabbableOptions} from "./tabbable.interfaces";
import removeElementFromDom from "../clientSideScripts/removeElementFromDom";

/**
 * Saves an image of all tab executions
 */
export default async function saveTabbable(
  methods: Methods,
  instanceData: InstanceData,
  folders: Folders,
  tag: string,
  saveTabbableOptions: SaveTabbableOptions,
): Promise<ScreenshotOutput> {

  // 1. Inject drawing the tabbables
  await methods.executor(drawTabbableOnCanvas, saveTabbableOptions.wic.tabbableOptions);

  // 2. Create the screenshot
  const fullPageData = await  saveFullPageScreen(methods, instanceData, folders, tag, saveTabbableOptions);

  // 3. Remove the canvas
  await methods.executor(removeElementFromDom, 'wic-tabbable-canvas');

  // 4. Return the data
  return fullPageData;
}
