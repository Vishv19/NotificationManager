var User = require('../models/user');
var validator = require('validator');
var errorResponse = require('./errorResponse');

function returnUserRec(doc) {
  var userRecord = {
    data :{
      id : doc._id,
      name : doc.name,
      email : doc.email,
      phonenumber:doc.phonenumber
    }
  };
  return userRecord;
}

module.exports = function(app) {
  var API_VERSION = app.API_VERSION;

  app.post('/api/' + API_VERSION + '/users', function(req, res) {
    var body = req.body;
    var email = body.email;

    if(email === null) {
      return res.status(400).json(errorResponse('Email not found', 400));
    }
    User.findOne({ email: email}, function(err, user) {
      if(user) {
        var userRecord = returnUserRec(user);
        return res.status(201).json(userRecord);
      }
      User.create( body, function (err, doc) {
        if (err) return next(err);
        var userRecord = returnUserRec(doc);
        return res.status(201).json(userRecord);
      });
    });
  });

  app.get('/api/' + API_VERSION + '/users/:user_id', function(req, res, next) {
    var id = req.params.user_id;
    User.findOne({_id: id}, function(err, doc) {
      if(doc) {
        var userRecord = returnUserRec(doc);
        return res.status(200).json(userRecord);
      }
      return res.status(404).json(errorResponse('User not found', 404));
    })
  });  
}
