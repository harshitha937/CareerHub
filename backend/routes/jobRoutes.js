const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
} = require('../controllers/JobController');
const { authenticate,authorizeAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
      .post(authenticate,authorizeAdmin , upload.single('image'), createJob)
      .get(getJobs);
router.route('/:id').get(getJobById).delete(authenticate, authorizeAdmin ,deleteJob);

module.exports = router;
