const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({

  // Authentication Details
  username: { type: String},
  email: { type: String, unique: true },
  password: { type: String},

  // Personal Details
  firstName: { type: String},
  surname: { type: String},
  age: { type: Number},
  height: { type: Number},
  heightUnit: { type: String},
  weight: { type: Number},
  weightUnit: { type: String},

  // Application
  tribe: { type: String, enum: ['All Naturals', 'Inbetweeners', 'Gargantuans'] },
  dailyGrit: [ { date: String, grit: Number } ],

  // External Associations
  exercisePrograms: [ { type: ObjectId, ref: 'Exercise' } ],

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
