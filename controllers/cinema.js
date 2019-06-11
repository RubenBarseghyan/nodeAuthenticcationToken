const Cinema = require('../models/Cinema');
const Movie = require('../models/Movie');
const errorHnadler = require('../err_utils/errorHandler');


// const mainData = [
//   {id: 1, name: "Moscow", address:"Abovyan St", image: "https://media-cdn.tripadvisor.com/media/photo-s/09/3d/cf/6f/moscow-cinema.jpg", movieList: [{movieId:{name:"Harry Potter",image: "https://assets.www.warnerbros.com/sites/default/files/movies/media/browser/harry_potter_goblet_of_fire_2016_keyart.jpg", trailer: "https://www.youtube-nocookie.com/embed/ECrdR9F45rY"}, time: "12:00"}, {movieId:{name: "Avengers", image:"https://image.tmdb.org/t/p/w342//dHjLaIUHXcMBt7YxK1TKWK1end9.jpg", trailer: "https://www.youtube-nocookie.com/embed/QwievZ1Tx-8"}, time: "16:00"}]},
//   {id: 2, name: "October", address:"Isahakyan St", image: "https://i.pinimg.com/originals/9a/fe/7f/9afe7f6563faf2a726f45120210c287a.jpg",  movieList: [{movieId: {name: "Wild Ocean", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRE49ww9aQpAvYf_y3h53GOToDPx7-eDtBY393dFtD3NfIQAZf",  trailer: "https://www.youtube-nocookie.com/embed/XAfjQxSttSI"}, time: "20:00"}]},
//   {id: 3, name: "Vosxod", address: "Pushkin St", image:"https://i2-prod.derbytelegraph.co.uk/news/nostalgia/article2191235.ece/ALTERNATES/s1200/0_JG_DT_061118CINEMA_01.jpg", movieList: [{movieId: {name: "up 5 to 7", image: "https://moviereviews1188.files.wordpress.com/2017/02/5to7_02.jpg?w=1140", trailer: "https://www.youtube-nocookie.com/embed/9HimzZ6QG2o"}, time: "20:00"}]}
// ];
exports.getAllCinemas = async(req, res) =>{
  try{
    const data = await Cinema.findAsync({}, {name:1, address:1, image:1});
    res.status(201).json(data);
    //   {id: 1, name: "Moscow", address:"Abovyan St", image: "https://media-cdn.tripadvisor.com/media/photo-s/09/3d/cf/6f/moscow-cinema.jpg", movieList: [{movieId:{name:"Harry Potter",image: "https://assets.www.warnerbros.com/sites/default/files/movies/media/browser/harry_potter_goblet_of_fire_2016_keyart.jpg", trailer: "https://www.youtube-nocookie.com/embed/ECrdR9F45rY"}, time: "12:00"}, {movieId:{name: "Avengers", image:"https://image.tmdb.org/t/p/w342//dHjLaIUHXcMBt7YxK1TKWK1end9.jpg", trailer: "https://www.youtube-nocookie.com/embed/QwievZ1Tx-8"}, time: "16:00"}]},
    //   {id: 2, name: "October", address:"Isahakyan St", image: "https://i.pinimg.com/originals/9a/fe/7f/9afe7f6563faf2a726f45120210c287a.jpg",  movieList: [{movieId: {name: "Wild Ocean", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRE49ww9aQpAvYf_y3h53GOToDPx7-eDtBY393dFtD3NfIQAZf",  trailer: "https://www.youtube-nocookie.com/embed/XAfjQxSttSI"}, time: "20:00"}]},
    //   {id: 3, name: "Vosxod", address: "Pushkin St", image:"https://i2-prod.derbytelegraph.co.uk/news/nostalgia/article2191235.ece/ALTERNATES/s1200/0_JG_DT_061118CINEMA_01.jpg", movieList: [{movieId: {name: "up 5 to 7", image: "https://moviereviews1188.files.wordpress.com/2017/02/5to7_02.jpg?w=1140", trailer: "https://www.youtube-nocookie.com/embed/9HimzZ6QG2o"}, time: "20:00"}]}
    // ]);
  } catch(e){
    console.log(e.message);
  }
}


exports.getCinemaById = async(req, res) => {
  try{
    const data = await Cinema.findOne({_id:req.params.id})
      .populate({
        path: 'movieList.movieId'
      })
      .exec();
    console.log(data);

    // res.json(data[req.params.id-1]);
    res.json({data})
  }catch(e){
    console.log(e.message);
  }
}

exports.getCinemaByIdMovieList = async(req, res) => {
  try{
    const data = await Cinema.findOne({_id:req.params.id})
      .populate({
        path: 'movieList.movieId'
      })
      .exec();
    console.log(data);

    // res.json(mainData[req.params.id-1].movieList);
  }catch(e){
    console.log(e.message);
  }
}

exports.removeCinema = async (req, res)=>{
  try{
    const data = await Cinema.deleteOne({_id:req.params.id});
    res.json({data});
  }catch(e){
    console.log(e.message);
  }
}

exports.addCinema = async (req, res)=>{
  try{
    const cinema = new Cinema(req.body);
    const data = await cinema.saveAsync();
    res.json({ data });
  }catch(e){
    console.log(e.message);
  }
}

exports.addMovieInCinema = async (req, res, next) => {
  try {
    const cinema = await Cinema.findOne({ _id: req.params.id });
    const movie = {
      movieId: req.params.movieId,
      time: '12/10/2019',
    };
    cinema.movieList.push(movie);
    await cinema.saveAsync();
    // const update = {
    //   $addToSet: {
    //     movieList: {
    //       movieId: req.params.movieId,
    //       time: '12/10/2019',
    //     }
    //   }
    // };
    // const cinema = await Cinema.updateOne({ _id: req.params.id }, update)
    res.json(cinema);
  } catch (e) {
    next(e);
  }
}

((__dirname, __pathname, module, exports) => {

})()

exports.updateCinema = async(req, res, next)=>{
  try{
  const data = await Cinema.updateAsync(
    {_id:req.params.id},
    {name:req.body.name, address:req.body.address, image: req.body.image});
    res.json({"ok":"was update successfully"});
  }catch(e){
  console.log(e.message);
  }
}
