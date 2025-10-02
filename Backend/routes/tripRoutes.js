const express = require('express');
const router = express.Router();
const { createTrip, getTrips, getTripById, updateTrip, deleteTrip } = require('../controllers/tripController');

router.post('/', createTrip);
router.get('/', getTrips);
router.get('/:id', getTripById);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

module.exports = router;
