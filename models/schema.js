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
    userRole : {
        type: String,
        required: true,
    },
});

const Employee = mongoose.model('employees', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const Room = mongoose.model('rooms', {
    roomNo: {
        type: String,
        required: true,
    },
    roomType: {
        type: String,
        required: true,
    },
    servantName: {
        type: String,
        required: true,
    },
    pricePerDay: {
        type: String,
        required: true,
    },
    roomImage: {
        type: String,
        required: true,
    },
    roomDescription: {
        type: String,
        required: true,
    },
    roomAvailability: {
        type: String,
        required: true,
    },
});

module.exports = {User, Employee, Room};