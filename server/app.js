/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const user = require('./user.route'); // Imports routes for the users

const app = express();

// Set up mongoose connection
const admin = {
  name: 'admin',
  password: 'admin1',
};
const devDBUrl = process.env.MONGODB_URI
  || `mongodb://${admin.name}:${admin.password}@ds052978.mlab.com:52978/rss-game`;

mongoose
  .connect(devDBUrl)
  .then(() => console.log('Successfully connected to database'))
  .catch(err => console.error(err));
// mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const port = process.env.PORT || 1902;

app.listen(port, () => {
  console.log('Server run and listen port ', port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', user);

app.use(express.static(path.resolve(__dirname, '../landing/')));
app.use('/game', express.static(path.resolve(__dirname, '../dist/')));
