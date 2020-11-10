import api from '@/services/api';

export default {

  getIssues() {
    return api().get('issues');
  },

  getIssue(params) {
    return api().get('issues/' + params.id);
  },

  createIssue(params) {
    return api().post('issues', params);
  },

  updateIssue(params) {
    return api().put('issues/' + params.id, params);
  },

  deleteIssue(params) {
    return api().delete('issues/' + params.id);
  },
};
