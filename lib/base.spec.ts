import BaseClass from './base';

describe('BaseClass', () => {
  it('should be able to create BaseClass with options', () => {
    const instance = new BaseClass({
      baselineFolder: './subfolder//../baseline',
      screenshotPath: './../my_folder//screenshots'
    });
    expect(instance.folders.actualFolder).toBe('../my_folder/screenshots/actual');
    expect(instance.folders.baselineFolder).toBe('baseline');
    expect(instance.folders.diffFolder).toBe('../my_folder/screenshots/diff');
  });

  it('should be able to create BaseClass with default options', () => {
    const instance = new BaseClass({});
    expect(instance.folders.actualFolder).toBe('.tmp/actual');
    expect(instance.folders.baselineFolder).toBe('wic/baseline/');
    expect(instance.folders.diffFolder).toBe('.tmp/diff');
  });
});
