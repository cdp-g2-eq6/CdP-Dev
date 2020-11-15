test('adds 1 + 2 to equal 3', () => {
  expect(1+2).toBe(3);
});

/*
const axios = require('axios');

const api = () => {
  return axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3000/api/',
  });
};


describe('/api/issues', function() {
  describe('get', function() {
    it('Empty', function(done) {
      api().get('issues').then((resp) => {
        expect(resp.data.issues).toStrictEqual([]);
        expect(resp.data.success).toBe(true);
        done();
      });
    });

    it('Create an issue', function(done) {
      api().post('issues', data={
        title: 'Issue test',
        description: {
          role: 'role test',
          goal: 'goal test',
          benefit: 'benefit test',
        },
        difficulty: 3,
        priority: 0,
      }).then((resp) => {
        expect(resp.data.newIssue.title).toBe('Issue test');
        expect(resp.data.newIssue.description.role).toBe('role test');
        expect(resp.data.newIssue.description.goal).toBe('goal test');
        expect(resp.data.newIssue.description.benefit).toBe('benefit test');
        expect(resp.data.newIssue.difficulty).toBe(3);
        expect(resp.data.newIssue.priority).toBe(0);
        expect(resp.data.success).toBe(true);
        done();
      });
    });
  });
});
*/
