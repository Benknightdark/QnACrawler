import * as puppeteer from 'puppeteer'
import { setTimeout } from 'timers';
import * as fs from 'fs'
export const letgo=(async function go() {
  //console.log(MyKey)

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    //userDataDir: "./userData/"
  });
  const page = await browser.newPage();

  await page.setUserAgent(`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36`)
  console.log('test use agent')
  // await watchDog;
  let currentScreen = await page.evaluate(() => {
    return {
      width: window.screen.availWidth,
      height: window.screen.availHeight,
    };
  });
  //設定預設網頁頁面大小
  await page.setViewport(currentScreen);

  // async function parseAndTask(items) {

  // }
  function rePage() {

  }

  try {
    await page.goto('http://data.coa.gov.tw/')
    await page.waitForSelector('#DefaultPageContent_m_ResultGrid_PageSizeList')
    await page.$eval('#DefaultPageContent_m_ResultGrid_PageSizeList', (e: any) => e.value = 100);
    // let handle = await page.$('#DefaultPageContent_m_ResultGrid_NextPage');
    // await handle.click();

    let handle: any;
    let flag: boolean = true;
    //console.log(handle)
    let i = 0;
    while (flag) {
      console.log(i++)
      //console.log('here')
      try {
        var result = await page.waitForSelector('#DefaultPageContent_m_ResultGrid_NextPage', { timeout: 3000 })
        handle = await page.$('#DefaultPageContent_m_ResultGrid_NextPage');
        await handle.click();
        await page.waitForNavigation();
        // let listHandle = await page.$$(".line");
        //抓取每一頁所有的 tr td欄位
        const divsCounts = await page.$$eval('.line', (data: any) => { return data });
        //console.log(divsCounts)
        //測試時候就會把這個打開抓一頁就好了
        //flag = false;
        // })
      } catch (err) {
        flag = false
      }
    }
    console.log('已跳出')

  } catch (err) {
    console.log('err')
    console.log(err)
  }
})()