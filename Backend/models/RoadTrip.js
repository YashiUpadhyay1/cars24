const mongoose = require('mongoose');

const RoadTripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  locations: [{ type: String }], // e.g. ["Paris", "Berlin"]
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  duration: { type: Number }, // in days
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

module.exports = mongoose.model('RoadTrip', RoadTripSchema);
