import * as mergeFiles from 'merge-files';
import * as fs from 'fs'
(async()=>{
    let testFolder = '../Data';
    const outPutPath =__dirname + '/result.tsv';;
    let inputPathList =[];
    fs.readdir(testFolder, async (err, files) => {
        
      files.forEach(file => {
        console.log(file);
        inputPathList.push(testFolder+"/"+file)
      });
      console.log(inputPathList)
      const status = await mergeFiles(inputPathList, outPutPath);
      // or
      mergeFiles(inputPathList, outPutPath).then((status) => {
          // next
          console.log(status)
      });
    });

})()

// const inputPathList = [
//     __dirname + '/1.txt',
//     __dirname + '/2.txt',
//     __dirname + '/3.txt'
// ];
 
// // status: true or false
