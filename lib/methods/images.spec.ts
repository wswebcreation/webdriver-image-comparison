// import {join} from 'path';
// import {pathExistsSync, removeSync} from 'fs-extra';
// import {checkBaselineImageExists} from './images';
//
// describe('images', () => {
//   const baselineFolder = join(process.cwd(), '/.tmp/baselineFolder');
//
//   afterEach(() => removeSync(baselineFolder));
//
//   describe('checkBaselineImageExists', () => {
//     it('should check if the baseline image exists and not create a new one', async () => {
//       let actualFilePath = join(process.cwd(), '/package.json');
//       const baselineFilePath = `${baselineFolder}/package.json`;
//       const autoSaveBaseline = false;
//
//       expect(pathExistsSync(baselineFilePath)).toMatchSnapshot();
//       await expect(checkBaselineImageExists(actualFilePath, baselineFilePath, autoSaveBaseline)).rejects.toContain(
//         `Baseline image not found, save the actual image manually to the baseline.`);
//       expect(pathExistsSync(baselineFilePath)).toMatchSnapshot();
//     });
//
//     it('should check if the baseline image exists and create a new one', async () => {
//       let actualFilePath = join(process.cwd(), '/package.json');
//       const baselineFilePath = `${baselineFolder}/package.json`;
//       const autoSaveBaseline = true;
//
//       expect(pathExistsSync(baselineFilePath)).toMatchSnapshot();
//       await checkBaselineImageExists(actualFilePath, baselineFilePath, autoSaveBaseline);
//       expect(pathExistsSync(baselineFilePath)).toMatchSnapshot();
//     });
//   });
// });
