const redish = require("../config/DB/cache")
// const blacklistSchema = require("../schema/blacklist.schema")
let jsonwebtoken = require("jsonwebtoken")
let authMiddleware = async (req, res, next) => {
    let token = req.cookies.token
    // console.log("token",token)
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized User"
        })
    }

    let isblacklisted = await redish.get(token)

    if (isblacklisted) {
        return res.status(401).json({
            message: "Token expired. Please login again."
        })
    }

    let decode = null
    try {
        decode = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
    // console.log("deocode",decode)
    req.user = decode
    next()
}

module.exports = authMiddleware










