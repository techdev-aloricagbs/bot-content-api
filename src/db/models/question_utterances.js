'use strict';

const Sequelize = require('sequelize');
const db = require('../index');

const QuestionUtterrance = db.define('question_utterances', {
    questionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'questions',
        key: 'id',
      }
    },
    utterance: Sequelize.TEXT
});

module.exports = QuestionUtterrance;