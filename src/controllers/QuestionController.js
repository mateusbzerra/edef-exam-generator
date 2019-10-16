const Question = require('../models/Question');
const Discipline = require('../models/Discipline');
const User = require('../models/User');

class QuestionController {
  async index(req, res) {
    //const reqUser = await User.findById(req.user.id);
    const { disciplineId } = req.params;
    try {
      const questions = await Question.find({ discipline: disciplineId });
      return res.json(questions);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  async show(req, res) {
    try {
      const question = await Question.findById(req.params.id);
      return res.json(question);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  async store(req, res) {
    try {
      const question = await Question.create(req.body);
      return res.status(201).json(question);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  async update(req, res) {
    try {
      const question = await Question.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.json(question);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  async delete(req, res) {
    try {
      await Question.findByIdAndDelete(req.params.id);
      return res.json({ success: 'Question deleted successfully' });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
module.exports = new QuestionController();
