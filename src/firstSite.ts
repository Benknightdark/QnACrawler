import * as puppeteer from 'puppeteer'
import * as cheerio from "cheerio"
export const firstsite = (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://www.show.org.tw/QA_List.aspx?Kind=5&Dept=TT');
    //   await page.screenshot({path: 'example.png'});
    const html = await page.content()
    const $ = cheerio.load(html);
    
  //  const title = $('title').text();
 //   console.log(title)
   // await browser.close();
    // await page.evaluate(() => {
    //     // let imageElements: any = document.querySelectorAll('img')
    //     // imageElements = [...imageElements]
    //     // // imageElements = imageElements.filter(img => img.getAttribute('sizes') === '293px')
    //     // let links = imageElements.map(img => img.getAttribute('src'))
    //     const doc=$(document);
    //     console.log(document)

    //   console.log(  doc.find(`#LoanTable`).length)
        
    // });
})();