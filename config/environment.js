const dbUri = process.env.MONGODB_DBURI || 'mongodb://localhost:/social-fitness-app';
const secret = process.env.SECRET || 'GRIT';

module.exports = {
  dbUri, secret
};
