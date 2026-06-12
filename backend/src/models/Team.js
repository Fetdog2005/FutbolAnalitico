const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema(
  {
    name: String,

    slug: String,

    logo: String,

    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competition'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model(
  'Team',
  TeamSchema
)