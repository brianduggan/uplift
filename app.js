////////// MODULES & MIDDLEWARE //////////

var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var mongoPath = 'mongodb://localhost/project3'
var mongoose = require('mongoose');
mongoose.connect(mongoPath);

app.use(express.static('./public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var loadUser = require('./middleware/loadUser');
app.use(loadUser);

////////// ROUTES //////////

var userRouter = require('./routes/users');
app.use('/users', userRouter);

app.get('/', function(req, res){
  res.render('index');
});

////////// LISTENING //////////

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on port '+ port);
});
