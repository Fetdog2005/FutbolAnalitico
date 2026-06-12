const express = require('express')

const router = express.Router()

const {
  getPredictions,
  getPredictionById,
  getPredictionBySlug,
  createPrediction,
  updatePrediction,
  deletePrediction
} = require('../controllers/prediction.controller')

router.get('/', getPredictions)

router.get('/id/:id', getPredictionById)

router.get('/:slug', getPredictionBySlug)

router.post('/', createPrediction)

router.put('/:id', updatePrediction)

router.delete('/:id', deletePrediction)

module.exports = router