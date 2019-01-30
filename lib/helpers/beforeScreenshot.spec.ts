import beforeScreenshot from './beforeScreenshot';

describe('beforeScreenshot', () => {
  it('should be able to return the enriched instance data with default options', async () => {
    const MOCKED_EXECUTOR = jest.fn().mockReturnValue('');

    const options = {
      instanceData: {
        browserName: 'browserName',
        deviceName: 'deviceName',
        logName: 'logName',
        name: 'name',
        nativeWebScreenshot: false,
        platformName: 'platformName',
      },
      addressBarShadowPadding: 6,
      disableCSSAnimation: true,
      noScrollBars: true,
      toolBarShadowPadding: 6,
    };

    expect(await beforeScreenshot(MOCKED_EXECUTOR, options)).toMatchSnapshot();
  });

  it('should be able to return the enriched instance data with `addShadowPadding: true`', async () => {
    const MOCKED_EXECUTOR = jest.fn().mockReturnValue('');

    const options = {
      instanceData: {
        browserName: 'browserName',
        deviceName: 'deviceName',
        logName: 'logName',
        name: 'name',
        nativeWebScreenshot: false,
        platformName: 'platformName',
      },
      addressBarShadowPadding: 6,
      disableCSSAnimation: true,
      noScrollBars: true,
      toolBarShadowPadding: 6,
    };

    expect(await beforeScreenshot(MOCKED_EXECUTOR, options, true)).toMatchSnapshot();
  });
});
