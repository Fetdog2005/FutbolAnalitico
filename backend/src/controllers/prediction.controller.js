const Prediction = require('../models/Prediction')

exports.getPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find()
      .sort({ createdAt: -1 })

    res.json(predictions)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getPredictionById = async (req, res) => {
  try {
    const prediction = await Prediction.findById(
      req.params.id
    )

    if (!prediction) {
      return res.status(404).json({
        message: 'Predicción no encontrada'
      })
    }

    res.json(prediction)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getPredictionBySlug = async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      slug: req.params.slug
    })

    if (!prediction) {
      return res.status(404).json({
        message: 'Predicción no encontrada'
      })
    }

    res.json(prediction)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.createPrediction = async (req, res) => {
  try {
    const prediction = await Prediction.create(
      req.body
    )

    res.status(201).json(prediction)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.updatePrediction = async (req, res) => {
  try {
    const prediction =
      await Prediction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )

    if (!prediction) {
      return res.status(404).json({
        message: 'Predicción no encontrada'
      })
    }

    res.json(prediction)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.deletePrediction = async (req, res) => {
  try {
    const prediction =
      await Prediction.findByIdAndDelete(
        req.params.id
      )

    if (!prediction) {
      return res.status(404).json({
        message: 'Predicción no encontrada'
      })
    }

    res.json({
      message: 'Predicción eliminada'
    })
  } catch (error) {
    res.status(500).json(error)
  }
}