//
import * as puppeteer from 'puppeteer';
import * as cheerio from "cheerio";
import * as j from './firstSite.json';
import * as tsv from 'tsv'
import * as fs from 'fs'
const $ = cheerio;
const webSitName = `秀傳醫療體系超難寫part2`;
export const jj = () => {
    let nj = [];
    for (let index = 0; index < 20; index++) {
        const element = j[index];
        nj.push(element.url);
    }
    return nj;
};
export const SecondSiteCrawler = async () => {
    const data = jj();
    const b = await data.map(async d => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });
        // await page.waitForNavigation( {  waitUntil: 'domcontentloaded' });

        await page.goto(d, { waitUntil: 'domcontentloaded' });
        const html = await page.content()
        const $2 = cheerio.load(html);
        const msgMain = $2('#ctl00_ContentPlaceHolder1_DL_GuesView_ctl00_Lab_Main').text()
        const guestReply = $2('#ctl00_ContentPlaceHolder1_DL_GuesView_ctl00_Lab_View').text()
        console.log(msgMain);
        console.log(guestReply)
        console.log('------------------------------')
        await browser.close();
        return {
            question: msgMain,
            answer: guestReply
        }

    })

    const bb2 = await Promise.all(b)

    const by = await tsv.stringify(bb2)
    await fs.writeFileSync(`./src/Data/${webSitName}.tsv`, by);



}