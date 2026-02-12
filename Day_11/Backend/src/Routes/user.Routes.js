let express = require("express")
let authrouter = express.Router()
let User = require("../Modals/User.modal")
let JWT = require("jsonwebtoken")
let bcrypt = require("bcrypt")

authrouter.post("/register", async (req, res) => {
    try {
        let { name, email, password } = req.body
        //validation check kro proper wya me 
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields"
            })
        }

        // identify kro ki DB me to phele se hi user exist to nhi krta na
        let useremail = await User.findOne({ email })

        if (useremail) {
            res.status(409).json({
                success: false,
                code: "USER_EXISTS"
            })

        }

        // password ko has krke DB me save kro
        let HashPass = await bcrypt.hash(password, 10)

        let userdata = await User.create({
            name, email,
            password: HashPass
        })

        //Token creat kro with user data and JWT secrete
        let Token = JWT.sign({
            id: userdata._id,
            email: userdata.email
        },
            process.env.JWT_SECRET
        )
        //response cookie ke sath token ko set kr do
        res.cookie("token", Token, {
            httpOnly: true,  // JS se access nahi hoga (secure)
            secure: false,  // true only in https production
            sameSite: "lax",  // basic CSRF protection
            maxAge: 24 * 60 * 60 * 1000
        })
        // console.log("SETTING COOKIE TOKEN")
        res.status(201).json({
            success: true,
            message: "Registered successfully"
        })

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

authrouter.post("/login", async (req, res) => {
    try {
        let { password, email } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required"
            })
        }

        let user = await User.findOne({ email })
        // console.log("user",user)
        if (!user) {
           return res.status(401).json({
                success: false,
                code: "NO_ACCOUNT"
            })

        }

        //password ko bcrypt ke through compare kro

        let Match = await bcrypt.compare(
            password,
            user.password
        )

        if (!Match) {
            return res.status(401).json({
                message: "Wrong password"
            })
        }

        let token = JWT.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "Login success"
        })
    } catch (err) {
            res.status(500).json({ message: err.message })
    }


})

module.exports = authrouter