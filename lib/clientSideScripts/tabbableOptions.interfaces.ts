export interface TabbableOptions {
  circle?: CircleOptions;
  line?: LineOptions;
}

export interface CircleOptions {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  fontColor?: string;
  fontFamily?: string;
  fontSize?: number;
  size?: number;
  showNumber?: boolean;
}

export interface LineOptions {
  color?: string;
  width?: number;
}

export interface ElementCoordinate {
  x: number;
  y: number;
}
