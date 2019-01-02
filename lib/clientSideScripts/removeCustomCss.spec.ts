import removeCustomCss from './removeCustomCss';

describe('removeCustomCss', ()=>{
  it('should be able to remove the custom css', ()=>{
    // Set up our document body
    const id = 'test';
    const cssText = 'body:{width:100%}';
    const head = document.head || document.getElementsByTagName('head')[ 0 ];
    const style = document.createElement('style');

    style.id = id;
    style.appendChild(document.createTextNode(cssText));
    head.appendChild(style);

    expect(document.head.textContent).toMatchSnapshot();

    removeCustomCss(id);

    expect(document.head.textContent).toMatchSnapshot();
  });
});
