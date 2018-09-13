import axios from 'axios';
import Auth from './Auth';

const Request = {};

Request.updateFeed = function(feedBody){
  axios.post('/api/feed', feedBody, Auth.bearerHeader())
    .catch(err => console.log('adopt feed error', err));
};

export default Request;
