const router = require('express-promise-router')();

const Sprint = require('../models/Sprint');
const Task = require('../models/Task');

router.get('/sprints', async (req, res) => {
  try {
    const sprints = await Sprint.find({});
    res.send({
      success: true,
      sprints,
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

router.get('/sprints/:number', async (req, res) => {
  try {
    const sprint = await Sprint.findOne({number: req.params.number});
    res.send({
      success: true,
      sprint,
    });
  } catch (err) {
    res.status(400);
    res.send({
      success: false,
      err,
    });
  }
});

router.get('/sprints/:number/issues', async (req, res) => {
  try {
    const sprint = await Sprint
        .findOne({number: req.params.number})
        .populate('issues');
    res.send({
      success: true,
      issues: sprint.issues,
    });
  } catch (err) {
    res.status(400);
    res.send({
      success: false,
      err,
    });
  }
});

router.get('/sprints/:number/tasks', async (req, res) => {
  try {
    const sprint = await Sprint.findOne({number: req.params.number});
    const tasks = await Task.find().where('linkedIssues').in(sprint.issues);
    res.send({
      success: true,
      tasks,
    });
  } catch (err) {
    res.status(400);
    res.send({
      success: false,
      err,
    });
  }
});

router.post('/sprints', async (req, res) => {
  const number = req.body.number;
  const issues = req.body.issues;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  if ((await Sprint.find({number: req.body.number})).length !== 0) {
    const err = `Sprint with the number ${req.body.number} already exists`;
    console.log(err);
    res.status(400);
    res.send({
      success: false,
      err: err,
    });
    return;
  }

  const newSprint = new Sprint({
    number: number,
    issues: issues,
    startDate: startDate,
    endDate: endDate,
  });

  try {
    await newSprint.save();
    res.send({
      success: true,
      newSprint,
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

router.put('/sprints/:id', async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.id);

    if (sprint.number !== req.body.number) {
      if ((await Sprint.find({number: req.params.id})).length !== 0) {
        const err = `Sprint with the number ${req.body.number} already exists`;
        console.log(err);
        res.status(400);
        res.send({
          success: false,
          err: err,
        });
        return;
      }
    }

    Sprint.schema.eachPath((pathName) => {
      sprint[pathName] = req.body[pathName] || sprint[pathName];
    });

    await sprint.save();
    res.send({
      success: true,
      sprint,
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

router.delete('/sprints/:id', async (req, res) => {
  try {
    await Sprint.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: 'Sprint deleted',
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
