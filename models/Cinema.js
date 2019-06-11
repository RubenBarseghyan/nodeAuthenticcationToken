const mongoose = require('mongoose');
const db = require('../lib/db_connect');
const Schema = mongoose.Schema;

const CinemaSchema = new db.Schema({
  name:{
    type:String,
    required: true,
    trim: true
  },
  address:{
    type:String,
    required: true,
  },
  image:{
    type:String,
    required: true,
  },
  movieList: [{
    movieId: {
      type: mongoose.ObjectId,
      ref:  'movies',
      required: true,
    },
    time: {
      type: String,
      required: true
    }
  }]
});

module.exports = mongoose.model('cinemas', CinemaSchema);
