let usermodal = require("../Modals/user.modal")
let bcrypt = require("bcrypt")
let JWT = require("jsonwebtoken")
// const { Profiler } = require("react")

/**
 * register Api
 */

let registerUser = async (req, res) => {

    try {
        let { username, email, password, bio, profile } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Required fields missing"
            })
        }
        let isuserexist = await usermodal.findOne({
            $or: [
                { email },
                { username }
            ]
        })
        if (isuserexist) {
            return res.status(409).json({
                message: " user already exist " + (isuserexist.email == email ? "User Email already exist " : "User name already exist ")
            })
        }

        let haspas = await bcrypt.hash(password, 10)
        let user = await usermodal.create({
            username, email, password: haspas, bio, profile
        })

        let Token = JWT.sign({ user: user._id }, process.env.JWT_SECREAT, { expiresIn: "1d" })

        res.cookie("token", Token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message: "user register successfully",
            user: {
                name: user.username,
                email: user.email,
                bio: user.bio,
                profile: user.profile
            }
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

/**
 *  Login Api
 */

let loginapi = async (req, res) => {

    try {
        let { username, email, password } = req.body

        let user = await usermodal.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        })

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        let checkpass = await bcrypt.compare(password, user.password)

        if (!checkpass) {
            return res.status(401).json({
                message: "password invalid"
            })
        }

        let Token = JWT.sign({
            id: user._id
        }, process.env.JWT_SECREAT, { expiresIn: "1d" }
        )

        console.log('token', Token);
        res.cookie("token", Token)

        res.status(201).json({
            message: "Login Success",
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                profile: user.profile
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = { registerUser, loginapi } 