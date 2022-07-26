import { IOS_DEVICES, NAVIGATOR_APP_VERSIONS, CONFIGURABLE } from '../mocks/mocks';
import getIosStatusAddressToolBarOffsets from './getIosStatusAddressToolBarOffsets';
import { IOS_OFFSETS } from '../helpers/constants';

describe('getIosStatusAddressToolBarOffsets', () => {
  it('should get the correct status, address and toolbar height for a default iPhone with iOS 14 in Portrait mode', () => {
    setEnvironment('IOS', 14, 'IPHONE', false);

    expect(getIosStatusAddressToolBarOffsets(IOS_OFFSETS)).toMatchSnapshot();
  });

  it('should get the correct status, address and toolbar height for a default iPhone with iOS 14 in landscape mode', () => {
    setEnvironment('IOS', 14, 'IPHONE', true);

    expect(getIosStatusAddressToolBarOffsets(IOS_OFFSETS)).toMatchSnapshot();
  });

  it('should get the correct status, address and toolbar height for a default iPhone with iOS 15 in portrait mode', () => {
    setEnvironment('IOS', 15, 'IPHONE_X', false);

    expect(getIosStatusAddressToolBarOffsets(IOS_OFFSETS)).toMatchSnapshot();
  });

  it('should get the correct status, address and toolbar height for a default iPhone with iOS 15 in landscape mode', () => {
    setEnvironment('IOS', 15, 'IPHONE_X', true);

    expect(getIosStatusAddressToolBarOffsets(IOS_OFFSETS)).toMatchSnapshot();
  });

  it('should get the correct status, address and toolbar height for an iPhone with extreme not known dimensions', () => {
    setEnvironment('IOS', 15, 'IPHONE_HEIGHT', false);

    expect(getIosStatusAddressToolBarOffsets(IOS_OFFSETS)).toMatchSnapshot();
  });

  it('should get the correct status, address and toolbar height for an iPad', () => {
    setEnvironment('IOS', 15, 'IPAD', false);

    expect(getIosStatusAddressToolBarOffsets(IOS_OFFSETS)).toMatchSnapshot();
  });

  // it('should get the correct status, address and toolbar height for an iPad with iPadOS 13', () => {
  //   setEnvironment('IPADOS', 13, 'IPAD', false);

  //   expect(getIosStatusAddressToolBarOffsets(IOS_OFFSETS)).toMatchSnapshot();
  // });

  // it('should get the correct status, address and toolbar height for an iPad Pro with to touch id and with iOS 12', () => {
  //   setEnvironment('IOS', 12, 'IPAD_NO_TOUCH', false);

  //   expect(getIosStatusAddressToolBarOffsets(IOS_OFFSETS)).toMatchSnapshot();
  // });
});

/**
 * Set the environment for the test
 */
function setEnvironment(os: string, version: number, phone: string, isLandscape: boolean) {
  // @ts-ignore
  Object.defineProperty(navigator, 'appVersion', { value: NAVIGATOR_APP_VERSIONS[os][version], ...CONFIGURABLE });
  // @ts-ignore
  Object.defineProperty(window.screen, 'width', { value: IOS_DEVICES[phone].width, ...CONFIGURABLE });
  // @ts-ignore
  Object.defineProperty(window.screen, 'height', { value: IOS_DEVICES[phone].height, ...CONFIGURABLE });
  // @ts-ignore
  Object.defineProperty(window, 'innerWidth', { value: IOS_DEVICES[phone].innerWidth, ...CONFIGURABLE });
  // @ts-ignore
  Object.defineProperty(window, 'innerHeight', { value: IOS_DEVICES[phone].innerHeight, ...CONFIGURABLE });
  // @ts-ignore
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation(() => ({
      matches: isLandscape,
    })),
    ...CONFIGURABLE,
  });
}
