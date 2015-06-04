var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var vm = require('vm');
var restClient = require('restler');
var helper = require('../helper/helper');

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
  mongoose.model('Method').findById(id, function (err, method) {
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
    //if it is found we continue on
    } else {
      req.id = id;
      next(); 
    } 
  });
});

/* GET all methods. */
router.route('/').get(function(req, res, next) {
  //retrieve all methods from Monogo
  mongoose.model('Method').find({}, function (err, methods) {
    if (err) {
      return console.error(err);
    } else {
      res.format({
        html: function(){
          res.render('methods/index', {
            title: 'All Methods',
            "methods" : methods
          });
        }
      });
    }     
  });
})

/* POST a new method. */
router.route('/').post(function(req, res) {
  // Get values from POST request.
  var api = req.body.api
  var name = req.body.name;
  var description = req.body.description;
  var type = req.body.type;
  var parameters = req.body.parameters;
  var script = req.body.script;
  var apiId = req.body.apiId;

  mongoose.model('Method').create({
    name : name,
    description : description,
    type : type,
    script : script,
    parameters : parameters,
    _api : apiId

  }, function (err, method) {
    if (err) {
      res.send("There was a problem adding the method to the database.");
    } else {
      console.log('POST creating new method: ' + method);
      mongoose.model('Api').findById(apiId, function (err, api) {
        api.methods.push(method._id);
        
        console.log(api)
        res.format({
          html: function(){
            res.location("apis");
            res.redirect("/apis/" + apiId + "/edit");
          }
        });
      })
    }
  })
});

/* GET New Method page. */
router.get('/new', function(req, res) {
  
  mongoose.model('Api').find({}, function(err, apis){
    var apiNames = [];
    for(var i in apis){
      apiNames[i] = apis[i].name;
    }
    res.render('methods/new', { title: 'Add New Method',
                              "apis": apis
                            });
  })
});

/* SHOW a Method by ID. */
router.route('/:id').get(function(req, res) {
  mongoose.model('Method').findById(req.id, function (err, method) {
    if (err) {
      console.log('GET Error: There was a problem retrieving: ' + err);
    } else {
      mongoose.model('Method').find({
          '_id': { $in: method.methods}
      }, function(err, methods){
        res.format({
          html: function(){
            res.render('methods/show', {
              "method" : method,
              "methods" : methods
            });
          }
        });
      });

      
    }
  });
});

/* GET the Method by Mongo ID */
router.route('/:id/edit').get(function(req, res) {
  mongoose.model('Method').findById(req.id, function (err, method) {
    if (err) {
      console.log('GET Error: There was a problem retrieving: ' + err);
    } else {
      res.format({
        html: function(){
           res.render('methods/edit', {
            title: 'Method' + method._id,
            "method" : method
          });
        }
      });
    }
  });
})

/* PUT to update a Method by ID */
router.route('/:id/edit').put(function(req, res) {
  // Get our REST or form values.
  var name = req.body.name;
  var description = req.body.description;
  var type = req.body.type;
  var parameters = req.body.parameters;
  var script = req.body.script;

  mongoose.model('Method').findById(req.id, function (err, method) {
    method.update({
      name : name,
      description : description,
      type : type,
      script : script,
      parameters : parameters
    }, function (err, methodID) {
      if (err) {
        res.send("There was a problem updating the information to the database: " + err);
      } 
      else {
        //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
        res.format({
          html: function(){
            res.redirect("/methods/" + method._id);
          }
        });
      }
    })
  });
})

/* DELETE a Method by ID. */
router.delete('/:id/edit', function (req, res){
  //find api by ID
  console.log(req.id)
  mongoose.model('Method').findById(req.id, function (err, method) {
    if (err) {
        return console.error(err);
    } else {
      //remove it from Mongo
      method.remove(function (err, method) {
        if (err) {
            return console.error(err);
        } else {
          //Returning success messages saying it was deleted
          console.log('DELETE removing ID: ' + method._id);
          res.format({
            html: function(){
              res.redirect("/methods");
            }
          });
        }
      });
    }
  });
});

module.exports = router;