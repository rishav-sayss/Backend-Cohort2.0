let Authschema = require("../schema/auth.schema")
let bcrypt = require("bcrypt")
let jsonwebtoken = require("jsonwebtoken")
// const blacklistSchema = require("../schema/blacklist.schema")
const redish = require("../config/DB/cache")

/**
 * Register Api
 */

let register = async (req, res) => {

    let { username, email, password, role } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Required fields missing"
        })
    }

    let isalreadyexist = await Authschema.findOne({
        $or: [ //Agar email ya username me se koi match ho jaye → user mil jayega.
            { email: email },
            { username: username }
        ]
    })

    if (isalreadyexist) {
        return res.status(409).json({ message: "User already exists" })
    }

    let haspss = await bcrypt.hash(password, 10)

    let user = await Authschema.create({
        username: username,
        email: email,
        password: haspss,
        role: role
    })


    let Token = jsonwebtoken.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", Token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
        message: "user register successfully",
        user: {
            username: user.username,
            email: user.email,
            role: user.role
        }
    })


}

let login = async (req, res) => {
    let { email, password, username } = req.body

    let userexist = await Authschema.findOne({
        $or: [ //Agar email ya username me se koi match ho jaye → user mil jayega.
            { email: email },
            { username: username }
        ]
    }).select("+password") //imp

    if (!userexist) {
        return res.status(401).json({
            message: " Unauthorized Invalid credentials"
        })
    }

    let decode = await bcrypt.compare(password, userexist.password)

    if (!decode) {
        return res.status(401).json({
            message: ' Unauthorized Invalid credentials'
        })
    }

    let Token = jsonwebtoken.sign({
        id: userexist._id,
        username: userexist.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", Token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
        message: "user  Login successfully",
        user: {
            id: userexist._id,
            username: userexist.username,
            email: userexist.email,
            role: userexist.role
        }
    })

}

let getme = async (req, res) => {

    let response = await Authschema.findById(req.user.id)

    res.status(200).json({
        message: "User fetched successfully",
        response
    })
}
let logout = async (req, res) => {

    try {
        let token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                message: "No token found"
            })
        }

        res.clearCookie("token")

        // await blacklistSchema.create({ token })
        await redish.set(token, Date.now().toString(), "EX", 60 * 60)


        res.status(200).json({
            message: "Logout successfully"
        })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }

}

module.exports = {
    register,
    login,
    getme,
    logout
}