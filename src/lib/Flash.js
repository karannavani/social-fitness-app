const Flash = {};

Flash.messages = null;

Flash.setMessage = function(type, content) {
  // Create an empty array if this.messages is null
  this.messages = this.messages || [];
  this.messages.push({ type, content });
  console.log('the content for the message is', this.messages);
};

Flash.getMessages = function() {
  return this.messages;
};

Flash.clearMessages = function() {
  this.messages= null;
};

export default Flash;
