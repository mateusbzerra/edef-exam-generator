const express = require('express');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

routes.post('/login', AuthController.auth);
routes.post('/signup', UserController.store);

module.exports = routes;
