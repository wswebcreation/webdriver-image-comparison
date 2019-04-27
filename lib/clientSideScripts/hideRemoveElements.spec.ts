import hideRemoveElements from './hideRemoveElements';

describe('hideRemoveElements', () => {
  it('should be able to hide elements and put them back again', () => {
    document.body.innerHTML =
      '<div>' +
      '   <span id="id-1">Hello</span>' +
      '   <span id="id-2">Hello</span>' +
      '   <div>' +
      '     <span id="id-3">Hello</span>' +
      '     <span id="id-4">Hello</span>' +
      '  </div>' +
      '</div>';

    // Check not hidden
    expect((<HTMLElement>document.querySelector('#id-1')).style.visibility).toMatchSnapshot();
    expect((<HTMLElement>document.querySelector('#id-3')).style.visibility).toMatchSnapshot();

    hideRemoveElements({
        hide: [document.querySelector('#id-1'), document.querySelector('#id-3')],
        remove: [],
      },
      true,
    );

    // Check hidden
    expect((<HTMLElement>document.querySelector('#id-1')).style.visibility).toMatchSnapshot();
    expect((<HTMLElement>document.querySelector('#id-3')).style.visibility).toMatchSnapshot();

    hideRemoveElements({
        hide: [document.querySelector('#id-1'), document.querySelector('#id-3')],
        remove: [],
      },
      false,
    );

    // Check not hidden
    expect((<HTMLElement>document.querySelector('#id-1')).style.visibility).toMatchSnapshot();
    expect((<HTMLElement>document.querySelector('#id-3')).style.visibility).toMatchSnapshot();
  });

  it('should be able to remove elements and put them back again', () => {
    document.body.innerHTML =
      '<div>' +
      '   <span id="id-1">Hello</span>' +
      '   <span id="id-2">Hello</span>' +
      '   <div>' +
      '     <span id="id-3">Hello</span>' +
      '     <span id="id-4">Hello</span>' +
      '  </div>' +
      '</div>';

    // Check not removed
    expect((<HTMLElement>document.querySelector('#id-2')).style.display).toMatchSnapshot();
    expect((<HTMLElement>document.querySelector('#id-4')).style.display).toMatchSnapshot();

    hideRemoveElements({
        hide: [],
        remove: [document.querySelector('#id-2'), document.querySelector('#id-4')],
      },
      true,
    );

    // Check removed
    expect((<HTMLElement>document.querySelector('#id-2')).style.display).toMatchSnapshot();
    expect((<HTMLElement>document.querySelector('#id-4')).style.display).toMatchSnapshot();

    hideRemoveElements({
        remove: [document.querySelector('#id-2'), document.querySelector('#id-4')],
        hide: [],
      },
      false,
    );

    // Check not removed
    expect((<HTMLElement>document.querySelector('#id-2')).style.display).toMatchSnapshot();
    expect((<HTMLElement>document.querySelector('#id-4')).style.display).toMatchSnapshot();
  });
});
