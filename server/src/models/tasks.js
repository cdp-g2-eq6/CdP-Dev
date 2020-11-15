const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
const costValidator = require('./validators').isInFibonacci;

const TaskSchema = new Schema({
  linkedIssue: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
