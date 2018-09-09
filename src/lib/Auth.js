const Auth = {};

Auth.isAuthenticated = function() {
  return !!this.getToken();
};

Auth.setToken = function(token) {
  localStorage.setItem('token', token);
};

Auth.getToken = function() {
  return localStorage.getItem('token');
};

Auth.removeToken = function() {
  localStorage.removeItem('token');
};


//Decode token and get values which were stored on it
Auth.getPayload = function() {
  const token = this.getToken();
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
};

Auth.currentUsername = function() {
  return this.getPayload().username;
};

Auth.currentUserId = function() {
  return this.getPayload().sub;
};

Auth.currentUserTribe = function() {
  return this.getPayload().userTribe;
};

Auth.bearerHeader = function() {
  return {
    // request options
    headers: {
      // request headers
      authorization: `Bearer ${Auth.getToken()}`
    }
  };
};


export default Auth;
