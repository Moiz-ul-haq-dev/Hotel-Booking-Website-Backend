const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://moizulhaq472:CeO2GZpYu92iyTLR@hotelierdb.jqhjqey.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on('error', () => console.log('Error connecting to database'));
db.once('open', () => console.log('Connected to database'));

module.exports = db;