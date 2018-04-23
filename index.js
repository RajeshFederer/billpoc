'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
let action = require('./lib/action');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.post('/', (req, res) => {
    console.log('INC REQUEST', JSON.stringify(req.body));
    return action[req.body.result.action](req, res);
});

app.listen(port, function () {
  console.log('AGENT is running my app on  PORT: ' + port);
});