const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const userRoutes = require('./routes/user');

const app = express();

require('./middleware/passport')(passport);
app.use(passport.initialize());

app.use(require('morgan')('dev'));
app.use(require('cors')())//connect module and call it

app.use(bodyParser.urlencoded({extended: true}));//allow read the post request
app.use(bodyParser.json());

app.use('/api/user', userRoutes);

app.listen(3000);
