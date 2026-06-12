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

  if (loading) {
    return (
      <main className="predictions-page">
        <div className="predictions-page__empty">
          Cargando predicciones...
        </div>
      </main>
    )
  }

  return (
    <main className="predictions-page">
      <section className="predictions-page__hero">
        <span>FutbolAnalítico</span>

        <h1>Predicciones</h1>

        <p>
          Análisis, probabilidades y datos clave de los partidos más importantes.
        </p>

        <strong>
          {predictions.length} predicciones disponibles
        </strong>
      </section>

      {predictions.length > 0 ? (
        <section className="predictions-page__grid">
          {predictions.map((prediction) => (
            <PredictionCard
              key={prediction._id || prediction.slug}
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
        </section>
      ) : (
        <div className="predictions-page__empty">
          Todavía no hay predicciones publicadas.
        </div>
      )}
    </main>
  )
}