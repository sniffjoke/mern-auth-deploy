const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    sendVerificationEmail: async(senderAddress, link) => {
    let error = false
    try {
        await transporter.sendMail({
            from: '"Nalcapital test 👻" <siessna@yandex.ru>', // sender address
            to: senderAddress, // list of receivers
            subject: "Verify Email ✔", // Subject line
            html: `Please Verify Your Email by Clicking <a href="${link}">here</a> <br/>
        This link will be valid for only 7 days!`, // html body
        });
    } catch (e) {
        error = true
    }

    return error
},
    sendForgotPasswordEmail: async(senderAddress, link) => {
        let error = false
        try {
            await transporter.sendMail({
                from: '"Nalcapital test 👻" <siessna@yandex.ru>', // sender address
                to: senderAddress, // list of receivers
                subject: "Reset Password ✔", // Subject line
                // text: "Hello world?", // plain text body
                html: `Please Reset Your Password by Clicking <a href="${link}">here</a> <br/>
        This link will be valid for only 7 days!`, // html body
            });
        } catch (e) {
            error = true
        }

        return error
    }
}
