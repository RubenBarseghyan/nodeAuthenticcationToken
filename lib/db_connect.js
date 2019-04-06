const mongoose = require('mongoose');
const BlubPromise = require('bluebird');
mongoose.Promise = BlubPromise;
BlubPromise.promisifyAll(mongoose);

mongoose.connect('mongodb://localhost/Iguan', {useNewUrlParser: true});
module.exports = mongoose;
