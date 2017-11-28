'use strict';
const Sequelize = require('sequelize');
const db = require('../index');

const Question = db.define('questions', {
  title: Sequelize.STRING,
  type: Sequelize.STRING
});

module.exports = Question;

