const express = require('express');
const Questionnaire = require('../models/Questionnaire');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const { title, questions } = req.body;
  const questionnaire = new Questionnaire({ userId: req.user.id, title, questions });
  await questionnaire.save();
  res.status(201).json(questionnaire);
});

router.get('/', authenticateToken, async (req, res) => {
  const questionnaires = await Questionnaire.find({ userId: req.user.id });
  res.json(questionnaires);
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { title, questions } = req.body;
  const questionnaire = await Questionnaire.findByIdAndUpdate(req.params.id, { title, questions }, { new: true });
  res.json(questionnaire);
});

router.delete('/:id', authenticateToken, async (req, res) => {
  await Questionnaire.findByIdAndDelete(req.params.id);
  res.json({ message: 'Questionnaire deleted' });
});

module.exports = router;