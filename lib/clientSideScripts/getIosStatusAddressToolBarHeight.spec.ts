import {IOS_DEVICES, NAVIGATOR_APP_VERSIONS} from '../../mocks/mocks';
import getIosStatusAddressToolBarHeight from './getIosStatusAddressToolBarHeight';
import {OFFSETS} from '../helpers/constants';

const CONFIGURABLE = {
  writable: true,
  configurable: true,
};

describe('getIosStatusAddressToolBarHeight', () => {
  it('should get the correct status, address and toolbar height for an iPhone with iOS 10', () => {
    setEnvironment(10, 'IPHONE');

    expect(getIosStatusAddressToolBarHeight(OFFSETS.IOS)).toMatchSnapshot();
  });

  it('should get the correct toolbar height for an iPhone with iOS 12 that has been scrolled', () => {
    setEnvironment(12, 'IPHONE');
    Object.defineProperty(window, 'innerHeight', {value: 598, ...CONFIGURABLE});

    expect(getIosStatusAddressToolBarHeight(OFFSETS.IOS)).toMatchSnapshot();
  });

  it('should get the correct status, address and toolbar height for an iPhone X with iOS 11', () => {
    setEnvironment(11, 'IPHONE_X');

    expect(getIosStatusAddressToolBarHeight(OFFSETS.IOS)).toMatchSnapshot();
  });

  it('should get the correct homebar as toolbar height for an iPhone X with iOS 12 that has been scrolled', () => {
    setEnvironment(12, 'IPHONE_X');
    Object.defineProperty(window, 'innerHeight', {value: 718, ...CONFIGURABLE});

    expect(getIosStatusAddressToolBarHeight(OFFSETS.IOS)).toMatchSnapshot();
  });

  it('should get the correct status, address and toolbar height for an iPhone XS Max with iOS 12', () => {
    setEnvironment(12, 'IPHONE_XS_MAX');

    expect(getIosStatusAddressToolBarHeight(OFFSETS.IOS)).toMatchSnapshot();
  });

  it('should get the correct homebar as toolbar height for an iPhone XS MAx with iOS 12 that has been scrolled', () => {
    setEnvironment(12, 'IPHONE_XS_MAX');
    Object.defineProperty(window, 'innerHeight', {value: 802, ...CONFIGURABLE});

    expect(getIosStatusAddressToolBarHeight(OFFSETS.IOS)).toMatchSnapshot();
  });

  it('should get the correct status, address and toolbar height for an iPad with iOS 12', () => {
    setEnvironment(12, 'IPAD');

    expect(getIosStatusAddressToolBarHeight(OFFSETS.IOS)).toMatchSnapshot();
  });

  it('should get the correct status, address and toolbar height for an iPad Pro with to touch id and with iOS 12', () => {
    setEnvironment(12, 'IPAD_NO_TOUCH');

    expect(getIosStatusAddressToolBarHeight(OFFSETS.IOS)).toMatchSnapshot();
  });
});


/**
 * Set the environment for the test
 */
function setEnvironment(ios:number, phone: string){
  // @ts-ignore
  Object.defineProperty(navigator, 'appVersion', {value: NAVIGATOR_APP_VERSIONS.IOS[ios], ...CONFIGURABLE});
  // @ts-ignore
  Object.defineProperty(window.screen, 'width', {value: IOS_DEVICES[phone].width, ...CONFIGURABLE});
  // @ts-ignore
  Object.defineProperty(window.screen, 'height', {value: IOS_DEVICES[phone].height, ...CONFIGURABLE});
  // @ts-ignore
  Object.defineProperty(window, 'innerWidth', {value: IOS_DEVICES[phone].innerWidth, ...CONFIGURABLE});
  // @ts-ignore
  Object.defineProperty(window, 'innerHeight', {value: IOS_DEVICES[phone].innerHeight, ...CONFIGURABLE});
}
