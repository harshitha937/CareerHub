const express = require('express');
const { applyToJob , getApplicationsByUser } = require('../controllers/ApplicationController');

const { authenticate } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post(
  '/apply',
  authenticate,
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
  ]),
  applyToJob
);

router.get('/my-applications', authenticate, getApplicationsByUser);

module.exports = router;
