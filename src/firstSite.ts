//
import * as puppeteer from 'puppeteer'
import * as cheerio from "cheerio"
const $ = cheerio
const webSitName=`秀傳醫療體系`;
const getTrArray = async (tr: Cheerio) => {
    let trArray = [];
    for (let index = 1; index < tr.length - 2; index++) {
        const element = tr[index];
        const td = $(element).find('td');
        let detailID = ''
        //let detailUrl=`http://www.show.org.tw/QA_Detail.aspx?Kind=5&Dept=TT&No=${detailID}`;
        if (Number.parseInt($(td[3]).text()) !== 0) {
            detailID = $($(td[0]).find('input')[1]).val().trim();
            trArray.push({
                question: $(td[0]).text().trim(),
                url: `http://www.show.org.tw/QA_Detail.aspx?Kind=5&Dept=TT&No=${detailID}`
            })
        }

    }
    // console.log(trArray)
    return trArray;
}
const click=async (page:puppeteer.Page,index)=>{
    console.log("aaa",index)
   return  await page.evaluate((index) => {
        const targetElement: any = document.querySelector(`#ctl00_ContentPlaceHolder1_GV_GuestList > tbody > tr:nth-child(12) > td > table > tbody > tr > td:nth-child(${index}) > a`)
        targetElement && targetElement.click();
        // console.log(document)
    },index)
}
export const firstsite = (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://www.show.org.tw/QA_List.aspx?Kind=5&Dept=TT');
    let userQuestionAsync=[];

    const html = await page.content()
    const $2 = cheerio.load(html);
    const table = $2('.LoanTable');
    //get frist page tr
    const tr = table.find('tr');
    const nTRArray = await getTrArray(tr)
    console.log(nTRArray)
   //await  userQuestionAsync.push(nTRArray)

    const lastTr = tr.last();
    const pagesLength = lastTr.find('a').text().split("")
    console.log(pagesLength)
    pagesLength.map(async(a)=>{
           setTimeout(async () => {
            await click(page,a).then(async b=>{
                let html = await page.content()
                let $2 = cheerio.load(html);
                let table = $2('.LoanTable');
                let tr = table.find('tr');
                let nTRArray = await getTrArray(tr)
               console.log(nTRArray)
            });
         
          //await   userQuestionAsync.push(nTRArray)
        }, 3000);
 
    })
    // for (let index = 1; index <= pagesLength; index++) {
    //     await click(page,index);
    //    setTimeout(async () => {
    //         let html = await page.content()
    //         let $2 = cheerio.load(html);
    //         let table = $2('.LoanTable');
    //         let tr = table.find('tr');
    //         let nTRArray = await getTrArray(tr)
    //        console.log(nTRArray)
    //       //await   userQuestionAsync.push(nTRArray)
    //     }, 3000);


    // }  
   // let bb=await userQuestionAsync;

    console.log( )

})();