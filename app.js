var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Room } = require('./models/schema.js');
const stripe = require('stripe')('sk_test_51Nf6L5Id7pugrhpKza2zXC8J6o33gkHwuWPobG3LxWiBqDRdKmHbjLdJKybDN4Zd8Ww0ONXQ4Hsa0UFPHV4VdTaG00LNRYEPLx');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signUpRouter = require('./routes/signUp');
var logInRouter = require('./routes/logIn');
var addEmployeesRouter = require('./routes/addEmployees');
var getEmployeesRouter = require('./routes/getEmployees');
var addRoomsRouter = require('./routes/addRooms');
var getRoomsRouter = require('./routes/getRooms');
var sendContactMailRouter = require('./routes/sendContactMail');
var paymentRoomRouter = require('./routes/paymentRoom');

var database = require('./database/sql.js');

var app = express();

var cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://hotelier-site.vercel.app');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE' );
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signUp', signUpRouter);
app.use('/logIn', logInRouter);
app.use('/addEmployees', addEmployeesRouter);
app.use('/getEmployees', getEmployeesRouter);
app.use('/addRooms', addRoomsRouter);
app.use('/getRooms', getRoomsRouter);
app.use('/sendContactMail', sendContactMailRouter);
app.use('/paymentRoom', paymentRoomRouter);


app.get('/success', async (req, res) => {
  const { session_id } = req.query;
  const session = await stripe.checkout.sessions.retrieve(session_id);

  if(session.payment_status === 'paid'){
    console.log('Payment was successful',session.metadata.roomNo);
    await Room.updateOne({ roomNo : session.metadata.roomNo }, { $set: { roomAvailability: 'Unavailable' }});
    console.log('Room updated');
    res.redirect('https://hotelier-site.vercel.app/paymentDone');
  }else{
    console.log('Payment was not successful');
    res.send('failed');
  }
});

app.get('/cancel', (req, res) => {
  console.log('Payment was not successful');
  res.send('Payment was not successful');
});


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
