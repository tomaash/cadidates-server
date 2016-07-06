var HAPI = require('hapi')
var HAPICo = require('hapi-plugin-co')
var candidates = require('./controllers/candidates');

var mongoose = require("mongoose");

// Connect to default promise library
mongoose.Promise = global.Promise;

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/pipe-server';

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

var server = new HAPI.Server({
  debug: {
    request: ['error']
  }
})

server.connection({
  address: '0.0.0.0',
  port: process.env.PORT || 12345,
  routes: {
    cors: true
  }
})

server.register(HAPICo, function() {

  server.route({
    method: 'GET',
    path: '/foo',
    handler: candidates.foo
  })

  server.route({
    method: 'POST',
    path: '/candidates',
    handler: candidates.create
  })

  server.route({
    method: 'GET',
    path: '/candidates',
    handler: candidates.list
  })

  var result = server.start();
  result.then((err, data) => {
    console.log('Started');
  })
})