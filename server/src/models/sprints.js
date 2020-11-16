const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc').autoIncrement;

const SprintSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  issues: {
    type: Array,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

SprintSchema.plugin(autoIncrement, 'Sprint');
const Sprint = mongoose.model('Sprint', SprintSchema);
module.exports = Sprint;
