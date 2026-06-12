import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './PredictionSection.css'
import PredictionCard from './PredictionCard'

import { getPredictions } from '../../../services/predictionService'
import type { Prediction } from '../../../shared/types/Prediction'

export default function PredictionsSection() {
  const [predictions, setPredictions] = useState<Prediction[]>([])

  useEffect(() => {
    async function loadPredictions() {
      try {
        const data = await getPredictions()

        setPredictions(data.slice(0, 6))
      } catch (error) {
        console.error(error)
      }
    }

    loadPredictions()
  }, [])

  return (
    <section className="predictions-section">
      <div className="container">
        <h2>Predicciones de la jornada</h2>

        <div className="predictions-grid">
          {predictions.map((prediction) => (
            <PredictionCard
              key={prediction._id}
              slug={prediction.slug}
              competition={prediction.competition}
              homeLogo={prediction.homeLogo}
              awayLogo={prediction.awayLogo}
              homeTeam={prediction.homeTeam}
              awayTeam={prediction.awayTeam}
              date={prediction.date}
              homeProbability={prediction.homeProbability}
              drawProbability={prediction.drawProbability}
              awayProbability={prediction.awayProbability}
            />
          ))}
        </div>

        <div className="predictions-section__actions">
          <Link to="/predicciones">
  <button>Ver más predicciones</button>
</Link>
        </div>
      </div>
    </section>
  )
}