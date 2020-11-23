const router = require('express-promise-router')();

const Test = require('../models/tests');

router.get('/tests', async (req, res) => {
  try {
    const tests = await Test.find({});
    res.send({
      success: true,
      tests,
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

router.get('/tests/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    res.send({
      success: true,
      test,
    });
  } catch (err) {
    res.status(400);
    res.send({
      success: false,
      err,
    });
  }
});

router.post('/tests', async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const linkedTask = req.body.linkedTask;
  const statusHistory = req.body.statusHistory || [];

  const newTest = new Test({
    title: title,
    description: description,
    linkedTask: linkedTask,
    statusHistory: statusHistory,
  });

  try {
    await newTest.save();
    res.send({
      success: true,
      newTest,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      err,
    });
  }
});

router.put('/tests/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    const title = req.body.title;
    const description = req.body.description;
    const linkedTask = req.body.linkedTask;
    const statusHistory = req.body.statusHistory || [];

    test.title = title;
    test.description = description;
    test.linkedTask = linkedTask;
    test.statusHistory = statusHistory;

    await test.save();
    res.send({
      success: true,
      test,
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

router.delete('/tests/:id', async (req, res) => {
  try {
    const deletedTask = await Test.findByIdAndDelete(req.params.id);
    if (deletedTask) {
      res.send({
        success: true,
        message: 'Test deleted',
      });
    } else {
      res.status(400);
      res.send({
        success: false,
        message: 'Test with id : ' + req.params.id + ' not found',
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
