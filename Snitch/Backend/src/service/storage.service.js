import ImageKit from '@imagekit/nodejs';
import { config } from "../config/config.js"

let client = new ImageKit({
    privateKey: config.privateKey
})

export let uploadfile = async ({ buffer, fileName, folder = "snitch" }) => {

    //  console.log("fileName:", fileName); // 👈 debug

    // console.log(buffer,fileName,folder)

    let result = await client.files.upload({
        file: buffer,
        fileName,
        folder
    })



    return result

}