import { jj ,SecondSiteCrawler} from './src/SecondSite';
import { ThirdSiteCrawler } from './src/thirdSite';
process.setMaxListeners(0);

(async()=>{
   // await letgo;
  //  await firstsite;
 // await SecondSiteCrawler();
 await ThirdSiteCrawler();
})()