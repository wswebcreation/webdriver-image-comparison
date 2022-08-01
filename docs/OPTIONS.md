# Options

## Plugin options

Plugin options are the options that can be set when the plugin is instantiated.

### `addressBarShadowPadding`

- **Type:** `number`
- **Mandatory:** No
- **Default:** `6`

The padding that needs to be added to the address bar on iOS and Android to do a proper cutout of the the viewport.

### `autoSaveBaseline`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`

If no baseline image is found during the comparison the image is automatically copied to the baseline folder when this is set to `true`

### `baselineFolder`

- **Type:** `any`
- **Mandatory:** No
- **Default:** `./wic/baseline/`

The directory that will hold all the baseline images that are used to during the comparison. If not set, the default value will be used. A function that accepts an option object can also be used to set the baselineFolder value:

```
  getFolder = type = options => {
    const testFolder = path.dirname(options.specs[0]);
    return path.join(testFolder, 'snapshots', type);
  };

  {
    baselineFolder: getFolder(options)
  }
```

### `clearRuntimeFolder`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`

Delete runtime folder (`actual` & `diff`) on initialisation

> **NOTE:**<br>
> This will only work when the [`screenshotPath`](#screenshotpath) is set through the plugin options, and **WILL NOT WORK** when you set the folders in the methods

### `disableCSSAnimation`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`

En/Disable all css animations and the input caret and the input caret in the application. If set to true all animations will be disabled before taking a screenshot
and reset when done

### `formatImageName`

- **Type:** `string`
- **Mandatory:** No
- **Default:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`

The name of the saved images can be customized by passing the parameter `formatImageName` with a format string like:

    {tag}-{browserName}-{width}x{height}-dpr-{dpr}

The following variables can be passed to format the string and will automatically been read from the instance capabilities.
If they can't be determined the defaults will be used.

- `browserName`: The name of the browser in the provided capabilities
- `browserVersion`: The version of the browser provided in the capabilities
- `deviceName`: The device name from the capabilities
- `dpr`: The device pixel ratio
- `height`: The height of the screen
- `logName`: The logName from capabilities
- `mobile`: This will add \_app, of browserName after the deviceName to distinguish app screenshots from browser screenshots
- `name`: The name from capabilities
- `platformName`: The name of the platform in the provided capabilities
- `platformVersion`: The version of the platform provided in the capabilities
- `tag`: The tag that is provided in the methods that is being called
- `width`: The width of the screen

#### `fullPageScrollTimeout`

- **Type:** `number`
- **Mandatory:** No
- **Default:** `1500`

The timeout in milliseconds to wait after a scroll. This might help identifying pages with lazy loading.

#### `hideScrollBars`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `true`

Hide scrollbars in the application. If set to true all scrollbars will be disabled before taking a screenshot. This is set to default `true` to prevent extra issues.

#### `isHybridApp`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`

Tell the module if the used app is an Hybrid app, this will not calculate the address bar height because it is not there.

### `logLevel`

- **Type:** `string`
- **Mandatory:** No
- **Default:** `info`

Adds extra logs, options are `debug | info | warn | silent`

Errors are always logged to the console.

### `savePerInstance`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no

Save the images per instance in a separate folder so for example all Chrome screenshots will be saved in a chrome folder like `desktop_chrome`.

### `screenshotPath`

- **Type:** `any`
- **Default:** `.tmp/`
- **Mandatory:** no

The directory that will hold all the actual / difference screenshots. If not set, the default value will be used. A function that
accepts an option object can also be used to set the screenshotPath value:

```
  getFolder = type = options => {
    const testFolder = path.dirname(options.specs[0]);
    return path.join(testFolder, 'snapshots', type);
  };

  {
    screenshotPath: getFolder(options)
  }
```

### `toolBarShadowPadding`

- **Type:** `number`
- **Mandatory:** No
- **Default:** `6` for Android and `15` for iOS (`6` by default and `9` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)

The padding that needs to be added to the toolbar bar on iOS and Android to do a proper cutout of the the viewport.

> **NOTE:**<br>
> This module also supports drawing the way a user would use his keyboard to _tab_ through the website by drawing lines and dots from tabbable element to tabbable element.<br>
> The work is inspired by [Viv Richards](https://github.com/vivrichards600) his blog post about ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br>
> The way tabbable elements are selected are based on the module [tabbable](https://github.com/davidtheclark/tabbable). If there are any issues regarding the tabbing please check the [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) and especially the [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)-section.

### `tabbableOptions`

- **Type:** `object`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The options that can be changed for the lines and dots if you use the `{save|check}Tabbable`-methods. The options are explained below.

#### `tabbableOptions.circle`

- **Type:** `object`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The options to change the circle.

##### `tabbableOptions.circle.backgroundColor`

- **Type:** `string`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The background color of the circle.

##### `tabbableOptions.circle.borderColor`

- **Type:** `string`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The border color of the circle.

##### `tabbableOptions.circle.borderWidth`

- **Type:** `number`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The border width of the circle.

##### `tabbableOptions.circle.fontColor`

- **Type:** `string`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The color of the font of the text in the circle. This will only be shown if [`showNumber`](./OPTIONS.md#tabbableoptionscircleshownumber) is set to `true`.

##### `tabbableOptions.circle.fontFamily`

- **Type:** `string`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The family of the font of the text in the circle. This will only be shown if [`showNumber`](./OPTIONS.md#tabbableoptionscircleshownumber) is set to `true`.

Make sure to set fonts that are supported by the browsers.

##### `tabbableOptions.circle.fontSize`

- **Type:** `number`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The size of the font of the text in the circle. This will only be shown if [`showNumber`](./OPTIONS.md#tabbableoptionscircleshownumber) is set to `true`.

##### `tabbableOptions.circle.size`

- **Type:** `number`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The size of the circle.

##### `tabbableOptions.circle.showNumber`

- **Type:** `showNumber`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

Show the tab sequence number in the circle.

#### `tabbableOptions.line`

- **Type:** `object`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The options to change the line.

##### `tabbableOptions.line.color`

- **Type:** `string`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The color of the line.

##### `tabbableOptions.line.width`

- **Type:** `number`
- **Mandatory:** No
- **Default:** See [here](../lib/helpers/constants.ts#L140) for all default values

The width of the line.

### Plugin compare options

The compare options can be set as plugin options, see [Compare options](./OPTIONS.md#compare-options)

## Method options

Methods options are the options that can be set per method. If the option has the same key as an options that has been set during the instantiation of the plugin, this method option will override the plugin option value.

### `saveElement`

#### `disableCSSAnimation`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`

En/Disable all css animations and the input caret in the application. If set to true all animations will be disabled before taking a screenshot
and reset when done

#### `hideScrollBars`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `true`

Hide scrollbars in the application. If set to true all scrollbars will be disabled before taking a screenshot. This is set to default `true` to prevent extra issues.

#### `hideElements`

- **Type:** `array`
- **Mandatory:** no

This methods can hide 1 or multiple elements by adding the property `visibility: hidden` to them by providing an array of elements.

#### `removeElements`

- **Type:** `array`
- **Mandatory:** no

This methods can _remove_ 1 or multiple elements by adding the property `display: none` to them by providing an array of elements.

#### `resizeDimensions`

- **Type:** `object`
- **Mandatory:** no
- **Default:** `{ top: 0, right: 0, bottom: 0, left: 0}`

An object that need to hold a `top`, `right`, `bottom` and a `left` amount of pixels that need to make the element cutout bigger.

### `saveScreen`

#### `disableCSSAnimation`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`

En/Disable all css animations and the input caret in the application. If set to true all animations will be disabled before taking a screenshot
and reset when done

#### `hideScrollBars`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `true`

Hide scrollbars in the application. If set to true all scrollbars will be disabled before taking a screenshot. This is set to default `true` to prevent extra issues.

#### `hideElements`

- **Type:** `array`
- **Mandatory:** no

This methods can hide 1 or multiple elements by adding the property `visibility: hidden` to them by providing an array of elements.

#### `removeElements`

- **Type:** `array`
- **Mandatory:** no

This methods can _remove_ 1 or multiple elements by adding the property `display: none` to them by providing an array of elements.

### `saveFullPageScreen` or `saveTabbablePage`

#### `disableCSSAnimation`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`

En/Disable all css animations and the input caret in the application. If set to true all animations will be disabled before taking a screenshot
and reset when done

#### `fullPageScrollTimeout`

- **Type:** `number`
- **Mandatory:** No
- **Default:** `1500`

The timeout in milliseconds to wait after a scroll. This might help identifying pages with lazy loading.

#### `hideScrollBars`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `true`

Hide scrollbars in the application. If set to true all scrollbars will be disabled before taking a screenshot. This is set to default `true` to prevent extra issues.

#### `hideElements`

- **Type:** `array`
- **Mandatory:** no

This methods can hide 1 or multiple elements by adding the property `visibility: hidden` to them by providing an array of elements.

#### `removeElements`

- **Type:** `array`
- **Mandatory:** no

This methods can _remove_ 1 or multiple elements by adding the property `display: none` to them by providing an array of elements.

#### `hideAfterFirstScroll`

- **Type:** `array`
- **Mandatory:** no

This methods will hide 1 or multiple elements by adding the property `visibility: hidden` to them by providing an array of elements.
This will be handy when a page for example holds sticky elements that will scroll with the page if the page is scrolled but will give an anoying effect when a fullpage screenshot is made

### `checkElement`

#### `blockOut`

- **Type:** `array`
- **Mandatory:** No
- **Default:** `[{height: 10, width: 5, x: 40, y: 65}, {height: 250, width: 500,x: 0,y: 35}]`

Block out array with x, y, width and height values. These block outs will be black areas on both images that will be excluded during comparison.
The values will automatically be transformed to the correct DPR-values.

#### `disableCSSAnimation`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`

En/Disable all css animations and the input caret in the application. If set to true all animations will be disabled before taking a screenshot
and reset when done

#### `hideScrollBars`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `true`

Hide scrollbars in the application. If set to true all scrollbars will be disabled before taking a screenshot. This is set to default `true` to prevent extra issues.

#### `hideElements`

- **Type:** `array`
- **Mandatory:** no

This methods can hide 1 or multiple elements by adding the property `visibility: hidden` to them by providing an array of elements.

#### `removeElements`

- **Type:** `array`
- **Mandatory:** no

This methods can _remove_ 1 or multiple elements by adding the property `display: none` to them by providing an array of elements.

#### `resizeDimensions`

- **Type:** `object`
- **Mandatory:** no
- **Default:** `{ top: 0, right: 0, bottom: 0, left: 0}`

An object that need to hold a `top`, `right`, `bottom` and a `left` amount of pixels that need to make the element cutout bigger.

### `checkElement` compare options

The compare options can be set as `checkElement` options, see [Compare options](./OPTIONS.md#compare-options)

### `checkScreen`

#### `blockOut`

- **Type:** `array`
- **Mandatory:** No
- **Default:** `[{height: 10, width: 5, x: 40, y: 65}, {height: 250, width: 500,x: 0,y: 35}]`

Block out array with x, y, width and height values. These block outs will be black areas on both images that will be excluded during comparison.
The values will automatically be transformed to the correct DPR-values.

#### `disableCSSAnimation`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`

En/Disable all css animations and the input caret in the application. If set to true all animations will be disabled before taking a screenshot
and reset when done

#### `hideScrollBars`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `true`

Hide scrollbars in the application. If set to true all scrollbars will be disabled before taking a screenshot. This is set to default `true` to prevent extra issues.

#### `hideElements`

- **Type:** `array`
- **Mandatory:** no

This methods can hide 1 or multiple elements by adding the property `visibility: hidden` to them by providing an array of elements.

#### `removeElements`

- **Type:** `array`
- **Mandatory:** no

This methods can _remove_ 1 or multiple elements by adding the property `display: none` to them by providing an array of elements.

### `checkScreen` compare options

The compare options can be set as `checkScreen` options, see [Compare options](./OPTIONS.md#compare-options)

### `checkFullPageScreen` or `checkTabbablePage`

#### `blockOut`

- **Type:** `array`
- **Mandatory:** No
- **Default:** `[{height: 10, width: 5, x: 40, y: 65}, {height: 250, width: 500,x: 0,y: 35}]`

Block out array with x, y, width and height values. These block outs will be black areas on both images that will be excluded during comparison.
The values will automatically be transformed to the correct DPR-values.

#### `disableCSSAnimation`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`

En/Disable all css animations and the input caret in the application. If set to true all animations will be disabled before taking a screenshot
and reset when done

#### `fullPageScrollTimeout`

- **Type:** `number`
- **Mandatory:** No
- **Default:** `1500`

The timeout in milliseconds to wait after a scroll. This might help identifying pages with lazy loading.

#### `hideScrollBars`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `true`

Hide scrollbars in the application. If set to true all scrollbars will be disabled before taking a screenshot. This is set to default `true` to prevent extra issues.

#### `hideElements`

- **Type:** `array`
- **Mandatory:** no

This methods can hide 1 or multiple elements by adding the property `visibility: hidden` to them by providing an array of elements.

#### `removeElements`

- **Type:** `array`
- **Mandatory:** no

This methods can _remove_ 1 or multiple elements by adding the property `display: none` to them by providing an array of elements.

#### `hideAfterFirstScroll`

- **Type:** `array`
- **Mandatory:** no

This methods will hide 1 or multiple elements by adding the property `visibility: hidden` to them by providing an array of elements.
This will be handy when a page for example holds sticky elements that will scroll with the page if the page is scrolled but will give an anoying effect when a fullpage screenshot is made

### `checkFullPageScreen` compare options

The compare options can be set as `checkFullPageScreen` options, see [Compare options](./OPTIONS.md#compare-options)

## Compare options

> **NOTE:** All compare options can also be used for `checkElement`,`checkScreen` and `checkFullPageScreen`.

Compare options are the options that can be set during instantiation of the plugin or per method. If the options has the same key as an option that has been set during the instantiation of the plugin, the method compare option will override the plugin compare option value.

### `ignoreAlpha`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Compare images and discard alpha.

### `blockOutSideBar`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can only be used for `checkScreen()`. It will override the plugin setting. This is **iPad only**_

Automatically block out the side bar for iPads in landscape mode during comparisons. This prevents failures on the tab/private/bookmark native component.

### `blockOutStatusBar`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting. This is **Mobile only**_

Automatically block out the status and address bar during comparisons. This prevents failures on time, wifi or battery status.

### `blockOutToolBar`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting. This is **Mobile only**_

Automatically block out the tool bar.

### `ignoreAntialiasing`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Compare images and discard anti aliasing.

### `ignoreColors`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Even though the images are in colour, the comparison wil compare 2 black/white images

### `ignoreLess`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Compare images and compare with `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Compare images and compare with `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `ignoreTransparentPixel`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Compare images and it will ignore all pixels that have some transparency in one of the images

### `rawMisMatchPercentage`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

If true the return percentage will be like `0.12345678`, default is `0.12`

### `returnAllCompareData`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

This will retun all compare data, not only the mismatch percentage

### `saveAboveTolerance`

- **Type:** `number`
- **Default:** `0`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Allowable value of misMatchPercentage that prevents saving image with differences

### `largeImageThreshold`

- **Type:** `number`
- **Default:** `0`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Comparing large images can lead to performance issues.
When providing a number for the amount of pixels here (higher then 0), the comparison algorithm skips pixels when the image width or height is larger than `largeImageThreshold` pixels.

### `scaleImagesToSameSize`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** no
- **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Scales 2 images to same size before execution of comparison. Highly recommended to enable `ignoreAntialiasing` and ignoreAlpha
