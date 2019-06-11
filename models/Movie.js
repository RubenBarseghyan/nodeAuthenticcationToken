const mongoose = require('mongoose');
const db = require('../lib/db_connect');
const Schema = mongoose.Schema;

const MovieSchema = new db.Schema({
  name: {
    type:String,
    required: true,
    trim: true
  },

  image: {
    type:String,
    required: true,
  },
  trailer: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('movies', MovieSchema);
