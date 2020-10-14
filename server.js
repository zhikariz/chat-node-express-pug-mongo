const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const chats = require('./routes/chats');

mongoose
  .connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected !'))
  .catch(err => console.log(err));

// init app
const app = express();

// Body parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// init view engine
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index'));
app.get('/chats', (req, res) => {
  let idPenerima = req.query.receiver;
  let idPengirim = req.query.sender;
  res.render('index', {idPenerima: idPenerima, idPengirim: idPengirim});
});
app.get('/api/', (req, res) => res.json({status: res.statusCode, msg: 'What in the world r u doin here?'}));
app.use('/api/chats', chats);

app.listen(3000, () => console.log('Listen To Port 3000'));
