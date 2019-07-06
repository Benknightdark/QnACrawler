import * as tsv from 'tsv'
import * as fs from 'fs'
import { ClientConfig, crawlClient } from './Helpers/crawlHelper';
const getAnswer=async (element, $)=>{
if(element[0].name=="p"){
    return element.text();
}else if(element[0].name=="ol"){
    let b='';
    let cc=element.find('li');
    for (let index = 0; index < cc.length; index++) {
        const element = $(cc[index]);
        b+=element.text()
        
    }
  return b.replace(/\\t/g,'').replace(/\\n/g,'').trim();
}
else{
    return 'done'
}
}
export const crawlSeventhSite = async () => {
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `http://deng.dnt.tw/qna.asp`;
    let webSitName = '植牙專家'
    const { browser, page, $ } = await crawlClient(clientConfig);
    const main = $('#main').find('ol > li');
    let data: any = [];
    for (let index = 0; index < main.length; index++) {
        const element = $(main[index]);
        
        let question = element.text().trim();
        let answer=''
        let answerList = element.next('.answer').attr('id')
        console.log(question)

       if(answerList!==undefined){
           let aa=$(`#${answerList}`)
           if(aa.find('ol').length>0||aa.find('table').length>0){
               break;
           }
           answer= aa.text();
       }
        




        // }
        //  .find('p').text().replace(/\\t/g,'').replace(/\\n/g,'').trim();
       
       // console.log(answer);
        console.log('----------------')
        data.push({
            question: question,
            answer: answer
        })
    }
    browser.close();
    // let tsvdata = await tsv.stringify(data)
    await fs.writeFileSync(`./src/Data/${webSitName}.json`, JSON.stringify(data).replace(/\\n/g, ' ').replace(/\\t/g, ' ').trim())

    // await fs.writeFileSync(`./src/Data/${webSitName}.tsv`, tsvdata)
}