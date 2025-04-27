const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  completeProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/', registerUser);
router.post('/login', loginUser);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Profil tamamlama endpoint'i
router.post('/complete-profile', protect, completeProfile);

module.exports = router;
