import axios from 'axios';

const Request = {};

Request.updateFeed = function(feedBody){
  axios.post('/api/feed', feedBody)
    .catch(err => console.log('adopt feed error', err));
};

export default Request;
