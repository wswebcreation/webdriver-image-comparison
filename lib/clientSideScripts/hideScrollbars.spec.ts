import hideScrollBars from './hideScrollbars';

describe('hideScrollBars', ()=>{
  it('should be able to hide and show the scrollbars', ()=>{
    expect(document.documentElement.style.overflow).toMatchSnapshot();

    hideScrollBars(true);

    expect(document.documentElement.style.overflow).toMatchSnapshot();

    hideScrollBars(false);

    expect(document.documentElement.style.overflow).toMatchSnapshot();
  });
});
