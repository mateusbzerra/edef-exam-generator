const express = require('express');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const DisciplineController = require('./controllers/DisciplineController');
const QuestionController = require('./controllers/QuestionController');
const PDFController = require('./controllers/PDFController');
//
const AuthMiddleware = require('./middlewares/AuthMIddleware');
const AdminMiddleware = require('./middlewares/AdminMiddleware');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

routes.post('/login', AuthController.auth);
routes.post('/signup', UserController.store);
routes.get('/pdf', PDFController.generate);

routes.use(AuthMiddleware);
//DISCIPLINES
routes.get('/disciplines', DisciplineController.index);
routes.get('/disciplines/:id', DisciplineController.show);
routes.post('/disciplines', AdminMiddleware, DisciplineController.store);
routes.put('/disciplines/:id', AdminMiddleware, DisciplineController.update);
routes.delete('/disciplines/:id', AdminMiddleware, DisciplineController.delete);

//USER
routes.get('/users', AdminMiddleware, UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', AdminMiddleware, UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', AdminMiddleware, UserController.delete);

//QUESTION
routes.get('/questions', AdminMiddleware, QuestionController.index);
routes.get(
  '/disciplines/:disciplineId/questions',

  QuestionController.index
);
routes.get('/questions/:id', QuestionController.show);
routes.post('/questions', QuestionController.store);
routes.put('/questions/:id', QuestionController.update);
routes.delete('/questions/:id', AdminMiddleware, QuestionController.delete);

module.exports = routes;
