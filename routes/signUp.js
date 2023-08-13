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

router.post('/',async (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log(password)
    const confirmPassword = req.body.confirmPassword;
    const userRole = req.body.userRole;

    console.log(email, password, confirmPassword, userRole, "this is the data");
    try {
        // Check if user with the same email already exists
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            userRole: userRole,
        }

        db.collection('users').insertOne(data, (err, collection) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log('Record inserted successfully');
            res.status(201).json({ message: 'User created successfully' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
    
module.exports = router;