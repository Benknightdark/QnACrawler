//
import * as puppeteer from 'puppeteer'
import * as cheerio from "cheerio"
import * as fs from 'fs'
const $ = cheerio
const webSitName = `秀傳醫療體系超難寫`;
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
    console.log(trArray)
    await fs.writeFileSync('./src/firstSite.json', JSON.stringify(trArray));
    // console.log(trArray)
    return trArray;
}
export const firstsite = (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://www.show.org.tw/QA_List.aspx?Kind=5&Dept=TT');
    let userQuestionAsync = [];

    const html = await page.content()
    const $2 = cheerio.load(html);
    const table = $2('.LoanTable');
    //get frist page tr
    const tr = table.find('tr');
     const nTRArray = await getTrArray(tr)
   //  fs.writeFileSync('./src/firstSite.json', JSON.stringify(nTRArray));

     userQuestionAsync.push(nTRArray)
    //  console.log(nTRArray)
    //  page.browser().close();
    const lastTr = tr.last();
    const pages = lastTr.find('td').text().split("").filter(a => Number.parseInt(a) !== 1);
  
    const getOther=async (index)=>{
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://www.show.org.tw/QA_List.aspx?Kind=5&Dept=TT');
        // await page.waitForNavigation();

        await page.$eval('#aspnetForm', (form: any,index) => {
            form.__EVENTTARGET.value = `ctl00$ContentPlaceHolder1$GV_GuestList`
            form.__EVENTARGUMENT.value = `Page$${index}`
            form.submit();
        },index);
       setTimeout(async () => {
            let userQuestionAsync = [];
    
            const html = await page.content()
            const $2 = cheerio.load(html);
            const table = $2('.LoanTable');
            //get frist page tr
            const tr = table.find('tr');
            const nTRArray = await getTrArray(tr)
            //console.log(nTRArray)
          //  page.browser().close();    
          //  return nTRArray;
         

        }, 5000);
    }

  const nPage=  pages.map(async a=>{
        userQuestionAsync.push(await getOther(a))
    })
   
//    // console.log(aa)
//    setTimeout(() => {
//     userQuestionAsync.map(async a=>{
//         console.log(a)
//        })
//    }, 30000);
  

    //  })








    console.log()

})();