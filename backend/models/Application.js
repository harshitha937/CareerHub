const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: { type: String, required: true },
    username: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    resume: { type: String, required: true }, // filename
    documents: [{ type: String }], // filenames of other files
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
