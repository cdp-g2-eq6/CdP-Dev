import api from '@/services/api';

export default {

  getSprints() {
    return api().get('sprints');
  },

  getSprint(params) {
    return api().get('sprints/' + params.number);
  },

  getSprintIssues(params) {
    return api().get('sprints/' + params.number + '/issues');
  },

  getSprintTasks(params) {
    return api().get('sprints/' + params.number + '/tasks');
  },

  createSprint(params) {
    return api().post('sprints', params);
  },

  updateSprint(params) {
    return api().put('sprints/' + params.id, params);
  },

  deleteSprint(params) {
    return api().delete('sprints/' + params.id);
  },
};
