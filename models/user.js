const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;


// NOTE: Need to re-assign the tribe ENUMS to actual names
// NOTE: need to  replace programId ref with actual exercise model name

const userSchema = new mongoose.Schema({

  // Authentication Details
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Personal Details
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  heightUnit: { type: String, required: true },
  weight: { type: Number, required: true },
  weightUnit: { type: String, required: true },

  // Application
  tribe: { type: String, required: true, enum: ['tribe1', 'tribe2', 'tribe3'] },
  dailyGrit: [ { date: String, grit: Number } ],

  // External Associations
  exercisePrograms: [ { type: ObjectId, ref: 'exercise' } ],

  // Social
  followers: [ { type: ObjectId, ref: 'User' } ],
  following: [ { type: ObjectId, ref: 'User' } ]

}, { timestamps: true });

// PLUGINS
//throw validation error when duplicate emails are creates
userSchema.plugin(require('mongoose-unique-validator'));

// VIRTUALS
// bmi
// grit

// METHODS
// password validation
userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

// VALIDATORS

//LIFECYCLE HOOKS
// hash a password if it is updated
userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')){ //check if the password is one of the things going to be modified
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});




module.exports = mongoose.model('User', userSchema);
