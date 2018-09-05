function errorHandler(err, req, res, next) {
  console.log('errorHandler triggered', err, 'Error name', err.name);

  if(err.name === 'ValidationError') {
    const response = {};
    for( const key in err.errors) {
      const errorObject = err.errors[key];
      response[key] = errorObject.message;
    }
    return res.status(401).json({ errors: response, message: 'Unprocessible Entity' });
  }
  if(err.name === 'MongoError') {
    res.json({ code: err.code, message: err.message});
  }
  return res.status(500).json({ message: 'A server error occured. We\'re working to fix it, please try again later' });
}

module.exports = errorHandler;
