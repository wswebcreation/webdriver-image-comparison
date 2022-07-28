import { RectanglesOutput } from '../methods/rectangles.interfaces';

export interface StatusAddressToolBarOffsets {
  isLandscape?: boolean;
  safeArea?: number;
  statusAddressBar: RectanglesOutput;
  toolBar: RectanglesOutput;
}
