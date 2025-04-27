const Event = require('../models/eventModel');

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location, image, category, price } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      image,
      category,
      organizer: req.user._id,
      price
    });

    if (event) {
      res.status(201).json(event);
    } else {
      res.status(400).json({ message: 'Invalid event data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const { category, date } = req.query;
    let filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (date) {
      filter.date = date;
    }
    
    const events = await Event.find(filter).populate('organizer', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email');
    
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is the organizer
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this event' });
    }
    
    const { title, description, date, time, location, image, category, price } = req.body;
    
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.time = time || event.time;
    event.location = location || event.location;
    event.image = image || event.image;
    event.category = category || event.category;
    event.price = price || event.price;
    
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is the organizer
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this event' });
    }
    
    await Event.deleteOne({ _id: req.params.id });
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get events by user (saved or created)
// @route   GET /api/events/user
// @access  Private
const getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  createEvent, 
  getEvents, 
  getEventById, 
  updateEvent, 
  deleteEvent, 
  getUserEvents 
};
