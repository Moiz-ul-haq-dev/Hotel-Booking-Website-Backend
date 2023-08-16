const express = require('express');
const router = express.Router();
// const multer = require('multer');
const {transporter} = require('../nodemailer/nodemailer.js');

const db = require('../database/sql.js');

router.post('/',async (req, res, next) => {
    console.log(req.body);
    const username = req.body.userName;
    const useremail = req.body.userEmail;
    const userphone = req.body.userPhone;
    const usermessage = req.body.userMessage;
    // const {name, email, subject, message} = req.body; 
    
    const mailOptions = {
        from: `${useremail} < ${username} >`,
        to: 'moizulhaq472@gmail.com',
        subject: "Contact Form Message",
        html : `<h1>From: ${username}</h1>
                <h2>Email: ${useremail}</h2>
                <h2>Phone: ${userphone}</h2>
                <h2>Message: ${usermessage}</h2>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.send('error');
        }
        else{
            console.log('Email sent... ');
            res.redirect('https://hotelier-site.vercel.app/mailSent')
        }
    });
});
    
module.exports = router;