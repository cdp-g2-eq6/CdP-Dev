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

// eslint-disable-next-line require-jsdoc
async function getProjectResources(req, res) {
  const resourceName = req.url.substring(req.url.lastIndexOf('/')+1);
  try {
    const project = await Project.findById(req.params.id)
        .populate(resourceName);
    const resource = project[resourceName];
    res.send({
      success: true,
      [resourceName]: resource,
    });
  } catch (err) {
    res.status(400);
    res.send({
      success: false,
      err,
    });
  }
}

router.get('/projects/:id/backlog', getProjectResources);
router.get('/projects/:id/sprints', getProjectResources);

// eslint-disable-next-line require-jsdoc
async function getProjectTasks(projectId) {
  const project = await Project.findById(projectId);
  return await Task.find().where('linkedIssues').in(project.backlog);
}

router.get('/projects/:id/tasks', async (req, res) => {
  try {
    const tasks = await getProjectTasks(req.params.id);
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

router.get('/projects/:id/tests', async (req, res) => {
  try {
    const tasks = await getProjectTasks(req.params.id);
    const tasksIds = tasks.map((task) => task._id);
    const tests = await Test.find().where('linkedTask').in(tasksIds);
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
