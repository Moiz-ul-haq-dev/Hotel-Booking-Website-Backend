const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
// const multer = require('multer');

const db = require('../database/sql.js');

// var storage = multer.diskStorage(
//     {
//         destination:  './public/images/',
//         filename: function(req, file, callback) {
//             callback(null, Date.now() + '-' + file.originalname);
//         }
//     }
// );

// var upload = multer({storage});

router.post('/',(req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log(password)
    const confirmPassword = req.body.confirmPassword;

    console.log(email, password, confirmPassword);


    const data = {
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword,
    }

    db.collection('users').insertOne(data,(err, collection) => {
        if(err) throw console.log(err);
        console.log('Record inserted successfully');
    });
});
    
module.exports = router;