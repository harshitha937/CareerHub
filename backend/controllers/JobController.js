const Job = require('../models/Job');


// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;
    const image = req.file ? req.file.filename : null;

    // Validate each field
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!company) {
      return res.status(400).json({ message: 'Company is required' });
    }
    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }
    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const job = await Job.create({
      title,
      company,
      location,
      description,
      image,
      postedBy: req.user._id, // ensure authMiddleware is used
    });

    console.log('✅ Job Created:', job);
    res.status(201).json(job);

  } catch (err) {
    console.error('❌ Job creation failed:', err.message);
    res.status(500).json({ message: 'Job creation failed', error: err.message });
  }
};


// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: 'Job not found' });

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch job' });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (admin or owner)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: 'Job not found' });

    const isOwner = job.postedBy.toString() === req.user._id.toString();
    const isAdmin = req.user.isAdmin;

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job' });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
};
