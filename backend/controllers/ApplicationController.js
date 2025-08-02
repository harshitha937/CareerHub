const Application = require('../models/Application');

const applyToJob = async (req, res) => {
  try {
    const { firstName, username, mobile, address, jobId } = req.body;
    const resume = req.files['resume']?.[0]?.filename;
    const documents = req.files['documents']?.map((file) => file.filename) || [];

    if (!firstName || !username || !mobile || !address || !resume || !jobId) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const application = await Application.create({
      job: jobId,
      user: req.user._id,
      firstName,
      username,
      mobile,
      address,
      resume,
      documents,
    });

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('❌ Apply failed:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getApplicationsByUser = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).populate('job');
    res.json(applications);
    console.log('🔍 Fetching applications for user:', req.user._id);

  } catch (err) {
    console.error('❌ Get applications error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { applyToJob, getApplicationsByUser };
