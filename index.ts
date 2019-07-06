import { jj ,SecondSiteCrawler} from './src/SecondSite';
import { ThirdSiteCrawler } from './src/thirdSite';
import {  fourthSiteCrawler } from './src/fourthSite';
import { doMerFile } from './src/Helpers/mergFileHelper';
import { fifthSiteCrawler } from './src/fifthSite';
import { getCatList, crawlSixthSite } from './src/sixthSite';
import { crawlSeventhSite } from './src/seventhSite';
process.setMaxListeners(0);

(async()=>{
   // await letgo;
  //  await firstsite;
 // await SecondSiteCrawler();
 //---------------------------------------------
//  await crawlSixthSite();
//    await ThirdSiteCrawler();
//    await fourthSiteCrawler();
//  await fifthSiteCrawler();
await crawlSeventhSite();
//   await doMerFile();
})()