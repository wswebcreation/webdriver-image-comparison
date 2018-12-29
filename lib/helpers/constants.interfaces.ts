export interface AndroidOffsets {
  [key: number]: {
    // The height of the status bar
    STATUS_BAR: number;
    // The height of the address bar
    ADDRESS_BAR: number;
  };
}

export interface IosOffsets {
  [key: number]: {
    // The height of the status bar
    STATUS_BAR: number;
    // The height of the status bar for an iPad Pro
    STATUS_BAR_PRO: number;
    // The height of the status bar for an iPhone X#
    STATUS_BAR_X: number;
    // The height of the address bar
    ADDRESS_BAR: number;
    // The home bar data
    HOME_BAR: {
      // The default home bar data
      DEFAULT: {
        // The height of the home bar
        height: number;
        // The width of the home bar
        width: number;
        // The x position of the home bar
        x: number;
        // The y position of the home bar
        y: number;
      };
      // The large home bar data
      LARGE: {
        // The height of the home bar
        height: number;
        // The width of the home bar
        width: number;
        // The x position of the home bar
        x: number;
        // The y position of the home bar
        y: number;
      };
    }
  };
}
