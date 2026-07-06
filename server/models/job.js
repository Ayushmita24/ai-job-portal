const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Remote', 'Internship'], default: 'Full-time' },
  salary: { type: String },
  description: { type: String, required: true },
  skills: [{ type: String }],
  experience: { type: String },
  logo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);