import api from '@/services/api';

export default {

  getTasks() {
    return api().get('tasks');
  },

  getTask(params) {
    return api().get('tasks/' + params.id);
  },

  createTask(params) {
    return api().post('tasks', params);
  },

  updateTask(params) {
    return api().put('tasks/' + params.id, params);
  },

  deleteTask(params) {
    return api().delete('tasks/' + params.id);
  },
};
