const express = require('express');

const  movieController = require('../controllers/movie');

const movieRouter = express.Router();

movieRouter.get('/', movieController.getAllMovies);
movieRouter.get('/:id', movieController.getMovieById);
movieRouter.post('/', movieController.addMovie);
movieRouter.patch('/:id', movieController.updateMovie);
movieRouter.delete('/:id', movieController.removeMovie)

module.exports = movieRouter;
