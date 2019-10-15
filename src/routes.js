const express = require('express');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const DisciplineController = require('./controllers/DisciplineController');
const AuthMiddleware = require('./middlewares/AuthMIddleware');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

routes.post('/login', AuthController.auth);
routes.post('/signup', UserController.store);

routes.use(AuthMiddleware);

routes.get('/disciplines', DisciplineController.index);
routes.get('/disciplines/:id', DisciplineController.show);
routes.post('/disciplines', DisciplineController.store);
routes.put('/disciplines/:id', DisciplineController.update);
routes.delete('/disciplines/:id', DisciplineController.delete);

module.exports = routes;
