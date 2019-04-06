const mongoose = require('mongoose');
const db = require('../lib/db_connect');
const Schema = mongoose.Schema;

const UserSchema = new db.Schema({
  username: {
    type:String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },
  password: {
    type: String,
    required:true,
    trim: true
  },
  role: {
  type: String,
  enum: ['user', 'admin'],
  default: 'user',
}

});

module.exports = mongoose.model('users', UserSchema);
