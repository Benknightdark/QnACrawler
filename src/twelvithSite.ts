import * as fs from 'fs'
import { ClientConfig, crawlClient } from './Helpers/crawlHelper';

export const crawlTwelvithSite = async () => {
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `http://teeth.ao.com.tw/list_6.htm`;
    let webSitName = '牙醫診所'
    const { browser, page, $ } = await crawlClient(clientConfig);
    const main = $('#xxx')
    let questionList=[]
    const pList=main.find('p')
    
 for (let index = 0; index < pList.length; index++) {
     const element = $(pList[index]);
    if(element.text().includes('問：')){
        questionList.push(element)
    }
     
 }
  let data=[] 
 questionList.map((a:Cheerio)=>{
    let question=a.text();
    let children=a.nextUntil('hr')
    let answer=''
    console.log(question)
    console.log(children.text())
    console.log('=====================================================')
    data.push({question:question.replace('問：',''),answer:children.text().replace('答：','')})

 })
     await fs.writeFileSync(`./src/Data/${webSitName}.json`, JSON.stringify(data))

    await  browser.close();

}