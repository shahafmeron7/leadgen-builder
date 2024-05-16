// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  id: { type: Number, unique: true },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  // Generate incremental ID
  if (this.isNew) {
    const latestUser = await this.constructor.findOne().sort({ id: -1 });
    this.id = latestUser ? latestUser.id + 1 : 1;
  }

  next();
});

const User = mongoose.model('User', userSchema,"users");
module.exports = User;
