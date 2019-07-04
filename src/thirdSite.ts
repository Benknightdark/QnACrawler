//
import * as puppeteer from 'puppeteer';
import * as cheerio from "cheerio";
import * as tsv from 'tsv'
import * as fs from 'fs'
import { saveToTSV } from './Helpers/tsvHelper';
const $ = cheerio;
const webSitName = `馬偕醫院`;
export const ThirdSiteCrawler = async () => {
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

        await page.goto(`http://www.mmh.org.tw/taitam/medic/ptedu/QA.aspx`, { waitUntil: 'domcontentloaded' });
        const html = await page.content()
        const $2 = cheerio.load(html);
        const questionlist=$2('.fontQc')
        let data=[];
        for (let index = 0; index < questionlist.length; index++) {
            const element = questionlist[index];
            const answer=$(element).parent().parent().next('tr').find('font > font').text().trim()
            // console.log($(element).text().trim())
            // console.log(answer)
            // console.log("------------------------------")
            data.push({
                question:$(element).text().trim(),
                answer:answer
            })
            
        }
        const dataP=await Promise.all(data);
        let ndata= await tsv.stringify(dataP)
        await fs.writeFileSync(`./src/Data/${webSitName}.tsv`, ndata);
        // console.log(dataP);
       // await saveToTSV(dataP,`${webSitName}.tsv`)
       



}
