const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');

const db = require('../database/sql.js');

var storage = multer.diskStorage(
    {
        destination:'./public/roomImages/',
        filename: function (req, file, callback) {
            callback(null, Date.now() + '-' + file.originalname);
        }
    }
);

var upload = multer({storage});

router.post('/',upload.single('roomImage'), (req, res, next) => {

    const data = {
        roomNo: req.body.roomNo,
        roomType: req.body.roomType,
        servantName: req.body.servantName,
        pricePerDay: req.body.pricePerDay,
        roomImage: req.file.filename,
        roomDescription: req.body.roomDescription,
        roomAvailability: req.body.roomAvailability,
    };

    // console.log(data);

    try{
        db.collection('rooms').insertOne(data, (err, collection) => {
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