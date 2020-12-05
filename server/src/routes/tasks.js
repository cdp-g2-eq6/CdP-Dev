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

router.get('/tasks/:id/tests', async (req, res) => {
  const taskId = req.params.id;
  try {
    const tests = await Test.find({linkedTask: taskId});
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
    if (err.errors[Object.keys(err.errors)[0]].name === 'ValidatorError') {
      res.status(400);
    } else {
      res.status(500);
    }
    res.send({
      success: false,
      err,
    });
  }
});

router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task === null) {
      throw new Error('Task with id ' + req.params.id + ' not found');
    }

    Task.schema.eachPath((pathName) => {
      if (pathName === 'status') {
        // 0 is valid
        task[pathName] = req.body[pathName];
      } else {
        task[pathName] = req.body[pathName] || task[pathName];
      }
    });

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
      err: err.message,
    });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (deletedTask) {
      res.send({
        success: true,
        message: 'Task with id ' + req.params.id + ' deleted',
      });
    } else {
      res.status(400);
      res.send({
        success: false,
        err: 'Task with id ' + req.params.id + ' not found',
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
