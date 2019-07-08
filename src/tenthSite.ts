import * as fs from 'fs'
import { ClientConfig, crawlClient } from './Helpers/crawlHelper';
export const getAnswer=async(el:Cheerio,$)=>{

    for (let i2 = 0; i2 < el.length; i2++) {
        const element2 = $(el[i2]);
        // const child=await getAnswer(element2,$)
        if(el.find('strong').length>0 || el.find('img').length>0 ){
            return 'done'
        }else{
            console.log(element2.text())
            return element2.text();
        }
    }


   
 
}
export const crawlTenthSite = async () => {
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `http://52lodging.blogspot.com/2013/11/blog-post_5279.html`;
    let webSitName = '牙周病QA'
    const { browser, page, $ } = await crawlClient(clientConfig);
    const main = $('#post-body-2131735873772392317 > div > div')
    const question=main.find('strong')

    // let b=questions[0]
    for (let index = 0; index < question.length; index++) {
        const cc =$( question[index]);
        let answer='';
      //  if(cc.text()!=='本所如何使用水雷射治療牙周病？'){
            let elnext=cc.parent().nextAll();
            console.log(elnext.length)
          await   getAnswer(elnext,$);
           await console.log(cc.text())
           await  console.log(answer)
           await  console.log('===============================')
      //  }


    }   
 
    // await fs.writeFileSync(`./src/Data/${webSitName}.json`, JSON.stringify(data))

     browser.close();

}