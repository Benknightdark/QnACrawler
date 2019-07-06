import * as tsv from 'tsv'
import * as fs from 'fs'
import { ClientConfig, crawlClient } from './Helpers/crawlHelper';

export const getAnswer=(element2:Cheerio)=>{
    if(element2.text()!=='' ){
        if(element2.find('font').length>0){return 'done';}
    }
    return element2.text();
}
export const fourthSiteCrawler = async () => {
    let clientConfig: ClientConfig=new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `https://health.udn.com/health/story/5968/343996`;
    let webSitName='元氣網'
    const {browser,page,  $} = await crawlClient(clientConfig);
    const questionlist=$('#story_body_content > p > font');
    let data=[];
    for (let index = 0; index < questionlist.length; index++) {
        const element = questionlist[index];
        console.log($(element).text())
        let elP=$(element).parent().nextAll('p')
        let answerString='';
        for (let index2 = 0; index2 < elP.length; index2++) {
            const element2 =$(elP[index2])
            let get=getAnswer(element2);;
            if(get=='done') break;
            answerString+=get
            
        }
        console.log(answerString)
        console.log('--------------------------------')
        data.push({
            question:$(element).text().replace('Q：',''),
            answer:answerString.replace('A：','').replace('【2009/10/04 元氣周報】','')
        })
       // console.log(elP)

        
    }
    let ndata= await tsv.stringify(data)
        await fs.writeFileSync(`./src/Data/${webSitName}.tsv`, ndata);
//console.log(questionlist)

}