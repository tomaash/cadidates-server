var Candidate = require('../models/candidate');

exports.foo = function * (request, reply) {
  var value = yield new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(42)
    }, 1000)
  })
  reply({ value: value })
}

exports.create = function * (request, reply) {
  // console.log(request);
  // console.log('---- payload ----')
  // console.log(request.payload);
  // console.log('---- parsed ----')
  // var payload = JSON.parse(request.payload);
  console.log(request.payload);
  var result = yield Candidate.create(request.payload);
  reply({ result });
}

exports.list = function * (request, reply) {
  // console.log(request);
  var result = yield Candidate.find();
  reply({ result });
}