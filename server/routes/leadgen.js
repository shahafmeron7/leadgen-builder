const express = require('express');
const router = express.Router();
const Leadgen = require('../models/Leadgen');
 const { authenticateToken } = require('../middleware/auth');


//TODO: add validation of questions structure before adding new leadgen.
router.post('/new',authenticateToken, async (req, res) => {
  try {
    const { title, flowName, questions } = req.body;
    if (!title || !flowName || !Array.isArray(questions) || questions.length === 0) {
      let error = '';
      if (!title) error = 'Title is required.';
      else if (!flowName) error = 'Flow Name is required.';
      else if (!Array.isArray(questions) || questions.length === 0) error = 'Questions must be a non-empty array.';
      return res.status(400).json({ error });
    }

    questions.forEach((question, index) => {
      if (!question.text) throw new Error(`Question ${index + 1}: Text is required.`);
      if (!question.code) throw new Error(`Question ${index + 1}: Code is required.`);
      if (typeof question.step !== 'number') throw new Error(`Question ${index + 1}: Step must be a number.`);
      if (!question.type) throw new Error(`Question ${index + 1}: Type is required.`);
      if (!question.display_list_direction) throw new Error(`Question ${index + 1}: Display List Direction is required.`);
      question.answers.forEach((answer, aIndex) => {
        if (!answer.text) throw new Error(`Question ${index + 1} Answer ${aIndex + 1}: Text is required.`);
        if (!answer.next_question_code) throw new Error(`Question ${index + 1} Answer ${aIndex + 1}: Next Question Code is required.`);
      });
    });

    const newLeadgen = new Leadgen({
      title,
      flowName,
      questions,
      user:req.user.id
    });

    await newLeadgen.save();

    res.status(201).json(newLeadgen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'An error occurred while creating the leadgen.' });
  }
});
//get all leadgens
router.get('/',authenticateToken, async (req, res) => {
  try {
    const leadgens = await Leadgen.find({ user: req.user.id });
    if(!leadgens){
      return res.status(400).json({ error: 'No leadgens found.' });
    }
    res.status(201).json(leadgens);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
    
  }
});
//get a leadgen by token
router.get('/:token',authenticateToken, async (req, res) => {
  try {
    const leadgen = await Leadgen.findOne({ token: req.params.token,user: req.user.id });
    if (!leadgen) {
      return res.status(404).json({ error: 'Leadgen not found' });
    }
    res.status(200).json(leadgen);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete leadgen by token.
router.delete('/:token',authenticateToken, async (req, res) => {
  try {
    console.log('In delete:', req.params.token);
    const deletedLeadgen = await Leadgen.findOneAndDelete({ token: req.params.token,user:req.user.id });
    if (!deletedLeadgen) {
      return res.status(404).json({ message: 'Leadgen not found' });
    }
    res.status(200).json({ message: `Leadgen Deleted ${req.params.token}` });
  } catch (error) {
    console.error('Error deleting leadgen:', error);
    res.status(500).json({ message: `Error deleting leadgen: ${error.message}` });
  }
});

// Update status of a leadgen by token
router.patch('/:token/status', authenticateToken, async (req, res) => {
  try {
    const { token } = req.params;

    // Find the leadgen by token and user ID
    const leadgen = await Leadgen.findOne({ token, user: req.user.id });
    if (!leadgen) {
      return res.status(404).json({ error: 'Leadgen not found' });
    }

    // Toggle the status
    leadgen.status = leadgen.status === 'active' ? 'in-active' : 'active';

    // Save the updated leadgen
    await leadgen.save();

    res.status(200).json({ message: 'Leadgen status updated successfully', leadgen });
  } catch (error) {
    console.error('Error updating leadgen status:', error);
    res.status(500).json({ error: error.message || 'An error occurred while updating the leadgen status.' });
  }
});

module.exports = router;