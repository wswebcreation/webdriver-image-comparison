import getDocumentScrollHeight from './getDocumentScrollHeight';

describe('getDocumentScrollHeight', () => {
  it('should check if the document.documentElement.scrollHeight function has been called', () => {
    getDocumentScrollHeight();
    // I can't verify the call of the document.documentElement.scrollHeight with Jest, so there is no verification here, sorry :(
    // If you know a way, please add it here ;-)
  });
});
