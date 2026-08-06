const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitContactForm } = require('../controllers/contactController');

// Validation rules
const validateContact = [
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('phone').optional({ checkFalsy: true }).trim().escape(),
    body('message').trim().notEmpty().withMessage('Message is required').escape()
];

// POST /api/contact
router.post('/', validateContact, submitContactForm);

module.exports = router;