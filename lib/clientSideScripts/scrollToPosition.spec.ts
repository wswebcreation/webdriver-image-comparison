import scrollToPosition from './scrollToPosition';

describe('scrollToPosition', () => {
  it('should check if the scrollTo function has been called', () => {
    window.scrollTo = jest.fn();
    scrollToPosition(150);
    expect(window.scrollTo).toBeCalledWith(0, 150);
  });
});
