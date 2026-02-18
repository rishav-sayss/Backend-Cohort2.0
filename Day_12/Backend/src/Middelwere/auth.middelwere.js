let JWT = require("jsonwebtoken")

let checkvalidation = (req, res,next) => {
    let token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized user access"
        })
    }

    let decode = null

    try {
        //verify the user token
        decode = JWT.verify(token, process.env.JWT_SECREAT)
        // console.log(decode)
    } catch (error) {
        res.status(401).json({
            message: "Token invalid"
        })
    }``

    req.user = decode
    next()
}

module.exports = checkvalidation