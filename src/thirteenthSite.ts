import * as fs from 'fs'
import { ClientConfig, crawlClient } from './Helpers/crawlHelper';
const url=`http://www.drhoimplant.com.tw`
const webSitName = '高難度植牙'
let data=[]

 const crawlConfig=async (url)=>{
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `${url}`;
    const { browser, page, $ } = await crawlClient(clientConfig);
    return { browser, page, $ };
}
const crawData=async($,main)=>{
    for (let index = 2; index < main.length-1; index++) {
        const element = $(main[index]);
        let question=$($(element).find('tr')[0]).text();
        let answer=$($(element).find('tr')[1]).text();
        if(question.split('.')[0].replace('\n','').replace(' ','').trim()!=='19'){
        //    console.log(question.split('.')[0].replace('\n','').replace(' ',''))

            data.push({question:question.replace('.','').replace(new RegExp("[0-9]", "g"), ""),answer:answer})

        }
    }
}
export const crawlThirteenthSite = async () => {
   
    const { browser, page, $ } = await crawlConfig(url+"/service-qa.htm");
    const main = $('#form-central-detail > table')
    const pages=$('.pages');
   await  crawData($,main)
   await  browser.close();

    for (let index = 0; index < pages.length; index++) {
        const element =$(pages[index]) ;
        console.log("==================================="+element.attr('href'))
        const config = await crawlConfig(url+"/"+element.attr('href'));
        const main = config.$('#form-central-detail > table')
        for (let index = 2; index < main.length-1; index++) {
            await  crawData(config.$,main)
            await  config.browser.close();


        }
        
        
    }
 
      await fs.writeFileSync(`./src/Data/${webSitName}.json`, JSON.stringify(data))


}