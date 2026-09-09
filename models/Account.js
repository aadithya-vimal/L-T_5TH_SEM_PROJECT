const mongoose = require('mongoose');
const { ACCOUNT_STATUS, ACCOUNT_TYPES } = require('../utils/constants');

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  accountNumber: { type: String, required: true, unique: true, index: true },
  accountType: { type: String, enum: Object.values(ACCOUNT_TYPES), required: true },
  currency: { type: String, default: 'INR', uppercase: true, minlength: 3, maxlength: 3 },
  balance: { type: Number, default: 0, min: 0 },
  availableBalance: { type: Number, default: 0, min: 0 },
  status: { type: String, enum: Object.values(ACCOUNT_STATUS), default: ACCOUNT_STATUS.PENDING, index: true },
  interestRate: { type: Number, default: 3.5, min: 0, max: 100 },
  openedAt: { type: Date },
  closedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
