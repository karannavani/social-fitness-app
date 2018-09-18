const express = require('express');
const app = express();
const Router = require('./config/routes');
const errorHandler = require('./lib/errorHandler');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { port, dbUri } = require('./config/environment');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());
app.use(morgan('dev'));


app.use('/api', Router);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);


app.listen(port, () => console.log(`Express is running on port ${port}`));

module.exports = app;
