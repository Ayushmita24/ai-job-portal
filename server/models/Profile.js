const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  bio: { type: String, default: '' },
  skills: [{ type: String }],
  experience: { type: String, default: '' },
  education: { type: String, default: '' },
  location: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);