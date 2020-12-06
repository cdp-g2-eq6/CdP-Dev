const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc-fix').autoIncrement;
const refValidator = require('./validators').checkReferences;
const Task = require('./Task');

const TestSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  linkedTask: {
    type: Number,
    ref: 'Task',
    validate: {
      validator: function(id) {
        return id != null && refValidator(Task, id);
      },
      message: 'No Task with provided id was found',
    },
    required: true,
  },
  runs: [{
    _id: false,
    runDate: Date,
    passed: Boolean,
  }],
});

TestSchema.plugin(autoIncrement, 'Test');
const Test = mongoose.model('Test', TestSchema);
module.exports = Test;
