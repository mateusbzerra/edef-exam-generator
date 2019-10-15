const express = require('express');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const DisciplineController = require('./controllers/DisciplineController');
const AuthMiddleware = require('./middlewares/AuthMIddleware');
const AdminMiddleware = require('./middlewares/AdminMiddleware');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

routes.post('/login', AuthController.auth);
routes.post('/signup', UserController.store);

routes.use(AuthMiddleware);

routes.get('/disciplines', DisciplineController.index);
routes.get('/disciplines/:id', DisciplineController.show);
routes.post('/disciplines', AdminMiddleware, DisciplineController.store);
routes.put('/disciplines/:id', AdminMiddleware, DisciplineController.update);
routes.delete('/disciplines/:id', AdminMiddleware, DisciplineController.delete);

module.exports = routes;
