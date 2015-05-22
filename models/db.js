var mongoose = require('mongoose');
mongoose.connect('mongodb://10.134.15.103:27017/be-database-driven-api');
mongoose.connection.once('open', function () {
  console.log('Connected to database');
});