const express = require('express');
const router = express.Router();
const { submitContactForm, getAllContacts } = require('../controllers/contactController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
router.post('/', submitContactForm);
router.get('/admin', authenticate, authorizeAdmin, getAllContacts);

module.exports = router;
