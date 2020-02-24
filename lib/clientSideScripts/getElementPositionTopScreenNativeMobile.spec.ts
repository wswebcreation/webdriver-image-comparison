import {IOS_DEVICES, CONFIGURABLE} from '../mocks/mocks';
import {getElementPositionTopScreenNativeMobile} from './getElementPositionTopScreenNativeMobile';

describe('getElementPositionTopScreenNativeMobile', () => {
  beforeEach(()=>{
    Object.defineProperty(window.screen, 'width', {value: IOS_DEVICES.IPHONE.width, ...CONFIGURABLE});
    Object.defineProperty(window.screen, 'height', {value: IOS_DEVICES.IPHONE.height, ...CONFIGURABLE});
    // @ts-ignore
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 120,
        height: 120,
        top: 10,
        left: 100,
        bottom: 5,
        right: 12,
      };
    });
    document.body.innerHTML =
      '<div>' +
      '  <span id="username">Hello</span>' +
      '</div>';
  });

  it('should get the element position to the top of the screen for a mobile browser', () => {
    Object.defineProperty(window, 'innerHeight', {value: IOS_DEVICES.IPHONE.innerHeight, ...CONFIGURABLE});

    expect(getElementPositionTopScreenNativeMobile(94, document.querySelector('#username'))).toMatchSnapshot();
  });

  it('should get the element position to the top of the screen for an app in portrait mode', () => {
    Object.defineProperty(window, 'innerHeight', {value: IOS_DEVICES.IPHONE.height, ...CONFIGURABLE});

    expect(getElementPositionTopScreenNativeMobile(94, document.querySelector('#username'))).toMatchSnapshot();
  });

  it('should get the element position to the top of the screen for an app in landscape mode', () => {
    Object.defineProperty(window, 'innerHeight', {value: IOS_DEVICES.IPHONE.width, ...CONFIGURABLE});

    expect(getElementPositionTopScreenNativeMobile(94, document.querySelector('#username'))).toMatchSnapshot();
  });
});
