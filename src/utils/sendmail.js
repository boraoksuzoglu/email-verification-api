const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({

    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    },
    service: process.env.EMAIL_SERVICE
    
}) 

module.exports = (options) => {
    transporter.sendMail({from: process.env.EMAIL_USERNAME, ...options})
    .catch(err => console.log(err))
}