const router = require('express-promise-router')();

const Project = require('../models/Project');
const Task = require('../models/Task');
const Test = require('../models/Test');

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.send({
      success: true,
      projects,
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

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project === null) {
      throw new Error('Project with id ' + req.params.id + ' not found');
    }
    res.send({
      success: true,
      project,
    });
  } catch (err) {
    res.status(400);
    res.send({
      success: false,
      err: err.message,
    });
  }
});

router.post('/projects', async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const backlog = req.body.backlog || [];
  const sprints = req.body.sprints || [];

  const newProject = new Project({
    name: name,
    description: description,
    backlog: backlog,
    sprints: sprints,
  });

  try {
    await newProject.save();
    res.send({
      success: true,
      newProject,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
      err,
    });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project === null) {
      throw new Error('Project with id ' + req.params.id + ' not found');
    }

    Project.schema.eachPath((pathName) => {
      project[pathName] = req.body[pathName] || project[pathName];
    });

    await project.save();
    res.send({
      success: true,
      project,
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

router.delete('/projects/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (deletedProject) {
      res.send({
        success: true,
        message: 'Project deleted',
      });
    } else {
      res.status(400);
      res.send({
        success: false,
        message: 'Project with id : ' + req.params.id + ' not found',
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
