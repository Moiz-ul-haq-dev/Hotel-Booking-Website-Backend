const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');

const db = require('../database/sql.js');

var storage = multer.diskStorage(
    {
        destination:'./public/images/',
        filename: function (req, file, callback) {
            callback(null, Date.now() + '-' + file.originalname);
        }
    }
);

var upload = multer({storage});

router.post('/',upload.single('image'), (req, res, next) => {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const salary = req.body.salary;
    const cnic = req.body.cnic;
    const image = req.file.filename;
    const status = 'Active'

    const data = {
        name: name,
        email: email,
        contact: contact,
        salary: salary,
        cnic: cnic,
        image: image,
        status : status,
    };

    console.log(data);

    try{
        db.collection('employees').insertOne(data, (err, collection) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            console.log('Record inserted successfully');
            // res.status(201).json({ message: 'Employee created successfully' });
            res.redirect('http://127.0.0.1:5173/dashboard');
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
    
module.exports = router;