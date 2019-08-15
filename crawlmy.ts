import { ClientConfig, crawlClient } from './src/Helpers/crawlHelper';
let mainUrl=`http://163.32.129.93/khjh/11/`;
let folder=`doc`
var fs = require('fs');;
const getContent=async (url)=>{
    let clientConfig2: ClientConfig = new ClientConfig();
    clientConfig2.ignoreStatic = true;
    clientConfig2.url = url;
    const { browser, page, $ } = await crawlClient(clientConfig2);
    console.log()
   // console.log($('body').text())
    
let fileName=$('body').find('span').first().text();
fs.writeFile(`./${folder}/${fileName}.txt`, $('body').text(), (err) => {
  if (err) throw err;
  console.log(`The ${fileName} has been saved!`);
  browser.close();
});

}
(async()=>{
    let clientConfig: ClientConfig = new ClientConfig();
    clientConfig.ignoreStatic = true;
    clientConfig.url = `${mainUrl}11.htm`;
    const { browser, page, $ } = await crawlClient(clientConfig);
    let urls = $('body').find('a');
    let urlAray=[];
    for (let index = 0; index < urls.length; index++) {
        const element = urls[index];
        let findUrl=$(element).attr('href');
        if(findUrl!==undefined){
            urlAray.push(findUrl)
        }
        
    }
    var filterUrls=urlAray.splice(0,10);
    urlAray=  urlAray.filter(a=>filterUrls.filter(b=>b==a).length==0)
    .map(c=>`${mainUrl}${c}`);
   // console.log(urlAray[0])
for (let index = 0; index < urlAray.length; index++) {
    const element = urlAray[index];
    await getContent(element)
}



    
})()
