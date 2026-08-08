const nodemailer = require("nodemailer");
const sendEmail = async(to, subject , html) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });

    console.log("EMAIL_USER: ",process.env.EMAIL_USER);
    const info = await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to,
        subject,
        html
    });
    console.log("Email Sent:",info);
};
module.exports = sendEmail;