const api = module.exports = require('express').Router();
const questions = require('./questions');

api.get('/', (req, res) => res.send('BOT CONTENT DESIGNER API V1.0')); //demo route to prove api is working

api.use('/questions', questions);

// No routes matched? 404.
api.use((req, res) => res.status(404).end());
