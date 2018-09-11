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
  height: { type: Number, default: 0 },
  heightUnit: { type: String, default: 'cm'},
  weight: { type: Number, default: 0 },
  weightUnit: { type: String, default: 'kg'},
  imageUrl: { type: String, default: 'https://i0.wp.com/ebus.ca/wp-content/uploads/2017/08/profile-placeholder.jpg?ssl=1'},

  // Application
  tribe: { type: String, enum: ['All Naturals', 'Inbetweeners', 'Gargantuans'] },
  dailyGrit: [ { date: Number, grit: Number } ],

  // External Associations
  exercisePlan: [{ type: ObjectId, ref: 'ExercisePlan' }],

  // Social
  followers: [ { type: ObjectId, ref: 'User' } ],
  following: [ { type: ObjectId, ref: 'User' } ]

}, { timestamps: true });

// make sure the virtuals get added
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

// PLUGINS
//throw validation error when duplicate emails are creates
userSchema.plugin(require('mongoose-unique-validator'));

// VIRTUALS
// grit
userSchema.virtual('grit')
  .get( function() {
    const totalGrit = this.dailyGrit.reduce((sum, dayGrit) => {
      return sum + dayGrit.grit;
    }, 0);

    return totalGrit;
  });

userSchema.virtual('averageGrit')
  .get( function(){
    return this.grit/this.dailyGrit.length;
  });

// bmi

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
