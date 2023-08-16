const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth: {
        user: 'moizshah472@gmail.com',
        pass: 'xbelwbuxqsopttcc',
    }
});

module.exports = {transporter};