const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    score: { type: Number, required: true },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('User', userSchema);
