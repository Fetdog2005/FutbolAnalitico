const mongoose = require('mongoose')

const PredictionSchema =
  new mongoose.Schema(
    {
      slug: String,

      competition: String,

      homeTeam: String,
      awayTeam: String,

      homeLogo: String,
      awayLogo: String,

      date: String,

      homeProbability: Number,
      drawProbability: Number,
      awayProbability: Number,

      blocks: [
        {
          title: String,
          teamAValue: Number,
          teamBValue: Number,
          description: String
        }
      ]
    },
    {
      timestamps: true
    }
  )

module.exports = mongoose.model(
  'Prediction',
  PredictionSchema
)