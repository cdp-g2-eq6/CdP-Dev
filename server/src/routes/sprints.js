const router = require('express-promise-router')();

const Sprints = require('../models/sprints');

router.get('/sprints', async (req, res) => {
  try {
    const sprints = await Sprints.find({});
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
    const sprint = await Sprints.find({number: req.params.id});
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

router.post('/sprints', async (req, res) => {
  const number = req.body.number;
  const issues = req.body.issues;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  if ((await Sprints.find({number: req.body.number})).length !== 0) {
    const err = `Sprint with the number ${req.body.number} already exists`;
    console.log(err);
    res.status(400);
    res.send({
      success: false,
      err: err,
    });
    return;
  }

  const newSprint = new Sprints({
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
    res.send({
      success: false,
      err,
    });
  }
});

router.put('/sprints/:id', async (req, res) => {
  try {
    const sprint = await Sprints.findById(req.params.id);

    if (sprint.number !== req.body.number) {
      if ((await Sprints.find({number: req.params.id})).length !== 0) {
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

    sprint.number = req.body.number;
    sprint.issues = req.body.issues;
    sprint.startDate = req.body.startDate;
    sprint.endDate = req.body.endDate;

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
    await Sprints.findByIdAndDelete(req.params.id);
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
