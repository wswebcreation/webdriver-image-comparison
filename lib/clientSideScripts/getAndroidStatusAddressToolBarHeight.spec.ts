import { OFFSETS } from '../helpers/constants';
import { ANDROID_DEVICES, NAVIGATOR_APP_VERSIONS, CONFIGURABLE } from '../mocks/mocks';
import getAndroidStatusAddressToolBarHeight from './getAndroidStatusAddressToolBarHeight';

describe('getAndroidStatusAddressToolBarHeight', () => {
  beforeAll(() => {
    Object.defineProperty(window.screen, 'width', { value: ANDROID_DEVICES.NEXUS_5X.width });
    Object.defineProperty(window.screen, 'height', { value: ANDROID_DEVICES.NEXUS_5X.height });
    Object.defineProperty(window, 'innerHeight', { value: ANDROID_DEVICES.NEXUS_5X.innerHeight });
  });

  it('should get the android status, address and toolbar height with only a major version in the navigator', () => {
    Object.defineProperty(navigator, 'appVersion', { value: NAVIGATOR_APP_VERSIONS.ANDROID['9'], ...CONFIGURABLE });

    expect(getAndroidStatusAddressToolBarHeight(OFFSETS.ANDROID, false)).toMatchSnapshot();
  });

  it('should get the android status, address and toolbar height with major and minor version in the navigator', () => {
    Object.defineProperty(navigator, 'appVersion', { value: NAVIGATOR_APP_VERSIONS.ANDROID['8'], ...CONFIGURABLE });

    expect(getAndroidStatusAddressToolBarHeight(OFFSETS.ANDROID, false)).toMatchSnapshot();
  });

  it('should get the android status, address and toolbar height with major, minor and patch version in the navigator', () => {
    Object.defineProperty(navigator, 'appVersion', { value: NAVIGATOR_APP_VERSIONS.ANDROID['7'], ...CONFIGURABLE });

    expect(getAndroidStatusAddressToolBarHeight(OFFSETS.ANDROID, false)).toMatchSnapshot();
  });

  it('should set the default toolbar height when the toolbar height will become negative', () => {
    Object.defineProperty(navigator, 'appVersion', { value: NAVIGATOR_APP_VERSIONS.ANDROID['7'], ...CONFIGURABLE });
    Object.defineProperty(window, 'innerHeight', { value: 800 });

    expect(getAndroidStatusAddressToolBarHeight(OFFSETS.ANDROID, true)).toMatchSnapshot();
  });
});
