import * as tsv from 'tsv'
import * as fs from 'fs';
export const saveToTSV=async (data,fileName)=>{
    let filePath=`../Data`
    // console.log(!await fs.existsSync(`${filePath}/${fileName}`))
    // if(!await fs.existsSync(`${filePath}/${fileName}`)){
    //     await fs.mkdirSync(`${filePath}/${fileName}`)
    // }
   let ndata= await tsv.stringify(data)
   //console.log(ndata)
    await fs.writeFileSync(`${filePath}/${fileName}`, ndata);
}