import { jj ,SecondSiteCrawler} from './src/SecondSite';
process.setMaxListeners(0);

(async()=>{
   // await letgo;
  //  await firstsite;
  await SecondSiteCrawler();
})()