const mongoose = require('mongoose');
const auditSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  resourceId: { type: mongoose.Schema.Types.ObjectId },
  ipAddress: String,
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });
auditSchema.index({ createdAt: -1 });
module.exports = mongoose.model('AuditLog', auditSchema);
