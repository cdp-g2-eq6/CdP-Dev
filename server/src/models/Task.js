const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc-fix');
const costValidator = require('./validators').isInFibonacci;
const refValidator = require('./validators').checkReferences;
const Issue = require('./Issue');

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  linkedIssues: {
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
  participants: {
    type: Array,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
    validate: {
      validator: costValidator,
      message: 'Cost must be a positive number in the Fibonacci sequence',
    },
  },
  status: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
});

TaskSchema.plugin(autoIncrement.autoIncrement, 'Task');
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
