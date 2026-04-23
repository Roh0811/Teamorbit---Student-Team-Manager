const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  roll:           { type: String, required: true },
  year:           { type: String, required: true },
  degree:         { type: String, required: true },
  project:        { type: String },               // "About Project"
  hobbies:        { type: String },               // comma-separated string
  certificate:    { type: String },
  internship:     { type: String },
  aboutYourAim:   { type: String },               // "About Your Aim"
  image:          { type: String },               // filename stored by multer
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
