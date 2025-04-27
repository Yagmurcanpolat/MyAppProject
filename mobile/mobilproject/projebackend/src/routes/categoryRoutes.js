const express = require('express');
const router = express.Router();
const { getCategories, createCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getCategories);

// Protected routes
router.post('/', protect, createCategory);

module.exports = router;
