const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    // Follow two steps to fix the forgot password functionality
    // 1. Right pass for the admin gmail
    // 2. Setting ON gmail
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        }
    })
    console.log(transporter)
 
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;