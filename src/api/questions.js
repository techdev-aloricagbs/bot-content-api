const Question = require('../db/models/question');
const asyncMiddleware = require('./utils/asyncMiddleware');
const api = require('express').Router();

api.get('/', asyncMiddleware(async (req, res) => {
  let questions = await Question.findAll();
  res.json(questions);
}));

api.get('/:id', asyncMiddleware(async (request, response) => {
  let question = await Question.findById(request.params.id);
  if (question) {
    response.json(question);
  } else {
    response.status(404).end('Question not found.');
  }
}));

api.post('/', asyncMiddleware(async (request, response) => {
  let question = await Question.create(request.body);
  response.json(question);
}));

api.delete('/:id', asyncMiddleware(async (request, response) => {
  Question.destroy({
    where: {
      id: request.params.id
    }
  });
  response.json(null);
}));

api.put('/:id', asyncMiddleware(async (request, response) => {
  await Question.update(request.body, {
    where: {
      id: request.params.id
    }
  });
  let question = await Question.findById(request.params.id);
  response.json(question);

}));

module.exports = api;
