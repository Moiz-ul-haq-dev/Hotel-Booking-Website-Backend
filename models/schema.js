const mongoose = require('mongoose');

const User = mongoose.model('users', {
    email: {
        type: String,
        required: true,
    },
    passowrd : {
        type: String,
        required: true,
    },
    confirmPassword : {
        type: String,
        required: true,
    },
});

module.exports = {User};