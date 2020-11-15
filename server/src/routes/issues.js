const router = require('express-promise-router')();

const Issue = require('../models/issues');

router.get('/issues', async (req, res) => {
  // TODO: add linked tasks for each issue

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
  // TODO: add linked tasks to the issue data

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

router.post('/issues', async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const difficulty = req.body.difficulty;
  const priority = req.body.priority;

  const issuesWithSameId = await Issue.find({id: id});
  if (issuesWithSameId.length !== 0) {
    console.log(`An issue with this id (${id}) already exists`);
    res.send({
      success: false,
      err: `An issue with this id (${id}) already exists`,
    });
  } else {
    const newIssue = new Issue({
      id: id,
      title: title,
      description: {
        role: description.role,
        goal: description.goal,
        benefit: description.benefit,
      },
      difficulty: difficulty,
      priority: priority,
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
  }
});

router.put('/issues/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (issue.id !== req.body.id) {
      // the id changed, so we check for its uniqueness
      const issuesWithSameId = await Issue.find({id: req.body.id});
      if (issuesWithSameId.length !== 0) {
        console.log(`An issue with this id (${req.body.id}) already exists`);
        res.send({
          success: false,
          err: `An issue with this id (${req.body.id}) already exists`,
        });
        return;
      }
    }

    issue.id = req.body.id;
    issue.title = req.body.title;
    issue.description = req.body.description || {};
    issue.difficulty = req.body.difficulty;
    issue.priority = req.body.difficulty;

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
    await Issue.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: 'Issue deleted',
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
