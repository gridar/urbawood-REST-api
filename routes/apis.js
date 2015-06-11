var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Prepare CRUD and REST methods
router.use(bodyParser.urlencoded({ extended: true }))

router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
  mongoose.model('Api').findById(id, function (err, api) {
    if (err) {
      res.status(404)
      err.status = 404;
      return next(err)
    //if it is found we continue on
    } else {
      req.id = id;
      req.api = api;
      next(); 
    } 
  });
});

/* GET all apis. */
router.route('/').get(function(req, res, next) {

  mongoose.model('Api').find({}, function (err, apis) {
    
    if (err) return next(err);
    
    res.format({
      html: function(){
        res.render('apis/index', {
          title: 'All Apis',
          "apis" : apis
        });
      }
    });
         
  });
})

/* POST a new api. */
router.route('/').post(function(req, res) {

  // Get values from POST request.
  var name = req.body.name;
  var host = req.body.host;
  var description = req.body.description;
  var methods = [];

  mongoose.model('Api').create({
    name : name,
    host : host,
    description : description,
    methods : methods
  }, function (err, api) {

    if (err) return next(err);

    res.format({
      html: function(){
        res.location("apis");
        res.redirect("/apis");
      }
    });

  })
});

/* GET New Api page. */
router.get('/new', function(req, res) {
    res.render('apis/new', { title: 'Add New Api' });
});

/* SHOW a Api by ID. */
router.route('/:id').get(function(req, res) {
  //get api from route middleware
  var api = req.api;

  //get all methods in api.methods
  var Model = mongoose.model('Method');
  Model.find({'_id': { $in: api.methods}}, function(err, methods){

    if (err) return next(err);

    res.format({
      html: function(){
        res.render('apis/show', {
          "api" : api,
          "methods" : methods
        });
      }
    });

  });
});

/* GET the Api by Mongo ID */
router.route('/:id/edit').get(function(req, res) {
  //get api from route middleware
  var api = req.api;

  res.format({
    html: function(){
       res.render('apis/edit', {
        title: 'Api' + api._id,
        "api" : api
      });
    }
  });

})

/* PUT to update an Api by ID */
router.route('/:id/edit').put(function(req, res) {
  //get api from route middleware
  var api = req.api;

  var name = req.body.name;
  var host = req.body.host;
  var description = req.body.description;

  api.update(
  {
    name : name,
    host : host,
    description : description
  }, function (err, apiID) {
    if (err) return next(err);

    res.format({
      html: function(){
        res.redirect("/apis/" + api._id);
      }
    });
    
  })
})

/* DELETE a Api by ID. */
router.delete('/:id/edit', function (req, res){
  //get api from route middleware
  var api = req.api;

  //remove it from Mongo
  api.remove(function (err, api) {

    if (err) return next(err);
    
    //Returning success messages saying it was deleted
    res.format({
      html: function(){
        res.redirect("/apis");
      }
    });

  });
});

module.exports = router;