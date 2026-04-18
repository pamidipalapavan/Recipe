const mongoose = require('mongoose');

const FlagSchema = new mongoose.Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Flag', FlagSchema);
