const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'dev'; //production or dev
const dbUri = process.env.MONGODB_URI || `mongodb://localhost/social-fitness-app-${env}`;
// const dbUri = process.env.MONGODB_DBURI || 'mongodb://localhost:/social-fitness-app';
// heroku comment
const secret = process.env.SECRET || 'GRIT';

module.exports = { port, dbUri, secret };
