//秀傳醫療體系
import * as puppeteer from 'puppeteer'
import * as cheerio from "cheerio"
const $ = cheerio

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
export const firstsite = (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://www.show.org.tw/QA_List.aspx?Kind=5&Dept=TT');
    const html = await page.content()
    const $2 = cheerio.load(html);
    const table = $2('.LoanTable');



    //get tr
    const tr = table.find('tr');
    const nTRArray = await getTrArray(tr)
    console.log(nTRArray)


    await page.evaluate( () => {    
        const targetElement: any = document.querySelector('#ctl00_ContentPlaceHolder1_GV_GuestList > tbody > tr:nth-child(12) > td > table > tbody > tr > td:nth-child(2) > a')
        targetElement&& targetElement.click();
       // console.log(document)
    })
    setTimeout(async () => {
        const html = await page.content()
        const $2 = cheerio.load(html);
        const table = $2('.LoanTable');
        //get tr
        const tr = table.find('tr');
        const nTRArray = await getTrArray(tr)
        console.log(nTRArray)
    }, 3000);

    



    // });
})();