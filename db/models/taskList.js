const mongoose = require('mongoose');
const TaskListSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minlength: 3
  }
});

const TaskList = mongoose.model('TaskList', TaskListSchema);

module.exports = TaskList;