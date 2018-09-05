// const express = require('express');
// const app = express();
// const Router = require('./config/routes');
// const errorHandler = require('./lib/errorHandler');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const { port, dbUri } = require('./config/environment');
// const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
// mongoose.connect(dbUri);
//
// app.use('/api', Router);
// app.use(errorHandler);
//
// app.use(bodyParser.json());
// app.use(morgan('dev'));
//
// app.use(bodyParser.json());
// app.use(morgan('dev'));
//
// app.use('/api', Router);
//
// //errorHandler must go after Router!
// app.use(errorHandler);
//
// app.listen(port, () => console.log(`Express is running on port ${port}`));
//
// module.exports = app;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./lib/errorHandler');
const Router = require('./config/routes');
const app = express();
const mongoose = require('mongoose');
const { dbUri } = require('./config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri);

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', Router);

//errorHandler must go after Router!
app.use(errorHandler);

app.listen(4000, () => console.log('Express is listening on port 4000'));
