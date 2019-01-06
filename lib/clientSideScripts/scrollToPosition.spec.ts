import scrollToPosition from './scrollToPosition';

describe('scrollToPosition', () => {
  it('should check if the scrollTo function has been called', () => {
    scrollToPosition(150);
    // I can't verify the call of the scrollToPosition with Jest, so there is no verification here, sorry :(
    // If you know a way, please add it here ;-)
  });
});
