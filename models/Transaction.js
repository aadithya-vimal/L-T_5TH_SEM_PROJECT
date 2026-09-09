const mongoose = require('mongoose');
const { TRANSACTION_STATUS, TRANSACTION_TYPES } = require('../utils/constants');

const transactionSchema = new mongoose.Schema({
  transactionReference: { type: String, required: true, unique: true, index: true },
  sourceAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', index: true },
  destinationAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: Object.values(TRANSACTION_TYPES), required: true },
  amount: { type: Number, required: true, min: 0.01 },
  currency: { type: String, default: 'INR', uppercase: true },
  status: { type: String, enum: Object.values(TRANSACTION_STATUS), default: TRANSACTION_STATUS.COMPLETED, index: true },
  description: { type: String, trim: true, maxlength: 250 },
  beneficiaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Beneficiary' },
  balanceBefore: { type: Number },
  balanceAfter: { type: Number },
  failureReason: { type: String },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });
transactionSchema.index({ userId: 1, createdAt: -1 });
module.exports = mongoose.model('Transaction', transactionSchema);
