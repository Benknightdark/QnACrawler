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
export const crawlEleventhSite = async () => {
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `https://www.mynewsmile.com.tw/%E6%A0%B9%E7%AE%A1%E6%B2%BB%E7%99%82`;
    let webSitName = '茉莉牙醫'
    const { browser, page, $ } = await crawlClient(clientConfig);
    const main = $('.entry-content')
    const question=main.find('span[style="color: #ff6600;"]')
    let data=[];
   // console.log(question.text())
    for (let index = 0; index < question.length; index++) {
        const element = $(question[index]);
        console.log(element.text());
        let answer=''
        const elementParent=$(element.parents('h6')[0]).nextAll() //element.parent().parent().nextAll()
        for (let i2 = 0; i2 < elementParent.length; i2++) {
            const el = elementParent[i2];
            if($(el).find('span[style="color: #ff6600;"]').length>0){
                break;
            }
            if($(el).text()=='資料來源：台北市牙醫師公會會刊，黃英泰醫師校訂') break;
            
            console.log($(el).text());     
            answer+=       $(el).text()
        }
        console.log(`================================`);
        data.push({
            question:element.text(),
            answer:answer
        })
        
    }
    // let b=questions[0]
 
     await fs.writeFileSync(`./src/Data/${webSitName}.json`, JSON.stringify(data))

    await  browser.close();

}