import api from '@/services/api';

export default {

  getProjects() {
    return api().get('projects');
  },

  getProject(params) {
    return api().get('projects/' + params.id);
  },

  getBacklogOfProject(params) {
    return api().get('projects/' + params.id + '/backlog');
  },

  getSprintsOfProject(params) {
    return api().get('projects/' + params.id + '/sprints');
  },

  getTasksOfProject(params) {
    return api().get('projects/' + params.id + '/tasks');
  },

  getTestsOfProject(params) {
    return api().get('projects/' + params.id + '/tests');
  },

  addIssueToProject(projectId, issueId) {
    return api().put('projects/' + projectId + '/issue/' + issueId);
  },

  removeIssueFromProject(projectId, issueId) {
    return api().delete('projects/' + projectId + '/issue/' + issueId);
  },

  addSprintToProject(projectId, sprintId) {
    return api().put('projects/' + projectId + '/sprint/' + sprintId);
  },

  removeSprintFromProject(projectId, sprintId) {
    return api().delete('projects/' + projectId + '/sprint/' + sprintId);
  },

  createProject(params) {
    return api().post('projects', params);
  },

  updateProject(params) {
    return api().put('projects/' + params.id, params);
  },

  deleteProject(params) {
    return api().delete('projects/' + params.id);
  },
};
