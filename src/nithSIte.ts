import * as tsv from 'tsv'
import * as fs from 'fs'
import { ClientConfig, crawlClient } from './Helpers/crawlHelper';
const mainUrl = `http://periodont.com.tw`;
const filterUrl = `/index.php?option=com_content&view=article&id=60:2013-01-21-08-24-10&catid=18:qaa&Itemid=29`
const getAnser = async (url: string) => {
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `${mainUrl}/${url}`
    //console.log(clientConfig.url)
    const { browser, page, $ } = await crawlClient(clientConfig);
    let answerList = $('.article');
    answerList = answerList.children()
    //.filter(a => a !== answerList.length - 1)
    let nAnswer = ''
    answerList.map(b => {
        if (answerList.length !== b + 1) {
            switch (answerList[b].name) {
                case 'p':
                    nAnswer += $(answerList[b]).text().replace(/\\n/g, ' ').replace(/\\t/g, ' ')
                    break;
                case 'ol':
                    let li = $(answerList[b]).children('li')
                    for (let index = 0; index < li.length; index++) {
                        let element = $(li[index]);
                        nAnswer += element.text().replace(/\\n/g, ' ').replace(/\\t/g, ' ').replace('&nbsp', '').trim()
                    }

                    break;
                default:
                    break;
            }
        }
    })
    browser.close();

    return nAnswer;//answerList.text()
}
export const crawlNinthSite = async () => {
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `${mainUrl}/index.php?option=com_content&view=category&id=18&Itemid=29&limit=0`;
    let webSitName = '牙周病牙醫網'
    const { browser, page, $ } = await crawlClient(clientConfig);
    let main = $('table').find('tbody > tr > td > a')
    let data = []
    for (let b = 0; b < main.length; b++) {
        const element = main[b];
        if (b >= 2) {
            let question = await $(main[b]).text();

            let url = await $(main[b]).attr('href')
            if (await url !== filterUrl) {
                let answer = await getAnser(url);
                await data.push({
                    question: question,
                    answer: answer
                })
            }


        }
    }
    //  main.map(async b => {
    //         if (b >= 2) {
    //             let question = await $(main[b]).text();

    //             let url = await $(main[b]).attr('href')
    //             if (await url !== filterUrl) {
    //                 let answer = await getAnser(url);                
    //                 await data.push ({
    //                     question: question,
    //                     answer: answer
    //                 })
    //             }


    //         }
    //     })
  
      let tsvdata = await tsv.stringify(data)


      await fs.writeFileSync(`./src/Data/${webSitName}.tsv`, tsvdata)

    browser.close();

}