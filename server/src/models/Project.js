const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const refValidator = require('./validators').checkReferences;
const Issue = require('./Issue');
const Sprint = require('./Sprint');

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  participants: {
    type: [String],
    required: true,
  },
  backlog: {
    type: [{
      type: Number,
      ref: 'Issue',
      validate: {
        validator: function(id) {
          return id != null && refValidator(Issue, id);
        },
        message: 'No Issue with provided id was found',
      },
    }],
    required: true,
  },
  sprints: {
    type: [{
      type: Number,
      ref: 'Sprint',
      validate: {
        validator: function(id) {
          return id != null && refValidator(Sprint, id);
        },
        message: 'No Sprint with provided id was found',
      },
    }],
    required: true,
  },
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
