const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const userRoutes = require('./routes/user');
const cinemaRoutes = require('./routes/cinema');
const movieRoutes = require('./routes/movie');

const app = express();


require('./middleware/passport')(passport);
app.use(passport.initialize());

app.use(require('morgan')('dev'));
app.use(require('cors')())//connect module and call it

app.use(bodyParser.urlencoded({extended: true}));//allow read the post request
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
//set every route which want make authenticated

app.use('/api/movies', movieRoutes);
// app.use('/api/cinemas', cinemaRoutes);
app.use('/api/cinemas',passport.authenticate('jwt', { session: false }), cinemaRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json(err);
})

app.listen(3000);
