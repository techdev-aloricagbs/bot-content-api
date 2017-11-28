const Question = require('../db/models/question');
const QuestionUtterance = require('../db/models/question_utterances');
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

api.post('/:id/utterances', asyncMiddleware(async (request, response) => {
  let fields = {
    questionId: request.params.id,
    utterance: request.body.utterance
  };
  let utterance = await QuestionUtterance.create(fields);
  response.json(utterance);
}));

api.get('/:id/utterances', asyncMiddleware(async (request, response) => {
  let utterances = await QuestionUtterance.findAll({
    where: {
      questionId: request.params.id
    }
  });
  response.json(utterances);
}));

api.delete('/:id/utterances/:utteranceId', asyncMiddleware(async (request, response) => {
  await QuestionUtterance.destroy({
    where: {
      id: request.params.utteranceId,
      questionId: request.params.id
    }
  });
  response.json(null);
}));


api.put('/:id/utterances/:utteranceId', asyncMiddleware(async (request, response) => {
  let fields = {
    utterance: request.body.utterance
  };
  await QuestionUtterance.update(fields, {
    where: {
      id: request.params.utteranceId,
      questionId: request.params.id

    }
  });
  let utterance = await QuestionUtterance.findById(request.params.utteranceId);
  response.json(utterance);
}));

module.exports = api;
