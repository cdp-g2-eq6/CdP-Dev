const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
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
    min: [0, 'Difficulty cannot be negative'],
  },
  priority: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
});

const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;
