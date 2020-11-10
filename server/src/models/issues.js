const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: new Schema({
    role: String,
    goal: String,
    benefit: String,
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
