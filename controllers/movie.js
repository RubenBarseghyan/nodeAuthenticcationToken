const Movie = require('../models/Movie');
const errorHandler = require('../err_utils/errorHandler');

module.exports.getAllMovies = async(req, res) =>{
  try{
    const data = await Movie.findAsync({}, {name:1, image:1, trailer:1});
    res.status(201).json(data);
  } catch(e){

  }
}

module.exports.getMovieById = async(req, res) => {
  try{
    const data = await Movie.findAsync({_id:req.params.id});
    res.json(data);
  }catch(e){
    console.log(e.message);
  }
}

module.exports.addMovie = async(req, res)=>{
  try{
    const movie = new Movie({name: req.body.name, image: req.body.image, trailer: req.body.trailer});
    const data = await movie.saveAsync();
    res.json({data:data});
  }catch(e){
    console.log(e.message);
  }
}

exports.removeMovie = async (req, res, next)=>{
  try{
    const data = await Movie.deleteOne({_id:req.params.id});
    res.json({data:data});
  }catch(e){
    console.log(e.message);
  }
}

exports.updateMovie = async(req, res, next)=>{
  try{
  const data = await Movie.updateAsync(
    {_id:req.params.id},
    {name:req.body.name, position:req.body.position, trailer: req.body.trailer});
    res.json({"ok":"was update successfully"});
  }catch(e){
  console.log(e.message);
  }
}
