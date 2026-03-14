let songmodal = require("../schema/song.modal")
let storageService = require("../services/storage.services")
const id3 = require("node-id3")

async function uploadsong(req, res) {

    let songbuffer = req.file.buffer
    const { mood } = req.body

    let tag = id3.read(songbuffer)

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadfile({
            buffer: songbuffer,
            filename: tag.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadfile({
            buffer: tag.image.imageBuffer,
            filename: tag.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])

    let song = await songmodal.create({
        title: tag.title,
        url: songFile.url,
        posterUrl: posterFile.url,
        mood
    })

    res.status(201).json({
        message: "song created successfully",
        song
    })
}

async function getSong(req, res) {

    const { mood } = req.query;

    const song = await songmodal.aggregate([
        { $match: { mood } },
        { $sample: { size: 1 } }
    ]);

    res.status(200).json({
        message: "song fetched successfully.",
        song: song[0],
    });
}

module.exports = { uploadsong, getSong }