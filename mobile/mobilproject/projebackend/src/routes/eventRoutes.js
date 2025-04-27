const express = require('express');
const router = express.Router();
const { 
  createEvent, 
  getEvents, 
  getEventById, 
  updateEvent, 
  deleteEvent, 
  getUserEvents 
} = require('../controllers/eventController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', protect, createEvent);
router.route('/:id')
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);
router.get('/user/events', protect, getUserEvents);

module.exports = router;
