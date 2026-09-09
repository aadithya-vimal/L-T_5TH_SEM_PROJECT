const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
  lastFourDigits: { type: String, required: true, minlength: 4, maxlength: 4 },
  cardType: { type: String, enum: ['DEBIT', 'CREDIT'], default: 'DEBIT' },
  status: { type: String, enum: ['ACTIVE', 'BLOCKED', 'EXPIRED', 'CANCELLED'], default: 'ACTIVE', index: true },
  issuedAt: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Card', cardSchema);
