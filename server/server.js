const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const login = require('./controllers/login');
const refresh = require('./controllers/refresh')
const lyrics = require('./controllers/lyrics');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: true }))

app.post('/login', login.login);
app.post('/refresh', refresh.refresh);
app.get('/lyrics', lyrics.lyrics);

app.listen(3001);