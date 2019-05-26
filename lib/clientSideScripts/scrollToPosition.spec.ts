import scrollToPosition from './scrollToPosition';

const CONFIGURABLE = {
  writable: true,
  configurable: true,
};

describe('scrollToPosition', () => {
  it('should check if the scrollTo function has been called', () => {
    window.scrollTo = jest.fn();
    scrollToPosition(150);
    expect(window.scrollTo).toBeCalledWith(0, 150);
  });

  it('should find the largest node if scrollTo does not work on the window', () => {
    window.scrollTo = jest.fn();
    Object.defineProperty(document.documentElement, 'scrollTop', {value: 150, ...CONFIGURABLE});
    document.body.innerHTML =
      '<div>' +
      '  <span style="height: 200px;width: 50px"/>' +
      '  <div style="height: 500px;width: 50px" />' +
      '</div>';

    scrollToPosition(150);
    // Some lines and the outcome can't be tested because we can't mock `scrollHeight` and `clientHeight`
  });
});
