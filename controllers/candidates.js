var Candidate = require('../models/candidate');
var Boom = require('boom');
var Joi = require('joi');

exports.foo = function* (request, reply) {
  console.log(request.query)
  if (!request.query.question) {
    reply(Boom.create(400, 'Bad request: a must include question parameter'))
  }
  var value = yield new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(`Answer to ${request.query.question} is.. 42!`)
    }, 1000)
  })
  reply({
    value: value
  })
}

exports.sampleError = function* (request, reply) {
  throw Boom.create(503, "Don't feel like serving")
}

exports.createValidator = {
  payload: {
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    linkedin: Joi.string(),
    twitter: Joi.string(),
    passion: Joi.string(),
    languages: Joi.array(),
    video: Joi.object()
  }
};

exports.create = function* (request, reply) {
  console.log(request.payload);
  var result = yield Candidate.create(request.payload);
  reply({
    result
  });
}

exports.list = function* (request, reply) {
  var result = yield Candidate.find();
  reply({
    result
  });
}