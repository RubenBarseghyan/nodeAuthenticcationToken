const express = require('express');

const  cinemaController = require('../controllers/cinema');

const cinemaRouter = express.Router();



cinemaRouter.get('/', cinemaController.getAllCinemas);
cinemaRouter.get('/:id', cinemaController.getCinemaById);
cinemaRouter.post('/', cinemaController.addCinema);
cinemaRouter.patch('/:id', cinemaController.updateCinema);
cinemaRouter.delete('/:id', cinemaController.removeCinema);

cinemaRouter.get('/:movieId/presents', cinemaController.getCinemaByIdMovieList);

cinemaRouter.post('/:id/movie/:movieId', cinemaController.addMovieInCinema);

module.exports = cinemaRouter;
