//@ts-ignore
import * as resemble from './resemble';
import {CompareOptions} from '../methods/images.interfaces';
import {CompareData} from './compare.interfaces';

export default async function compareImages(image1: Buffer, image2: Buffer, options: CompareOptions):Promise<CompareData> {
  return new Promise((resolve, reject) => {
    resemble.compare(image1, image2, options, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
