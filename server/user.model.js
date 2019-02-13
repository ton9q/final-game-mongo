const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userShema = new Schema(
  {
    name: { type: String, required: true },
    score: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('User', userShema);
