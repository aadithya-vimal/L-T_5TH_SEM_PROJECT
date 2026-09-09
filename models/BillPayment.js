const mongoose = require('mongoose');
const billPaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  billerName: { type: String, required: true, trim: true },
  billerCategory: { type: String, enum: ['ELECTRICITY', 'WATER', 'MOBILE', 'INTERNET', 'CREDIT_CARD', 'OTHER'], default: 'OTHER' },
  consumerNumber: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0.01 },
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
  status: { type: String, enum: ['COMPLETED', 'FAILED'], default: 'COMPLETED' },
  dueDate: { type: Date }
}, { timestamps: true });
billPaymentSchema.index({ userId: 1, createdAt: -1 });
module.exports = mongoose.model('BillPayment', billPaymentSchema);
