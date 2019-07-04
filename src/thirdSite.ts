//
import * as puppeteer from 'puppeteer';
import * as cheerio from "cheerio";
import * as j from './firstSite.json';
import * as tsv from 'tsv'
import * as fs from 'fs'
const $ = cheerio;
const webSitName = `馬偕醫院`;
export const SecondSiteCrawler = async () => {
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
       



}
