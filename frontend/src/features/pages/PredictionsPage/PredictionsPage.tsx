import { useEffect, useState } from 'react'

import PredictionCard from '../../home/Prediction/PredictionCard'
import { getPredictions } from '../../../services/predictionService'
import type { Prediction } from '../../../shared/types/Prediction'

import './PredictionsPage.css'

export default function PredictionsPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPredictions()
      .then(setPredictions)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <h1>Cargando...</h1>

  return (
    <section className="predictions-page">
      <div className="predictions-page__header">
        <span>FutbolAnalítico</span>
        <h1>Predicciones</h1>
        <p>Análisis y probabilidades de los partidos más importantes.</p>
      </div>

      <div className="predictions-page__grid">
        {predictions.map((prediction) => (
          <PredictionCard
            key={prediction._id}
            slug={prediction.slug}
            competition={prediction.competition}
            homeTeam={prediction.homeTeam}
            awayTeam={prediction.awayTeam}
            date={prediction.date}
            homeProbability={prediction.homeProbability}
            drawProbability={prediction.drawProbability}
            awayProbability={prediction.awayProbability}
            homeLogo={prediction.homeLogo}
            awayLogo={prediction.awayLogo}
          />
        ))}
      </div>
    </section>
  )
}