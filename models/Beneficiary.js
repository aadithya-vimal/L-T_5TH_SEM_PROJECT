const mongoose = require('mongoose');
const beneficiarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  nickname: { type: String, required: true, trim: true },
  accountHolderName: { type: String, required: true, trim: true },
  accountNumber: { type: String, required: true, trim: true },
  bankName: { type: String, required: true, trim: true },
  ifscCode: { type: String, required: true, uppercase: true, trim: true },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
beneficiarySchema.index({ userId: 1, accountNumber: 1 }, { unique: true });
module.exports = mongoose.model('Beneficiary', beneficiarySchema);
