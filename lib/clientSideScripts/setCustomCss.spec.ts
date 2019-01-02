import {CssOptions} from './customCss.interfaces';
import setCustomCss from './setCustomCss';

describe('setCustomCss', () => {
  it('should be able to set the custom css with the default options', () => {
    const cssOptions:CssOptions = {
      addressBarPadding:6,
      disableCSSAnimation:false,
      id:'id',
      toolBarPadding:6,
    };

    expect(document.head.textContent).toMatchSnapshot();

    setCustomCss(cssOptions);

    expect(document.head.textContent).toMatchSnapshot();
  });

  it('should be able to set the custom css with the animations disabled', () => {
    const cssOptions:CssOptions = {
      addressBarPadding:6,
      disableCSSAnimation:true,
      id:'id',
      toolBarPadding:6,
    };

    expect(document.head.textContent).toMatchSnapshot();

    setCustomCss(cssOptions);

    expect(document.head.textContent).toMatchSnapshot();
  });

  it('should be able to set the custom css with the with padding set to 0', () => {
    const cssOptions:CssOptions = {
      addressBarPadding:0,
      disableCSSAnimation:true,
      id:'id',
      toolBarPadding:0,
    };

    expect(document.head.textContent).toMatchSnapshot();

    setCustomCss(cssOptions);

    expect(document.head.textContent).toMatchSnapshot();
  });
});
