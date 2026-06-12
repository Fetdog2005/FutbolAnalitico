import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import NewsCard from '../../home/Featured/NewsCard'
import PredictionCard from '../../home/Prediction/PredictionCard'

import { getNews } from '../../../services/newsService'
import { getPredictions } from '../../../services/predictionService'

import type { News } from '../../../shared/types/News'
import type { Prediction } from '../../../shared/types/Prediction'

import './SearchPage.css'

export default function SearchPage() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''

  const [news, setNews] = useState<News[]>([])
  const [predictions, setPredictions] = useState<Prediction[]>([])

  useEffect(() => {
    async function loadResults() {
      const [newsData, predictionsData] = await Promise.all([
        getNews(),
        getPredictions()
      ])

      const search = query.toLowerCase()

      setNews(
        newsData.filter((item: News) =>
          item.title.toLowerCase().includes(search) ||
          (item.subtitle || '').toLowerCase().includes(search) ||
          item.category.toLowerCase().includes(search)
        )
      )

      setPredictions(
        predictionsData.filter((item: Prediction) =>
          item.homeTeam.toLowerCase().includes(search) ||
          item.awayTeam.toLowerCase().includes(search) ||
          item.competition.toLowerCase().includes(search)
        )
      )
    }

    if (query) {
      loadResults()
    }
  }, [query])

  const hasResults = news.length > 0 || predictions.length > 0

  return (
    <section className="news-page">
      <div className="news-page__header">
        <span>Resultados</span>
        <h1>Búsqueda: {query}</h1>
      </div>

      {!hasResults && (
        <p>No se encontraron resultados para "{query}".</p>
      )}

      {news.length > 0 && (
        <>
          <h2>Noticias</h2>

          <div className="news-page__grid">
            {news.map((item) => (
              <NewsCard
                key={item._id}
                image={item.image}
                category={item.category}
                title={item.title}
                excerpt={item.subtitle}
                slug={item.slug}
              />
            ))}
          </div>
        </>
      )}

      {predictions.length > 0 && (
        <>
          <h2>Predicciones</h2>

          <div className="news-page__grid">
            {predictions.map((prediction) => (
              <PredictionCard
                key={prediction._id}
                slug={prediction.slug}
                competition={prediction.competition}
                homeTeam={prediction.homeTeam}
                awayTeam={prediction.awayTeam}
                homeLogo={prediction.homeLogo}
                awayLogo={prediction.awayLogo}
                date={prediction.date}
                homeProbability={prediction.homeProbability}
                drawProbability={prediction.drawProbability}
                awayProbability={prediction.awayProbability}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}