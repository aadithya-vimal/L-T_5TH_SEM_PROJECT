const mongoose = require('mongoose');
const supportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  subject: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, required: true, trim: true, maxlength: 1000 },
  category: { type: String, enum: ['ACCOUNT', 'TRANSACTION', 'CARD', 'SECURITY', 'OTHER'], default: 'OTHER' },
  priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' },
  status: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'], default: 'OPEN', index: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolution: { type: String, maxlength: 1000 }
}, { timestamps: true });
supportSchema.index({ userId: 1, createdAt: -1 });
module.exports = mongoose.model('SupportRequest', supportSchema);
