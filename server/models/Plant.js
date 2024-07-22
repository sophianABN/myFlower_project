const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  waterNeeds: {
    quantity: {
      type: Number,
      required: true
    },
    frequency: {
      type: Number,
      required: true
    }
  },
  lastWatered: {
    type: Date
  },
  wateringHistory: [{
    date: Date,
    quantity: Number
  }]
});

module.exports = mongoose.model('Plant', PlantSchema);