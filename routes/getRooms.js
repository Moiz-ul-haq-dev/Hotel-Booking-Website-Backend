const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// const multer = require('multer');

const { Room } = require('../models/schema.js');

const db = require('../database/sql.js');

// var storage = multer.diskStorage(
//     {
//         destination:'./public/images/',
//         filename: function (req, file, callback) {
//             callback(null, Date.now() + '-' + file.originalname);
//         }
//     }
// );

// var upload = multer({storage});

router.get('/', (req, res, next) => {
    Room.find().then((rooms) => {
        res.send(rooms);
    }, (e) => {
        console.log(e);
    });
});

module.exports = router;