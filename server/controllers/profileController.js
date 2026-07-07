const Profile = require('../models/Profile');

exports.saveProfile = async (req, res) => {
  try {
    const { bio, skills, experience, education, location } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { bio, skills, experience, education, location, user: req.user.id },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};