const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
// const multer = require('multer');

const { Employee } = require('../models/schema.js');

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
    Employee.find().then((employees) => {
        res.send(employees);
    }, (e) => {
        console.log(e);
    });
});

module.exports = router;