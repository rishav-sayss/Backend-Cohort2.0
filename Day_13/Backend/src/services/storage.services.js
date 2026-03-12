let imagekit = require("@imagekit/nodejs").default

let client = new imagekit({
    privateKey: process.env.IMAGEKIT_SCERETKEY
})

async function uploadfile({ buffer, filename, folder = "" }) {
    let file = await client.files.upload({
        file: await imagekit.toFile(buffer),
        fileName: filename,
        folder: folder
    })
    console.log(file)
    return file
}

module.exports = {uploadfile}