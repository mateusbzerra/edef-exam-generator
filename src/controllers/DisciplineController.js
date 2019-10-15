const Discipline = require('../models/Discipline');

class DisciplineController {
  async index(req, res) {
    try {
      const disciplines = await Discipline.find({});
      return res.json(disciplines);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  async show(req, res) {
    try {
      const discipline = await Discipline.findById(req.params.id);
      return res.json(discipline);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  async store(req, res) {
    try {
      const discipline = await Discipline.create(req.body);
      return res.status(201).json(discipline);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  async update(req, res) {
    try {
      const discipline = await Discipline.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.json(discipline);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
  async delete(req, res) {
    try {
      await Discipline.findByIdAndDelete(req.params.id);
      return res.json({ success: 'Discipline deleted successfully' });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
}
module.exports = new DisciplineController();
