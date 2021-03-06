import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
export const crawlClient=async (config:ClientConfig)=>{
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    if(config.ignoreStatic){
        page.on('request', (request) => {
            if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });
    }   
    // await page.waitForNavigation( {  waitUntil: 'domcontentloaded' });
    
    await page.goto(`${config.url}`, { waitUntil: 'domcontentloaded' });
    const html = await page.content()
    const $ = cheerio.load(html);
    return {
        browser:browser,
        page:page,
        $:$
    }
}
export class ClientConfig {
    ignoreStatic:Boolean;
    url:String;
}
