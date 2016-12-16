var Candidate = require('../models/candidate');
var Boom = require('boom');

exports.foo = function * (request, reply) {
  console.log(request.query)
  if (!request.query.question) {
    reply(Boom.create(400, 'Bad request: a must include question parameter'))
  }
  var value = yield new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(`Answer to ${request.query.question} is.. 42!`)
    }, 1000)
  })
  reply({ value: value })
}

exports.create = function * (request, reply) {
  console.log(request.payload);
  var result = yield Candidate.create(request.payload);
  reply({ result });
}

exports.list = function * (request, reply) {
  var result = yield Candidate.find();
  reply({ result });
}