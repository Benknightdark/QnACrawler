import * as tsv from 'tsv'
import * as fs from 'fs'
import { ClientConfig, crawlClient } from './Helpers/crawlHelper';
const crawlUrl=[
    "https://www.shining0800226565.com.tw/pagedental3",
"https://www.shining0800226565.com.tw/pagedental4",
"https://www.shining0800226565.com.tw/pagedental6",

"https://www.shining0800226565.com.tw/pagedental12",

"https://www.shining0800226565.com.tw/pagedental13",

"https://www.shining0800226565.com.tw/pagedental16",
"https://www.shining0800226565.com.tw/pagedental17",

"https://www.shining0800226565.com.tw/pagedental18",

"https://www.shining0800226565.com.tw/pagedental25",


]
const getAnswer = (element2, $) => {
    if (element2[0].name == 'span') {
        if (element2.find('ol').length>0) {
            const l = element2.find('ol > li')
            let s = ''
            for (let index = 0; index < l.length; index++) {
                const element = $(l[index]);
                s += `${element.text()}`
                // if(index+1==l.length){
                //     s+="。"
                // }
            }
            return s;
        }
        if(element2.find('strong').length>0) return 'done'
        return element2.text()
    }
    if (element2[0].name == 'a') { return element2.text()}
    if(element2[0].name=='div'){
        if (element2.find('ol').length>0) {
            const l = element2.find('ol > li')
            let s = ''
            for (let index = 0; index < l.length; index++) {
                const element = $(l[index]);
                s += `${element.text()}`
                // if(index+1==l.length){
                //     s+="。"
                // }
            }
            return s;
        }
    }
    if (element2[0].name == 'h2') return 'done'
    if (element2[0].name == 'h3') return 'done'
  
    return 'done'
}

export const getCatList = async () => {
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `https://www.shining0800226565.com.tw/pagedental3`;
    let webSitName = '晶晶植牙內容有夠多'
    const { browser, page, $ } = await crawlClient(clientConfig);
    let catListArray=[]
    let catList = $('.categories-list').find('li');
    for (let index = 0; index < catList.length; index++) {
        const element = $(catList[index]).find('a').attr('href').replace('../..','https://www.shining0800226565.com.tw/')
        catListArray.push(element);
    }
    browser.close();
    return catListArray;
    //  let ndata= await tsv.stringify(data)
    // await fs.writeFileSync(`./src/Data/${webSitName}.tsv`, ndata);
}
export const crawlSixthSite=async()=>{
//    const a= await getCatList();
//    console.log(a)
let ndata=[];
  const getData= crawlUrl.map(async url=>{
    let data=[];

    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `${url}`;
    let webSitName = '晶晶植牙內容有夠多'
    const { browser, page, $ } = await crawlClient(clientConfig);
    let h3=$('h3');
    // console.log(aa.text().trim().replace('&nbsp;',''))
    for (let index = 0; index < h3.length; index++) {
        const element =$( h3[index]);
        let question=element.text();
        const nextE=element.nextAll();

        let answer=''
        for (let index2 = 0; index2 < nextE.length; index2++) {
            const element2 = $(nextE[index2]);
            let string=getAnswer( element2,$);
            if(string=='done')break;
            if(string!==''){
                answer+=string;

            }
            
        }
        if(answer!==''){

            data.push({
                question:question.replace(/&amp;nbsp;\s/g,"").replace('\n','').replace('\n\t','').replace('\t','').replace(' \n','').trim().replace('Q：',''),
                answer:answer.replace(/&amp;nbsp;\s/g,"").replace('\n','').replace('\n\t','').replace('\t','').replace(' \n','').trim().replace('A：','')
            })
        }

        
    }
    let h2=$('h2');
    for (let index = 0; index < h2.length; index++) {
        const element =$( h2[index]);
        let question=element.text();
        const nextE=element.nextAll();

        let answer=''
        for (let index2 = 0; index2 < nextE.length; index2++) {
            const element2 = $(nextE[index2]);
            let string=getAnswer( element2,$);
            if(string=='done')break;
            if(string!==''){
                answer+=string;

            }
            
        }
        if(answer!==''){

            data.push({
                question:question.replace(/&amp;nbsp;\s/g,"").replace('\n','').replace('\n\t','').replace('\t','').replace(' \n','').trim(),
                answer:answer.replace(/&amp;nbsp;\s/g,"").replace('\n','').replace('\n\t','').replace('\t','').replace(' \n','').trim()
            })
        }

        
    }


    browser.close();
    return data;
   })
   const nData:any=await Promise.all(getData)

   
     const flattened = [].concat(...nData);
// console.log(flattened)
// let bb=JSON.stringify(flattened).replace(/\\t/g,'').replace(/\\n/g,'').trim()
//     let tsvdata= await tsv.stringify(JSON.parse(bb))
 //await fs.writeFileSync(`./src/Data/${"哏"}.tsv`,tsvdata)
   await fs.writeFileSync(`./src/Data/${"哏"}.json`, JSON.stringify(flattened))


 //  await console .log ('done')
}