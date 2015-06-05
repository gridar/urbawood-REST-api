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
  //find the ID in the Database
  mongoose.model('Api').findById(id, function (err, api) {
    //if it isn't found, we are going to repond with 404
    if (err) {
      console.log(id + ' was not found');
      res.status(404)
      var err = new Error('Not Found');
      err.status = 404;
      res.format({
          html: function(){
              next(err);
           }
      });
      return next(err)
    //if it is found we continue on
    } else {
      req.id = id;
      next(); 
    } 
  });
});

/* GET all apis. */
router.route('/').get(function(req, res, next) {

  mongoose.model('Api').find({}, function (err, apis) {
    
    if (error) return next(error);
    
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
    if (err) {
      res.send("There was a problem adding the api to the database.");
    } else {
      console.log('POST creating new api: ' + api);
      res.format({
        html: function(){
          res.location("apis");
          res.redirect("/apis");
        }
      });
    }
  })
});

/* GET New Api page. */
router.get('/new', function(req, res) {
    res.render('apis/new', { title: 'Add New Api' });
});

/* SHOW a Api by ID. */
router.route('/:id').get(function(req, res) {
  
  mongoose.model('Api').findById(req.id, function (err, api) {
    
    if (error) return next(error);

    mongoose.model('Method').find({
        '_id': { $in: api.methods}
    }, function(err, methods){
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
});

/* GET the Api by Mongo ID */
router.route('/:id/edit').get(function(req, res) {
  
  mongoose.model('Api').findById(req.id, function (err, api) {
    
    if (error) return next(error);

    res.format({
      html: function(){
         res.render('apis/edit', {
          title: 'Api' + api._id,
          "api" : api
        });
      }
    });

  });
})

/* PUT to update a Api by ID */
router.route('/:id/edit').put(function(req, res) {
  // Get our REST or form values.
  var name = req.body.name;
  var host = req.body.host;
  var description = req.body.description;

  mongoose.model('Api').findById(req.id, function (err, api) {
    api.update({
      name : name,
      host : host,
      description : description
    }, function (err, apiID) {
      if (err) {
        res.send("There was a problem updating the information to the database: " + err);
      } 
      else {
        //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
        res.format({
          html: function(){
            res.redirect("/apis/" + api._id);
          }
        });
      }
    })
  });
})

/* DELETE a Api by ID. */
router.delete('/:id/edit', function (req, res){
  //find api by ID
  console.log(req.id)
  mongoose.model('Api').findById(req.id, function (err, api) {
    if (err) {
        return console.error(err);
    } else {
      //remove it from Mongo
      api.remove(function (err, api) {
        if (err) {
            return console.error(err);
        } else {
          //Returning success messages saying it was deleted
          console.log('DELETE removing ID: ' + api._id);
          res.format({
            html: function(){
              res.redirect("/apis");
            }
          });
        }
      });
    }
  });
});

module.exports = router;