var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');

var UserSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  token: {type: String},
  profile:   [{
      firstName: {type: String, required: true},
      lastName: {type: String, required: true},
      birthdate: {type: Date},
      gender: {type: String},
      phoneNum: {type: Number},
      status: {type: String},
      illness: {type: String},
      illnessInfo: {type: String}
    }],
  appointments: [{
      date: {type: Date},
      name: {type: String},
      time: {type: String},
      location: {type: String},
      doctor: {type: String},
      phoneNum: {type: String},
      coPay: {type: Number},
      notes: {type: String}
    }],
  medications: [{
      name: {type: String},
      dosage: {type: String},
      sideEffects: {type: String},
      time: {type: String},
      coPay: {type: Number}
    }],
  foodRestrictions: [{
      name: {type: String},
      notes: {type: String}
    }]
}, {timestamps: true});

UserSchema.pre('save', function(next){
  if ( this.isModified('password') ) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

UserSchema.methods.setToken = function(callback){
  var scope = this;
  crypto.randomBytes(256, function(err, buffer){
    if (err) return callback(err);
    scope.token = buffer;
    scope.save(function(err){
      if (err) return callback(err);
      callback();
    });
  });
};

UserSchema.methods.authenticate = function(passwordTry, callback){
  bcrypt.compare(passwordTry, this.password, function(err, isMatch){
    if (err) { return callback(err) };
    callback(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);
