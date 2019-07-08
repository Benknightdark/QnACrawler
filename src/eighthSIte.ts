import * as tsv from 'tsv'
import * as fs from 'fs'
import { ClientConfig, crawlClient } from './Helpers/crawlHelper';
export const crawlEighthSite = async () => {
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `https://org.vghks.gov.tw/dent/News_Content.aspx?n=C1AF1A2CAD71FA6F&sms=F2B0AE5B8E182A57&s=E38433527719A340`;
    let webSitName = '高雄榮總'
    const { browser, page, $ } = await crawlClient(clientConfig);
    const main = $('.data_midlle_news_box02')
    let questions=main.find('p > strong > span');
    // let b=questions[0]
    console.log()
    let data=[]
questions.map( (a)=>{
        let elment=$(questions[a]);
        let question=elment.text().replace('Ｑ：','');
        let answer=elment.parent().parent().next().text().replace('Ａ：','');
       // console.log(question)
       // console.log(answer)
        //console.log("---------------")
        data.push({
            question:question,
            answer:answer
        }) 
    });
     let tsvdata = await tsv.stringify(data)
    
   //  let tsvdata = await tsv.stringify(JSON.parse(JSON.stringify(data).replace(/\\n/g, ' ').replace(/\\t/g, ' ').trim()))
 //  await fs.writeFileSync(`./src/Data/${webSitName}.json`, )

//     await fs.writeFileSync(`./src/Data/${webSitName}.tsv`, tsvdata)
     await fs.writeFileSync(`./src/Data/${webSitName}.json`, JSON.stringify(data))

     browser.close();

}