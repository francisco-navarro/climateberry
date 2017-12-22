const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  timestamp: { type: Date, default: new Date() },
  temperature: Number,
  target: Number,
  heatingState: Number,
});

mongoose.model('State', UserSchema);
