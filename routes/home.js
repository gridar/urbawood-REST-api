var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/home', { title: 'Home', pageDescription: "Ain't no place like it" });
});

router.get('/about', function(req, res, next) {
  res.render('index/about', { title: 'About', pageDescription: 'Here is e quick guide to get started with the Api.'})
});

module.exports = router;
