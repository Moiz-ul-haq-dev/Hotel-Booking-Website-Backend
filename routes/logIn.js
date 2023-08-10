const express = require('express');
const router = express.Router();
const {db} = require('../database/sql.js');
const { User } = require('../models/schema.js');

router.get('/', (req, res, next) => {
   User.find().then((users) => {
         res.send(users);
    }, (e) => {
        console.log(e);
    });
});

module.exports = router;