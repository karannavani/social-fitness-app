const express = require('express');
const app = express();
const Router = require('./config/routes');
// const errorHandler = require('./lib/errorHandler');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { port, dbUri } = require('./config/environment');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri);

app.use('/api', Router);
// app.use(errorHandler);

app.use(bodyParser.json());
app.use(morgan('dev'));

app.listen(port, () => console.log(`Express is running on port ${port}`));

module.exports = app;
