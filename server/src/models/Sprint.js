const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc-fix').autoIncrement;
const refValidator = require('./validators').checkReferences;
const Issue = require('./Issue');

const SprintSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  issues: {
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
