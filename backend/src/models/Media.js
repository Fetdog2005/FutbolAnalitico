const mongoose = require('mongoose')

const MediaSchema = new mongoose.Schema(
  {
    url: String,

    public_id: String,

    hashtags: [String]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model(
  'Media',
  MediaSchema
)