import api from '@/services/api';

export default {

  getTests() {
    return api().get('tests');
  },

  getTest(params) {
    return api().get('tests/' + params.id);
  },

  createTest(params) {
    return api().post('tests', params);
  },

  updateTest(params) {
    return api().put('tests/' + params.id, params);
  },

  runTest(params) {
    return api().patch('tests/' + params.id + '/run', params);
  },

  deleteTest(params) {
    return api().delete('tests/' + params.id);
  },
};
