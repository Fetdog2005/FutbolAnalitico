const mongoose = require('mongoose')

const HashtagSchema = new mongoose.Schema(
  {
    name: String,
    slug: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model(
  'Hashtag',
  HashtagSchema
)