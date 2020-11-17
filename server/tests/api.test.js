// it will use the testing db (see config/test.json)
const axios = require('axios');

const api = () => {
  return axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3000/api/',
  });
};

/**
 * Note: The test server will use the "test" database. It gets
 * cleaned up at each server startup. No need to do it here. We
 * are not speaking to the BD directly, but rather to the API.
 */

describe('api/', () => {
  describe('issues/', () => {
    it('GET: Initially empty', (done) => {
      api().get('issues').then((resp) => {
        expect(resp.data.issues).toStrictEqual([]);
        expect(resp.data.success).toBe(true);
        done();
      });
    });

    const issue1 = {
      title: 'US avec des accents!! &é&"',
      description: {
        role: 'Chef de projet',
        goal: 'Avoir une liste de mes employés',
        benefit: 'Pourvoir leur donner des primes',
      },
      difficulty: 0,
      priority: 2,
    };

    it('POST: Failed - wrong difficulty (0)', (done) => {
      api().post('issues', issue1).then((resp) => {
        const r = resp.data;
        expect(r.err.errors.difficulty.properties.path).toBe('difficulty');
        expect(r.success).toBe(false);
        done();
      });
    });

    const issue2 = {...issue1}; // clone
    issue2.difficulty = 4;

    it('POST: Failed - wrong difficulty (4)', (done) => {
      api().post('issues', issue2).then((resp) => {
        const r = resp.data;
        expect(r.err.errors.difficulty.properties.path).toBe('difficulty');
        expect(r.success).toBe(false);
        done();
      });
    });

    it('GET: Still empty after POST fails', (done) => {
      api().get('issues').then((resp) => {
        expect(resp.data.issues).toStrictEqual([]);
        expect(resp.data.success).toBe(true);
        done();
      });
    });

    const issue3 = {...issue2}; // clone
    issue3.difficulty = 2;
    issue3.priority = -1;

    it('POST: Failed - wrong priority (-1)', (done) => {
      api().post('issues', issue3).then((resp) => {
        const r = resp.data;
        expect(r.err.errors.priority.properties.path).toBe('priority');
        expect(r.success).toBe(false);
        done();
      });
    });

    const issue4 = {...issue3}; // clone
    issue4.priority = 3;

    it('POST: Failed - wrong priority (3)', (done) => {
      api().post('issues', issue4).then((resp) => {
        const r = resp.data;
        expect(r.err.errors.priority.properties.path).toBe('priority');
        expect(r.success).toBe(false);
        done();
      });
    });

    it('GET: Still empty after POST fails', (done) => {
      api().get('issues').then((resp) => {
        expect(resp.data.issues).toStrictEqual([]);
        expect(resp.data.success).toBe(true);
        done();
      });
    });

    const issue5 = {...issue4}; // clone
    issue5.priority = 2;
    let issueId; // will contain the id of the added issue (next test)

    it('POST: Success', (done) => {
      api().post('issues', issue5).then((resp) => {
        const newIssue = resp.data.newIssue;
        expect(newIssue.title).toBe(issue5.title);
        expect(newIssue.description.role).toBe(issue5.description.role);
        expect(newIssue.description.goal).toBe(issue5.description.goal);
        expect(newIssue.description.benefit).toBe(issue5.description.benefit);
        expect(newIssue.difficulty).toBe(issue5.difficulty);
        expect(newIssue.priority).toBe(issue5.priority);
        expect(resp.data.success).toBe(true);
        issueId = resp.data.newIssue._id;
        done();
      });
    });

    it('GET: Returns only one issue', (done) => {
      api().get('issues').then((resp) => {
        expect(resp.data.issues.length).toBe(1);
        const i = resp.data.issues[0];
        expect(i.title).toBe(issue5.title);
        expect(i.description.role).toBe(issue5.description.role);
        expect(i.description.goal).toBe(issue5.description.goal);
        expect(i.description.benefit).toBe(issue5.description.benefit);
        expect(i.difficulty).toBe(issue5.difficulty);
        expect(i.priority).toBe(issue5.priority);
        expect(resp.data.success).toBe(true);
        done();
      });
    });

    const issue6 = {...issue5}; // clone
    issue6.title = 'Gestion des employés';
    issue6.description.role = 'Chef des Ressource Humaines'; // ça existe?
    issue6.title = 'Avoir une liste de tous les employés de l\'entreprise';
    issue6.title = 'Gérer leurs salaires et autres trucs utiles';
    issue6.title = 'Les payer correctement à la fin de chaque mois';
    issue6.difficulty = 8;
    issue6.priority = 1;

    it('PUT: Edit every field of an issue', (done) => {
      api().put(`issues/${issueId}`, issue6).then((resp) => {
        expect(resp.data.success).toBe(true);
        const i = resp.data.issue;
        expect(i.title).toBe(issue6.title);
        expect(i.description.role).toBe(issue6.description.role);
        expect(i.description.goal).toBe(issue6.description.goal);
        expect(i.description.benefit).toBe(issue6.description.benefit);
        expect(i.difficulty).toBe(issue6.difficulty);
        expect(i.priority).toBe(issue6.priority);
        done();
      });
    });

    it('GET: Still returns one issue after edit', (done) => {
      api().get('issues').then((resp) => {
        expect(resp.data.issues.length).toBe(1);
        const i = resp.data.issues[0];
        expect(i.title).toBe(issue6.title);
        expect(i.description.role).toBe(issue6.description.role);
        expect(i.description.goal).toBe(issue6.description.goal);
        expect(i.description.benefit).toBe(issue6.description.benefit);
        expect(i.difficulty).toBe(issue6.difficulty);
        expect(i.priority).toBe(issue6.priority);
        expect(resp.data.success).toBe(true);
        done();
      });
    });

    it('PUT: Fail edit: wrong id', (done) => {
      api().put(`issues/${issueId+1}`, issue6).then((resp) => {
        expect(resp.data.success).toBe(false);
        done();
      }).catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.success).toBe(false);
        done();
      });
    });

    it('GET: Still returns one issue (and the right one)', (done) => {
      api().get('issues').then((resp) => {
        expect(resp.data.issues.length).toBe(1);
        const i = resp.data.issues[0];
        expect(i.title).toBe(issue6.title);
        expect(i.description.role).toBe(issue6.description.role);
        expect(i.description.goal).toBe(issue6.description.goal);
        expect(i.description.benefit).toBe(issue6.description.benefit);
        expect(i.difficulty).toBe(issue6.difficulty);
        expect(i.priority).toBe(issue6.priority);
        expect(resp.data.success).toBe(true);
        done();
      });
    });

    it('DELETE: Fail delete: wrong id', (done) => {
      api().delete(`issues/${issueId+1}`).then((resp) => {
        expect(resp.data.success).toBe(false);
        done();
      }).catch((err) => {
        expect(err.response.status).toBe(400);
        expect(err.response.data.success).toBe(false);
        done();
      });
    });

    it('DELETE: Success', (done) => {
      api().delete(`issues/${issueId}`).then((resp) => {
        expect(resp.data.success).toBe(true);
        done();
      });
    });

    it('GET: Empty after deleting the unique issue', (done) => {
      api().get('issues').then((resp) => {
        expect(resp.data.issues).toStrictEqual([]);
        expect(resp.data.success).toBe(true);
        done();
      });
    });
  });
});
