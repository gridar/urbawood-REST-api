var express = require('express');
var restClient = require('restler');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var helper = require('../helper/helper');
var router = express.Router();


router.get('/:api/:method/*', function(req, res) {
  response = res;
  argument = req.url.split('/').slice(3);
  console.log(argument)
  var apiName = req.params.api;
  console.log("apiNem = " + apiName);
  var methodName = req.params.method;
  console.log("api methode = " + methodName)
  
  mongoose.model('Api').findOne({'name': apiName}, function (err, api) {
    host = api.host;
    api.methods.forEach(function(methodId) {
      mongoose.model('Method').findById(methodId, function (err, method) {
        if(method.name == methodName) {
          eval(method.script)
          //vm.createScript(method.script).runInThisContext();
        }
      });
    });
  });

});

module.exports = router;