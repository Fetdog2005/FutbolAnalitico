const mongoose = require('mongoose')

const CompetitionSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    logo: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model(
  'Competition',
  CompetitionSchema
)