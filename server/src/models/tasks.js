const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
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

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
