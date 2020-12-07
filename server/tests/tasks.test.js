const api = require('./api.js');

describe('Tasks routes', () => {
  it('GET : Empty', async () => {
    const res = await api().get('issues');
    expect(res.data.issues).toStrictEqual([]);
    expect(res.data.success).toBe(true);
  });

  const validTask = {
    title: 'testTitle"',
    description: 'testDescription',
    participants: [],
    linkedIssues: [],
    cost: 1,
    status: 1,
  };
  let validTaskId;

  const wrongTask = {
    title: 'testTitle"',
    description: 'testDescription',
    participants: [],
    linkedIssues: [],
    cost: -4,
    status: 1,
  };

  describe('Tasks POST', () => {
    it('POST : cost not in Fibonacci', (done) => {
      // eslint-disable-next-line require-jsdoc
      function difficultyNotInFibonacci(done) {
        api().post('tasks', wrongTask).catch((error) => {
          const res = error.response;
          expect(res.status).toBe(400);
          expect(res.data.success).toBe(false);
          expect(res.data.err.errors.cost.name).toBe('ValidatorError');
          expect(res.data.err.errors.cost.message).toBe(
              'Cost must be a positive number in the Fibonacci sequence');
          expect(res.data.err.errors.cost.path).toBe('cost');
          done();
        });
      }

      difficultyNotInFibonacci(done);
      wrongTask.cost = 4;
      difficultyNotInFibonacci(done);
    });

    it('POST : Incorrect status', (done) => {
      wrongTask.cost = 1;
      wrongTask.status = -1;

      // eslint-disable-next-line require-jsdoc
      function wrongStatus(done) {
        api().post('tasks', wrongTask).catch((error) => {
          const res = error.response;
          expect(res.status).toBe(400);
          expect(res.data.success).toBe(false);
          expect(res.data.err.errors.status.name).toBe('ValidatorError');
          expect(res.data.err.errors.status.path).toBe('status');
          done();
        });
      }

      wrongStatus(done);
      wrongTask.status = 5;
      wrongStatus(done);
    });

    it('POST : Success', (done) => {
      api().post('tasks', validTask).then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.success).toBe(true);
        expect(res.data.newTask).toMatchObject(validTask);
        validTaskId = res.data.newTask._id;
        done();
      });
    });
  });

  describe('Tasks GET', () => {
    it('GET : One result', (done) => {
      api().get('tasks').then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.success).toBe(true);
        expect(res.data.tasks.length).toBe(1);
        const task = res.data.tasks[0];
        expect(task).toMatchObject(validTask);
        done();
      });
    });

    it('GET : Multiple results', async () => {
      await api().post('tasks', validTask);
      const res = await api().get('tasks');
      expect(res.status).toBe(200);
      expect(res.data.success).toBe(true);
      expect(res.data.tasks.length).toBe(2);
      const tasks = res.data.tasks;
      expect(tasks[0]).toMatchObject(validTask);
      expect(tasks[1]).toMatchObject(validTask);
    });

    it('GET tasks/{id} : Wrong id', (done) => {
      const wrongId = -5;
      api().get(`tasks/${wrongId}`).then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.success).toBe(true);
        expect(res.data.task).toBe(null);
        done();
      });
    });

    it('GET tasks/{id} : Returns validTask with validTaskId', (done) => {
      api().get(`tasks/${validTaskId}`).then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.success).toBe(true);
        expect(res.data.task._id).toBe(validTaskId);
        expect(res.data.task).toMatchObject(validTask);
        done();
      });
    });
  });

  describe('Tasks PUT', () => {
    it('PUT tasks/{id}: Wrong id', (done) => {
      const wrongId = -5;
      api().put(`tasks/${wrongId}`).catch((error) => {
        const res = error.response;
        expect(res.status).toBe(400);
        expect(res.data.success).toBe(false);
        expect(res.data.err).toBe(`Task with id ${wrongId} not found`);
        done();
      });
    });

    it('PUT tasks/{id}: Bad task', (done) => {
      const wrongTask1 = wrongTask;
      wrongTask1.status = 1;
      wrongTask1.cost = -5;
      api().put(`tasks/${validTaskId}`, wrongTask1).catch((error) => {
        const res = error.response;
        expect(res.status).toBe(400);
        expect(res.data.success).toBe(false);
        expect(res.data.err.errors.cost.name).toBe('ValidatorError');
        expect(res.data.err.errors.cost.message).toBe(
            'Cost must be a positive number in the Fibonacci sequence');
        expect(res.data.err.errors.cost.path).toBe('cost');
      });
      done();
    });

    it('PUT tasks/{id}: Success', (done) => {
      const validTask1 = validTask;
      validTask1.description = 'TestPut';
      api().put(`tasks/${validTaskId}`, validTask1).then((res) => {
        expect(res.status).toBe(200);
        expect(res.data.success).toBe(true);
        expect(res.data.task).toMatchObject(validTask);
        done();
      });
    });
  });

  describe('Tasks DELETE', () => {
    it('DELETE : Wrong id', (done) => {
      const wrongId = -5;
      api().delete(`tasks/${wrongId}`).catch((error) => {
        const res = error.response;
        expect(res.status).toBe(400);
        expect(res.data.success).toBe(false);
        expect(res.data.err).toBe(`Task with id ${wrongId} not found`);
        done();
      });
    });

    it('DELETE : Success', async () => {
      const res = await api().delete(`tasks/${validTaskId}`);
      expect(res.status).toBe(200);
      expect(res.data.success).toBe(true);
      expect(res.data.message).toBe(`Task with id ${validTaskId} deleted`);
      const getRes = await api().get('tasks');
      expect(getRes.status).toBe(200);
      expect(res.data.success).toBe(true);
      const tasks = getRes.data.tasks;
      expect(tasks.length).toBe(1);
      expect(tasks[0]._id).not.toBe(validTaskId);
    });
  });
});
