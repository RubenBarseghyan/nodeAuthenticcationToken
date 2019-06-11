const mongoose = require('mongoose');
const db = require('../lib/db_connect');
const Schema = mongoose.Schema;

const UserSchema = new db.Schema({
  userName: {
    type:String,
    required: true,
    trim: true
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },
  userPassword: {
    type: String,
    required:true,
    trim: true
  },
  role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user',
  trim: true,
}

});

module.exports = mongoose.model('users', UserSchema);
