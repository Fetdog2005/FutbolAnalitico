import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import NewsCard from '../../home/Featured/NewsCard'
import PredictionCard from '../../home/Prediction/PredictionCard'

import { getNews } from '../../../services/newsService'
import { getPredictions } from '../../../services/predictionService'

import type { News } from '../../../shared/types/News'
import type { Prediction } from '../../../shared/types/Prediction'

import './CategoryPage.css'

function normalize(text: string) {
  return text
    .toLowerCase()
    .replaceAll(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function CategoryPage() {
  const { category } = useParams()

  const [news, setNews] = useState<News[]>([])
  const [predictions, setPredictions] = useState<Prediction[]>([])

  useEffect(() => {
    async function loadCategory() {
      const [newsData, predictionsData] = await Promise.all([
        getNews(),
        getPredictions()
      ])

      setNews(
        newsData.filter((item: News) =>
          normalize(item.category) === category
        )
      )

      setPredictions(
        predictionsData.filter((item: Prediction) =>
          normalize(item.competition) === category
        )
      )
    }

    loadCategory()
  }, [category])

  const title = category?.replaceAll('-', ' ') || ''

  return (
    <section className="news-page">
      <div className="news-page__header">
        <span>Categoría</span>
        <h1>{title}</h1>
      </div>

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