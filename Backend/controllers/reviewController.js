// Backend/controllers/reviewController.js
const Review = require('../models/Review');
const RoadTrip = require('../models/RoadTrip');

// CREATE review
const createReview = async (req, res) => {
  try {
    const { trip, user, rating, comment } = req.body;
    if (!trip || !user || !rating) {
      return res.status(400).json({ error: 'trip, user and rating are required' });
    }

    const review = await Review.create({ trip, user, rating, comment });

    // push review id into roadtrip.reviews
    try {
      await RoadTrip.findByIdAndUpdate(trip, { $push: { reviews: review._id } });
    } catch (e) {
      console.warn('Could not push review into trip.reviews', e.message);
    }

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'username')
      .populate('trip', 'title');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE review
const updateReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE review (and remove from roadtrip.reviews)
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    try {
      await RoadTrip.findByIdAndUpdate(review.trip, { $pull: { reviews: review._id } });
    } catch (e) { console.warn('Could not pull review from trip', e.message); }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createReview, getReviews, updateReview, deleteReview };
