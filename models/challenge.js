const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

// each challenge group decided by 'how far', 'how long for' and 'how many'
const challengeSchema = new mongoose.Schema({
  name: String,
  type: String,
  challengeGrit: Number,
  distance: Number,
  time: Number,
  reps: Number,
  challengers: [{ type: ObjectId, ref: 'User' }],
  completedBy: [{ type: ObjectId, ref: 'User' }],
  createdBy: { type: ObjectId, ref: 'User'}
},
{ timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
