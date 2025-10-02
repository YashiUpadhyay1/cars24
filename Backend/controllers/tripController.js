// Backend/controllers/tripController.js
const RoadTrip = require('../models/RoadTrip');
const User = require('../models/User');
const Review = require('../models/Review');

// CREATE trip
const createTrip = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.title || !payload.createdBy) {
      return res.status(400).json({ error: 'Title and createdBy are required' });
    }
    const trip = await RoadTrip.create(payload);

    // optional: push trip id into user's createdTrips
    try {
      await User.findByIdAndUpdate(trip.createdBy, { $push: { createdTrips: trip._id } });
    } catch (e) {
      // ignore if user update fails, still return trip
      console.warn('Warning: could not push trip to user.createdTrips', e.message);
    }

    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ all trips (with simple populate)
const getTrips = async (req, res) => {
  try {
    const trips = await RoadTrip.find()
      .populate('createdBy', 'username email')
      .populate({ path: 'reviews', populate: { path: 'user', select: 'username' } });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ trip by ID
const getTripById = async (req, res) => {
  try {
    const trip = await RoadTrip.findById(req.params.id)
      .populate('createdBy', 'username email')
      .populate({ path: 'reviews', populate: { path: 'user', select: 'username' } });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE trip
const updateTrip = async (req, res) => {
  try {
    const updated = await RoadTrip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE trip (also remove refs + reviews)
const deleteTrip = async (req, res) => {
  try {
    const trip = await RoadTrip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    // remove trip from user's createdTrips (best-effort)
    try {
      await User.findByIdAndUpdate(trip.createdBy, { $pull: { createdTrips: trip._id } });
    } catch (e) { console.warn('Could not pull trip from user', e.message); }

    // delete any reviews for that trip
    try {
      await Review.deleteMany({ trip: trip._id });
    } catch (e) { console.warn('Could not delete trip reviews', e.message); }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTrip, getTrips, getTripById, updateTrip, deleteTrip };
