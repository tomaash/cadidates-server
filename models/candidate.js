var mongoose = require('mongoose');

var candidate = new mongoose.Schema(
  {
    blog: 'string',
    email: 'string',
    firstName: 'string',
    lastName: 'string',
    linkedin: 'string',
    passion: 'string',
    twitter: 'string',
    languages: [{}],
    video: {}
  });

module.exports = mongoose.model('Candidate', candidate);