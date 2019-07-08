import * as mergeFiles from 'merge-files';
// import * as fs from 'fs'
import * as tsv from 'tsv'
import { rejects } from 'assert';
import * as fs from 'fs-extra'
//var tsv is the TSV file with headers
import * as jsonxls from 'json2xls'
const mergFile = async (files, testFolder) => {
  let data = files.map(async file => {
    let content = await fs.readFileSync(testFolder + "/" + file, 'utf8');
    //   let json=await tsvJSON(content);
    // array=await [...array, ...JSON.parse(json)];     
    return content

  });
  let nData = await Promise.all(data)

  return nData;

}
const replaceContents = async (file, replacement, cb) => {

  fs.readFile(replacement, (err, contents) => {
    if (err) return cb(err);
    fs.writeFile(file, contents, cb);
  });

}
export const doMerFile = async () => {
  let testFolder = './src//Data';
  await fs.removeSync(`${testFolder}/result.tsv`)

  // const outPutPath = __dirname + '/result.tsv';;
  // let inputPathList = [];
  fs.readdir(testFolder, async (err, files) => {

    const bb = await mergFile(files, testFolder)
    let nbb = bb.map((b: any) => {
      let c = b.replace(`question\tanswer`, '')
      return c
    }).join("")

    await fs.createFileSync(`${testFolder}/result.tsv`)
    await fs.writeFileSync(`${testFolder}/result.tsv`, new Buffer(`question\tanswer` + nbb.replace(`,undefined`, '')), { encoding: 'utf8' });
    //


    //  await fs.writeFileSync(`../Data/result.tsv`, ndata);

    //   console.log(inputPathList)
    //   const status = await mergeFiles(inputPathList, outPutPath);
    //   // or
    //   mergeFiles(inputPathList, outPutPath).then((status) => {
    //       // next
    //       console.log(status)
    //   });
  });

}

export const mergeJsonFile = async () => {
  let testFolder = './src//Data';
  await fs.removeSync(`${testFolder}/result.json`)
  fs.readdir(testFolder, async (err, files) => {
let ndata=[]
    console.log(files)
    const bb:any = await mergFile(files, testFolder)
    // await  bb.map(async (b: any) => {
    //     ndata.concat([...JSON.parse(b)]);
    //   })
   
for (let index = 0; index < bb.length; index++) {
  const element =JSON.parse( bb[index]);
  for (let index = 0; index < element.length; index++) {
    const el = element[index];

    ndata.push(el)
  }
  
}
    // console.log(ndata)
 
  
  var xls = jsonxls(ndata);
  
  fs.writeFileSync(`${testFolder}/data.xlsx`, xls, 'binary');
    // await fs.createFileSync(`${testFolder}/result.json`)
    // await fs.writeFileSync(`${testFolder}/result.json`, new Buffer(JSON.stringify(ndata)), { encoding: 'utf8' });
   // return;
    //  await   fs.createFileSync(`${testFolder}/result.tsv`)
    //   await fs.writeFileSync(`${testFolder}/result.tsv`, new Buffer(`question\tanswer` + nbb.replace(`,undefined`, '')), { encoding: 'utf8' });

  });

}


// // status: true or false
