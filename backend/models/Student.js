const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  address: String,
  marks: Number,
  view: String
});

module.exports = mongoose.model('Student', studentSchema);
