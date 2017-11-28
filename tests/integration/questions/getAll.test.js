const request = require('supertest');
const app = require('../../../bin/test');

describe('GET /questions', () => {
  it('responds with a 200', done => {
    request(app)
      .get('/questions')
      .expect(200, done)
  });
});