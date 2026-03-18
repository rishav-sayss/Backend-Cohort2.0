let usermodel = require("../models/usermodal")
let jwt = require("jsonwebtoken")
let sendEmail = require("../services/mail.services")
/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body { username, email, password }
 */

let register = async (req, res) => {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await usermodel.findOne({
        $or: [{ email }, { username }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User with this email or username already exists",
            success: false,
            err: "User already exists"
        })
    }

    const user = await usermodel.create({ username, email, password })

    const emailVerificationToken = jwt.sign({
        email: user.email,
    }, process.env.JWT_SECRET)

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            password: user.password
        }
    });
}


/**
 * @desc Login user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 * @body { email, password }
 */

async function login(req, res) {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
            err: "User not found"
        })
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
            err: "Incorrect password"
        })
    }

    if (!user.verified) {
        return res.status(400).json({
            message: "Please verify your email before logging in",
            success: false,
            err: "Email not verified"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("token", token)

    res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}


/**
 * @desc Get current logged in user's details
 * @route GET /api/auth/get-me
 * @access Private
 */
async function getme(req, res) {
    const userId = req.user.id;
    const user = await usermodel.findById(userId).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })
    }
    res.status(200).json({
        message: "User details fetched successfully",
        success: true,
        user
    })

}

/**
 * @desc Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 * @query { token }
 */
async function verifyEmail(req, res) {
    let token = req.query.token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid token",
                success: false,
                err: "User not found"
            })
        }
        user.verified = true;
        await user.save();

        const html =
            `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/login">Go to Login</a>

    `
        return res.send(html);

    } catch (err) {
        return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: err.message
        })
    }
}




module.exports = { login, register, verifyEmail ,getme}