import { RectanglesOutput } from '../methods/rectangles.interfaces';

export interface StatusAddressToolBarOffsets {
  safeArea: number;
  screenHeight: number;
  screenWidth: number;
  sideBarWidth: number;
  statusAddressBar: RectanglesOutput;
  toolBar: RectanglesOutput;
}
