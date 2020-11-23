const router = require('express-promise-router')();

const Task = require('../models/tasks');
const Test = require('../models/tests');

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send({
      success: true,
      tasks,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send({
      success: false,
      err,
    });
  }
});

router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.send({
      success: true,
      task,
    });
  } catch (err) {
    res.status(400);
    res.send({
      success: false,
      err,
    });
  }
});

router.get('tasks/:id/tests', async (req, res) => {
  const taskId = req.params.id;
  try {
    const tests = await Test.find({linkedTask: taskId}).exec();
    res.send({
      success: true,
      tests,
    });
  } catch (err) {
    res.status(400);
    res.send({
      success: false,
      err,
    });
  }
});

router.post('/tasks', async (req, res) => {
  const linkedIssues = req.body.linkedIssues;
  const title = req.body.title;
  const description = req.body.description;
  const participants = req.body.participants;
  const cost = req.body.cost;
  const status = req.body.status;

  const newTask = new Task({
    linkedIssues: linkedIssues,
    title: title,
    description: description,
    participants: participants,
    cost: cost,
    status: status,
  });

  try {
    await newTask.save();
    res.send({
      success: true,
      newTask,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      err,
    });
  }
});

router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.linkedIssues = req.body.linkedIssues;
    task.title = req.body.title;
    task.description = req.body.description;
    task.participants = req.body.participants;
    task.cost = req.body.cost;
    task.status = req.body.status;

    await task.save();
    res.send({
      success: true,
      task,
    });
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send({
      success: false,
      err,
    });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (deletedTask) {
      res.send({
        success: true,
        message: 'Task deleted',
      });
    } else {
      res.status(400);
      res.send({
        success: false,
        message: 'Task with id : ' + req.params.id + ' not found',
      });
    }
  } catch (err) {
    res.status(500);
    res.send({
      success: false,
      err,
    });
  }
});

module.exports = router;
