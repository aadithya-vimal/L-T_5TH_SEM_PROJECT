const mongoose = require('mongoose');
const { mongoUri } = require('./env');

async function connectDB() {
  await mongoose.connect(mongoUri, { autoIndex: true });
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}

async function disconnectDB() {
  await mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
