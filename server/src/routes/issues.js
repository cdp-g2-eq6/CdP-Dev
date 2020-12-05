const router = require('express-promise-router')();

const Issue = require('../models/issues');
const Task = require('../models/tasks');

router.get('/issues', async (req, res) => {
  try {
    const issues = await Issue.find({});
    res.send({
      success: true,
      issues,
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

router.get('/issues/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    res.send({
      success: true,
      issue,
    });
  } catch (err) {
    res.status(400);
    res.send({
      success: false,
      err,
    });
  }
});

// returns all the tasks that have the given issue ID as linked issue
router.get('/issues/:id/tasks', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    const tasks = await Task.find({linkedIssues: issue._id});
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

router.post('/issues', async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const difficulty = req.body.difficulty;
  const priority = req.body.priority;
  const dateDone = req.body.dateDone || null;

  const newIssue = new Issue({
    title: title,
    description: {
      role: description.role,
      goal: description.goal,
      benefit: description.benefit,
    },
    difficulty: difficulty,
    priority: priority,
    dateDone: dateDone,
  });

  try {
    await newIssue.save();
    res.send({
      success: true,
      newIssue,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      err,
    });
  }
});

router.put('/issues/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (issue === null) {
      throw new Error('Issue with id ' + req.params.id + ' not found');
    }

    Issue.schema.eachPath((pathName) => {
      if (pathName === 'dateDone') {
        issue[pathName] = req.body[pathName];
      } else {
        issue[pathName] = req.body[pathName] || issue[pathName];
      }
    });

    await issue.save();
    res.send({
      success: true,
      issue,
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

router.delete('/issues/:id', async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndDelete(req.params.id);
    if (deletedIssue) {
      res.send({
        success: true,
        message: 'Issue deleted',
      });
    } else {
      res.status(400);
      res.send({
        success: false,
        message: 'Issue with id : ' + req.params.id + ' not found',
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
