const dbUri = process.env.MONGODB_DBURI || 'mongodb://localhost:/social-fitness-app';
const port = process.env.PORT || 4000;

const secret = process.env.SECRET || 'GRIT';

module.exports = { port, dbUri, secret };
