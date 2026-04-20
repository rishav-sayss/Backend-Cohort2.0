import ImageKit from '@imagekit/nodejs';
import { config } from "../config/config.js"

let client = new ImageKit({
    privateKey: config.privateKey
})

export let uploadFile = async ({ buffer, fileName, folder = "snitch" }) => {

    // console.log(buffer,fileName,folder)
    const result = await client.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder
    })

    return result

}