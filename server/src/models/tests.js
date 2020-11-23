const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc').autoIncrement;

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
    required: true,
  },
  statusHistory: [{
    runDate: Date,
    passed: Boolean,
  }],
});

TestSchema.plugin(autoIncrement, 'Test');
const Test = mongoose.model('Test', TestSchema);
module.exports = Test;
