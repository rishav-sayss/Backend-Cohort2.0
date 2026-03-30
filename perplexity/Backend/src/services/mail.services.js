let nodemailer = require("nodemailer")

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         type: 'OAuth2',
//         user: process.env.GOOGLE_USER,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//         clientId: process.env.GOOGLE_CLIENT_ID
//     }
// })


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:process.env.GOOGLE_USER,
        pass: process.env.APP_PASSWORD
    },
});

transporter.verify()
    .then(() => { })
    .catch((err) => { });


async function sendEmail({ to, subject, html, text = "" }) {

    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    
    return "email sent successfully, to " + to;
}

module.exports = sendEmail