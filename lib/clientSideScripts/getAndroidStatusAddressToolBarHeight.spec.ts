import {OFFSETS} from '../helpers/constants';
import {ANDROID_DEVICES, NAVIGATOR_APP_VERSIONS} from '../mocks/mocks';
import getAndroidStatusAddressToolBarHeight from './getAndroidStatusAddressToolBarHeight';

describe('getAndroidStatusAddressToolBarHeight', () => {
  it('should the the android status, address and toolbar height', () => {
    Object.defineProperty(navigator, 'appVersion', {value: NAVIGATOR_APP_VERSIONS.ANDROID['9']});
    Object.defineProperty(window.screen, 'width', {value: ANDROID_DEVICES.NEXUS_5X.width});
    Object.defineProperty(window.screen, 'height', {value: ANDROID_DEVICES.NEXUS_5X.height});
    Object.defineProperty(window, 'innerHeight', {value: ANDROID_DEVICES.NEXUS_5X.innerHeight});

    expect(getAndroidStatusAddressToolBarHeight(OFFSETS.ANDROID)).toMatchSnapshot();
  });
});
