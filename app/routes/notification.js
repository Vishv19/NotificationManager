var User = require('../models/user');
var errorResponse = require('./errorResponse');
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require('twilio')(accountSid, authToken);

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

  app.post('/api/' + API_VERSION + '/notification/alaram', function(req, res) {
    var body = req.body;
    var email = body.email;
    var from = process.env.TWILIO_NUMBER;

    if(email === null) {
      return res.status(400).json(errorResponse('Email not found', 400));
    }
    User.findOne({ email: email}, function(err, user) {
      client.messages.create({
          to: user.phonenumber, 
          from:from,
          body: "This is an alaram to notify you about an activity",
      }, function(err, message) {
          if(err) console.log(err);
          var userRecord = returnUserRec(user);
          return res.status(201).json(userRecord);
      });
    });
  });
}
