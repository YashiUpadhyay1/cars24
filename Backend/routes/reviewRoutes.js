const express = require('express');
const router = express.Router();
const { createReview, getReviews, updateReview, deleteReview } = require('../controllers/reviewController');

router.post('/', createReview);
router.get('/', getReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
