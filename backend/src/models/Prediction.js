const mongoose = require('mongoose')

const PredictionSchema = new mongoose.Schema(
  {
    slug: String,

    competition: String,

    homeTeam: String,
    awayTeam: String,

    homeLogo: String,
    awayLogo: String,

      competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competition'
    },

    homeTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },

    awayTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team'
    },

    date: String,

    homeProbability: Number,
    drawProbability: Number,
    awayProbability: Number,

    blocks: [
      {
        title: String,
        items: [
          {
            label: String,
            value: String
          }
        ]
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