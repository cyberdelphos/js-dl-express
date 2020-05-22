var express = require('express');
var faker = require('faker');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var jwtSecret = 'adiov90423og49pyov8vh24iu';

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressJwt({secret: jwtSecret}).unless({path: ['/login']}));
app.use('/downloads', express.static('files'));

app.get('/random-user', function (req, res) {
  var user = faker.helpers.userCard();
  user.avatar = faker.image.avatar();
  res.json(user);
})

app.post('/login', authenticate, function (req, res) {
  var token = jwt.sign({
    username: 'hola'
  }, jwtSecret);
  res.send({
    token: token,
    user: {
      username: req.body.username,
      password: req.body.password
    }
  })
});

app.get('/data', function (req, res) {
  res.send('hola!!!')
});

app.listen(3000, function () {
  console.log('App listening on localhost:3000');
})

// Utils
function authenticate(req, res, next) {
  var body = req.body;
  if(!body.username || !body.password) {
    res.status(400).end('Must provide username or password');
  }
  if (body.username !== 'hola' || body.password !== 'perro') {
    res.status(401).end('Incorrect user/password');
  }
  next();
}
