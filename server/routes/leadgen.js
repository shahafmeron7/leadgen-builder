const express = require('express');
const Leadgen = require('../models/Leadgen');
// const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, flowName, questions } = req.body;
    if (!title || !flowName || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Title, flowName, and questions are required' });
    }

    const leadgen = new Leadgen({ title, flowName, questions });
    await leadgen.save();
    res.status(201).json(leadgen);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const leadgens = await Leadgen.find({});
    if(!leadgens){
      return res.status(400).json({ error: 'No leadgens found.' });
    }
    res.status(201).json(leadgens);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
    
  }
});
//get a leadgen by token
router.get('/:token', async (req, res) => {
  try {
    const leadgen = await Leadgen.findOne({ token: req.params.token });
    if (!leadgen) {
      return res.status(404).json({ error: 'Leadgen not found' });
    }
    res.status(200).json(leadgen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put('/:id', async (req, res) => {
  const { title, questions } = req.body;
  const leadgen = await Leadgen.findByIdAndUpdate(req.params.id, { title, questions }, { new: true });
  res.json(leadgen);
});

router.delete('/:id', async (req, res) => {
  await Leadgen.findByIdAndDelete(req.params.id);
  res.json({ message: 'Leadgen deleted' });
});

module.exports = router;