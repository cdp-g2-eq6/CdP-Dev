const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc').autoIncrement;
const difficultyValidator = require('./validators').isInFibonacci;

const IssueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: new Schema({
    role: {
      type: String,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    benefit: {
      type: String,
      required: true,
    },
  }),
  difficulty: {
    type: Number,
    required: true,
    validate: {
      validator: difficultyValidator,
      message: 'Difficulty must be a positive number in the Fibonacci sequence',
    },
  },
  priority: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  dateDone: {
    type: Date,
    required: false,
  },
});

IssueSchema.plugin(autoIncrement, 'Issue');
const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;
