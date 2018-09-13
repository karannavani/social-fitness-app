function errorHandler(err, req, res) {
  console.log('errorHandler triggered | Error name', err.name);

  if(err.name === 'ValidationError') {
    console.log('Validation error', err.name);
    const response = {};
    for( const key in err.errors) {
      const errorObject = err.errors[key];
      response[key] = errorObject.message;
    }
    return res.status(401).json({ errors: response, message: 'Unprocessible Entity' });
  }
  if(err.name === 'MongoError') {
    console.log('Mongo error', err.name);
    res.json({ code: err.code, message: err.message});
  }
  return res.status(500).json({ message: 'A server error occured. Please try again later' });
}

module.exports = errorHandler;
