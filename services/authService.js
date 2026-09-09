const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const ApiError = require('../utils/ApiError');
async function register(data) {
  if (await User.findOne({ email: data.email.toLowerCase() })) throw new ApiError(409, 'Email is already registered', 'DUPLICATE_EMAIL');
  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await User.create({ ...data, email: data.email.toLowerCase(), passwordHash, role: 'CUSTOMER' });
  return { user, token: generateToken(user) };
}
async function login(email, password) {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
  if (!user || !(await user.comparePassword(password)) || !user.isActive) throw new ApiError(401, 'Invalid credentials', 'INVALID_CREDENTIALS');
  user.lastLoginAt = new Date(); await user.save();
  return { user, token: generateToken(user) };
}
module.exports = { register, login };
