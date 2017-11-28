const Question = require('../db/models/question');
const asyncMiddleware = require('./utils/asyncMiddleware');
const api = require('express').Router();

api.get('/', asyncMiddleware(async (req, res) => {
  let questions = await Question.findAll();
  res.json(questions);
}));

module.exports = api;
