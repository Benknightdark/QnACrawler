import { jj ,SecondSiteCrawler} from './src/SecondSite';
import { ThirdSiteCrawler } from './src/thirdSite';
import {  fourthSiteCrawler } from './src/fourthSite';
import { doMerFile } from './src/Helpers/mergFileHelper';
import { fifthSiteCrawler } from './src/fifthSite';
process.setMaxListeners(0);

(async()=>{
   // await letgo;
  //  await firstsite;
 // await SecondSiteCrawler();
 //---------------------------------------------
  await ThirdSiteCrawler();
  await fourthSiteCrawler();
await fifthSiteCrawler();
 await doMerFile();
})()