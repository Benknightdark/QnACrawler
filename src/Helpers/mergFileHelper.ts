import * as mergeFiles from 'merge-files';
import * as fs from 'fs'
const merge =async()=>{
    const testFolder = '../Data';

    let inputPathList =[];
    fs.readdir(testFolder, (err, files) => {
      files.forEach(file => {
        console.log(file);
        inputPathList.push(testFolder+"/"+file)
      });
    });
    
    const status = await mergeFiles(inputPathList, testFolder);
    // or
    mergeFiles(inputPathList, testFolder).then((status) => {
        // next
        console.log(status)
    });
}

// const inputPathList = [
//     __dirname + '/1.txt',
//     __dirname + '/2.txt',
//     __dirname + '/3.txt'
// ];
 
// // status: true or false
