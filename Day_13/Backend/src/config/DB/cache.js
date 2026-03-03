
let Redis = require("ioredis").default

let redish = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})

redish.on("connect", () => {
    console.log("server is connected to redis")
})

redish.on("error", (err) => {
    console.log(err)
})

module.exports = redish