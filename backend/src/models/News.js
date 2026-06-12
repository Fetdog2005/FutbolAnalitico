const mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema(
  {
    slug: String,
    title: String,
    subtitle: String,
    category: String,
    image: String,

    hashtags: [String],

    sections: [
      {
        type: {
          type: String
        },
        content: String,
        image: String
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model(
  'News',
  NewsSchema
)