import { jj ,SecondSiteCrawler} from './src/SecondSite';
import { ThirdSiteCrawler } from './src/thirdSite';
import {  fourthSiteCrawler } from './src/fourthSite';
import { doMerFile } from './src/Helpers/mergFileHelper';
import { fifthSiteCrawler } from './src/fifthSite';
import { getCatList, crawlSixthSite } from './src/sixthSite';
import { crawlSeventhSite } from './src/seventhSite';
import { crawlEighthSite } from './src/eighthSIte';
process.setMaxListeners(0);

(async()=>{
   // await letgo;
  //  await firstsite;
 // await SecondSiteCrawler();
  //   await ThirdSiteCrawler();

 //------------------上面都是在作業配的資料---------------------
 await crawlEighthSite();

  await crawlSixthSite();
    await fourthSiteCrawler();
  await fifthSiteCrawler();
await crawlSeventhSite();
   await doMerFile();
})()