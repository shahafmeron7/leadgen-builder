const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  questions: [{ type: String, required: true }],
});

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema,'questionnaires');
module.exports = Questionnaire;