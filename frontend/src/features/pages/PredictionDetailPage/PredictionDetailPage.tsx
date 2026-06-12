import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Prediction } from '../../../shared/types/Prediction'
import { Helmet } from 'react-helmet-async'
import { getPredictionBySlug } from '../../../services/predictionService'

import './PredictionDetailPage.css'

export default function PredictionDetailPage() {
  const { slug } = useParams()

  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    getPredictionBySlug(slug)
      .then((data) => {
        setPrediction(data)
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return <h1>Cargando...</h1>
  }

  if (!prediction) {
    return <h1>Predicción no encontrada</h1>
  }

  return (
    <>
      <Helmet>
        <meta
          property="og:title"
          content={`${prediction.homeTeam} vs ${prediction.awayTeam} Prediction`}
        />

        <meta
          property="og:description"
          content={`${prediction.homeTeam} vs ${prediction.awayTeam} prediction, probabilities and analysis.`}
        />

        <meta property="og:type" content="article" />

        <link
          rel="canonical"
          href={`https://futbolanalitico.com/predicciones/${prediction.slug}`}
        />

        <title>
          {prediction.homeTeam} vs {prediction.awayTeam} Prediction | Futbol Analítico
        </title>

        <meta
          name="description"
          content={`${prediction.homeTeam} vs ${prediction.awayTeam} prediction, probabilities and analysis.`}
        />
      </Helmet>

      <div className="prediction-detail">
        <div className="prediction-detail__header">
          <span className="competition">
            {prediction.competition}
          </span>

          <div className="prediction-detail__teams">
            <div className="prediction-detail__team">
              {prediction.homeLogo && (
                <img src={prediction.homeLogo} alt={prediction.homeTeam} />
              )}
              <span>{prediction.homeTeam}</span>
            </div>

            <strong>vs</strong>

            <div className="prediction-detail__team">
              {prediction.awayLogo && (
                <img src={prediction.awayLogo} alt={prediction.awayTeam} />
              )}
              <span>{prediction.awayTeam}</span>
            </div>
          </div>

          <p className="date">
            {prediction.date}
          </p>
        </div>

        <div className="prediction-detail__probabilities">
          <div>
            <span>Local</span>
            <strong>{prediction.homeProbability}%</strong>
          </div>

          <div>
            <span>Empate</span>
            <strong>{prediction.drawProbability}%</strong>
          </div>

          <div>
            <span>Visitante</span>
            <strong>{prediction.awayProbability}%</strong>
          </div>
        </div>

        <div className="prediction-detail__blocks">
          {prediction.blocks.map((block, index) => (
            <div key={`${block.title}-${index}`} className="block">
              <h3>{block.title}</h3>

              <div className="block-data-list">
                {block.items.map((item, itemIndex) => (
                  <div
                    key={`${item.label}-${itemIndex}`}
                    className="block-data-item"
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}