const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLES } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  phone: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date },
  address: { type: String, trim: true, maxlength: 250 },
  role: { type: String, enum: Object.values(ROLES), default: ROLES.CUSTOMER },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: true },
  lastLoginAt: { type: Date }
}, { timestamps: true });

userSchema.methods.comparePassword = function comparePassword(password) { return bcrypt.compare(password, this.passwordHash); };
module.exports = mongoose.model('User', userSchema);
