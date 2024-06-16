const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;

const generateToken = () => `leadgen_${crypto.randomBytes(8).toString('hex')}`;

const answerSchema = new Schema({
  text: { type: String, required: true },
  next_question_code: { type: String, required: true }
}, { _id: false });

const questionSchema = new Schema({
  text: { type: String, required: true },
  code: { type: String, required: true },
  step: { type: Number, required: true },
  type: { type: String, required: true },
  display_list_direction: { type: String, required: true },
  answers: [answerSchema]
}, { _id: false });

const leadgenSchema = new Schema({
  token: { type: String, default: generateToken, unique: true },
  title: { type: String, required: true },
  flowName: { type: String, required: true },
  questions: [questionSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'active' }

},{
  timestamps: true
});
const Leadgen =  mongoose.model('Leadgen', leadgenSchema,'leadgens');
module.exports = Leadgen;
