import * as tsv from 'tsv'
import * as fs from 'fs'
import { ClientConfig, crawlClient } from './Helpers/crawlHelper';
const getAnswer = (element2, $) => {
    if (element2[0].name == 'p') {
        return element2.text()
    }
    if (element2[0].name == 'ol') {
        const l = element2.find('li')
        let s = ''
        for (let index = 0; index < l.length; index++) {
            const element = $(l[index]);
            s += `(${index+1})${element.text()} `
            if(index+1==l.length){
                s+="。"
            }
        }
        return s;
    }

    if (element2[0].name == 'h2') return 'done'
    if (element2[0].name == 'h3') return 'done'
    return 'done'
}
export const fifthSiteCrawler = async () => {
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `https://all-on-4.com.tw/%E6%A4%8D%E7%89%99%E8%A3%9C%E9%AA%A8/`;
    let webSitName = '一日全口賤'
    const { browser, page, $ } = await crawlClient(clientConfig);
    let data=[];
    let content = $('.entry-content');
    let h2 = content.find('h2')
    for (let index = 0; index < h2.length; index++) {
        const element = $(h2[index]);
        console.log(`【${element.text()}】`)
        const nextE = element.nextAll()
        let answer = '';
        for (let index2 = 0; index2 < nextE.length; index2++) {
            const element2 = $(nextE[index2]);
            let get = getAnswer(element2, $)
            if (get == 'done') {
                break;
            }
            answer += get
        }
        console.log(answer)

        console.log("---------------------")
        data.push({question:element.text(),answer:answer})

    }
    console.log('=======================================================');
    let h3 = content.find('h3')

    for (let index = 0; index < h3.length; index++) {
        const element = $(h3[index]);
        console.log(`【${element.text()}】`)
        const nextE = element.nextAll()
        let answer = '';
        for (let index2 = 0; index2 < nextE.length; index2++) {
            const element2 = $(nextE[index2]);
            let get = getAnswer(element2, $)
            if (get == 'done') {
                break;
            }
            answer += get
        }
        console.log(answer)

        console.log("---------------------")
        data.push({question:element.text(),answer:answer})

    }
    // let ndata= await tsv.stringify(data)
 //   await fs.writeFileSync(`./src/Data/${webSitName}.tsv`, ndata);
 await fs.writeFileSync(`./src/Data/${webSitName}.json`, JSON.stringify(data))


}