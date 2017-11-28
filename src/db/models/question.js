'use strict';
const Sequelize = require('sequelize');
const db = require('../index');

const Question = db.define('questions', {
  title: Sequelize.TEXT,
  type: Sequelize.STRING,
  answer: Sequelize.TEXT
});

module.exports = Question;

