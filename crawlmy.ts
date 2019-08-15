import { ClientConfig, crawlClient } from './src/Helpers/crawlHelper';
let mainUrl=`http://163.32.129.93/khjh/11/`;
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
    urlAray=  urlAray.filter(a=>filterUrls.filter(b=>b==a).length==0);
    
})()
