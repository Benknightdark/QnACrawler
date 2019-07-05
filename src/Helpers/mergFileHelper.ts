import * as mergeFiles from 'merge-files';
import * as fs from 'fs'
import * as tsv from 'tsv'
import { rejects } from 'assert';
//var tsv is the TSV file with headers

  const mergFile=async(files,testFolder)=>{
      let data=  files.map(async file=>{
            let content=await   fs.readFileSync(testFolder+"/"+file, 'utf8');
         //   let json=await tsvJSON(content);
            // array=await [...array, ...JSON.parse(json)];     
          return content

        });
        let nData=await Promise.all(data)

        return nData;
    
  }
(async()=>{
    let testFolder = '../Data';
    const outPutPath =__dirname + '/result.tsv';;
    let inputPathList =[];
    fs.readdir(testFolder, async (err, files) => {
        const bb=await mergFile(files,testFolder)
     let nbb=   bb.map((b:any)=>{
         let c=b.replace(`question\tanswer\r\n`)
         return c
      }).join(",")

      //  await fs.writeFileSync(`../Data/result.tsv`, ndata);
       await fs.writeFileSync(`../Data/result.tsv`, new Buffer(nbb),{encoding:'utf8'});

    //   console.log(inputPathList)
    //   const status = await mergeFiles(inputPathList, outPutPath);
    //   // or
    //   mergeFiles(inputPathList, outPutPath).then((status) => {
    //       // next
    //       console.log(status)
    //   });
    });

})()

// const inputPathList = [
//     __dirname + '/1.txt',
//     __dirname + '/2.txt',
//     __dirname + '/3.txt'
// ];
 
// // status: true or false
