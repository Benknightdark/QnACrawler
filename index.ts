import { jj, SecondSiteCrawler } from './src/SecondSite';
import { ThirdSiteCrawler } from './src/thirdSite';
import { fourthSiteCrawler } from './src/fourthSite';
import { doMerFile, mergeJsonFile } from './src/Helpers/mergFileHelper';
import { fifthSiteCrawler } from './src/fifthSite';
import { getCatList, crawlSixthSite } from './src/sixthSite';
import { crawlSeventhSite } from './src/seventhSite';
import { crawlEighthSite } from './src/eighthSIte';
import { crawlNinthSite } from './src/nithSIte';
import { crawlTenthSite } from './src/tenthSite';
import { crawlEleventhSite } from './src/eleventhSite';
import { crawlTwelvithSite } from './src/twelvithSite';
import { crawlThirteenthSite } from './src/thirteenthSite';
process.setMaxListeners(0);

(async () => {
  // await letgo;
  //  await firstsite;
  // await SecondSiteCrawler();
  //   await ThirdSiteCrawler();
  // await crawlTenthSite(); //網頁結構問題太多


  //------------------上面都是在作業配的資料---------------------
  await crawlThirteenthSite();
//  await crawlTwelvithSite()
 // await crawlEleventhSite()
  // await console.log('9 start')
  // await crawlNinthSite();
  // await console.log('9 done')
  // await console.log('8 start')
  // await crawlEighthSite();
  // await console.log('8 done')
  // await crawlSixthSite();
  // await fourthSiteCrawler();
  // await fifthSiteCrawler();
  // await crawlSeventhSite();
  //   await doMerFile();
  await mergeJsonFile();
  await console.log('All done')

})()