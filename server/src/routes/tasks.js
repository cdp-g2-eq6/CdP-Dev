const router = require('express-promise-router')();

const Task = require('../models/tasks');

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

router.post('/tasks', async (req, res) => {
  const id = req.body.id;
  const linkedIssue = req.body.linkedIssue;
  const title = req.body.title;
  const description = req.body.description;
  const participants = req.body.participants;
  const difficulty = req.body.difficulty;
  const priority = req.body.priority;

  const tasksWithSameId = await Task.find({id: id});
  if (tasksWithSameId.length !== 0) {
    console.log(`A task with this id (${id}) already exists`);
    res.send({
      success: false,
      err: `A task with this id (${id}) already exists`,
    });
  } else {
    const newTask = new Task({
      id: id,
      linkedIssue: linkedIssue,
      title: title,
      description: description,
      participants: participants,
      difficulty: difficulty,
      priority: priority,
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
  }
});

router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task.id !== req.body.id) {
      // the id changed, so we check for its uniqueness
      const tasksWithSameId = await Issue.find({id: req.body.id});
      if (tasksWithSameId.length !== 0) {
        console.log(`A task with this id (${req.body.id}) already exists`);
        res.send({
          success: false,
          err: `A task with this id (${req.body.id}) already exists`,
        });
        return;
      }
    }

    task.id = req.body.id;
    task.linkedIssue = req.body.linkedIssue;
    task.title = req.body.title;
    task.description = req.body.description;
    task.participants = req.body.participants;
    task.difficulty = req.body.difficulty;
    task.priority = req.body.priority;

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
    await Task.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: 'Task deleted',
    });
  } catch (err) {
    res.status(400);
    res.send({
      success: false,
      err,
    });
  }
});

module.exports = router;
