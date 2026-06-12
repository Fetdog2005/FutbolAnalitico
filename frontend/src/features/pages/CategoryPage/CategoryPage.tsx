import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import NewsCard from '../../home/Featured/NewsCard'
import PredictionCard from '../../home/Prediction/PredictionCard'

import { getNews } from '../../../services/newsService'
import { getPredictions } from '../../../services/predictionService'

import type { News } from '../../../shared/types/News'
import type { Prediction } from '../../../shared/types/Prediction'

import './CategoryPage.css'

function normalize(text: string = '') {
  return text
    .toLowerCase()
    .trim()
    .replaceAll(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function formatTitle(text: string = '') {
  return text
    .replaceAll('-', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export default function CategoryPage() {
  const { category } = useParams()

  const [news, setNews] = useState<News[]>([])
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCategory() {
      try {
        setLoading(true)

        const [newsData, predictionsData] = await Promise.all([
          getNews(),
          getPredictions()
        ])

        setNews(
          newsData.filter((item: News) =>
            normalize(item.category) === category ||
            item.hashtags?.some((tag) => normalize(tag) === category) ||
            item.teams?.some((team) => normalize(team) === category) ||
            normalize(item.competition) === category
          )
        )

        setPredictions(
          predictionsData.filter((item: Prediction) =>
            normalize(item.competition) === category ||
            normalize(item.homeTeam) === category ||
            normalize(item.awayTeam) === category
          )
        )
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadCategory()
  }, [category])

  const title = formatTitle(category)
  const hasResults = news.length > 0 || predictions.length > 0

  if (loading) {
    return (
      <main className="category-page">
        <div className="category-page__empty">
          Cargando categoría...
        </div>
      </main>
    )
  }

  return (
    <main className="category-page">
      <section className="category-page__hero">
        <span>Categoría</span>

        <h1>{title}</h1>

        <p>
          Noticias, predicciones y contenido relacionado con {title}.
        </p>

        <strong>
          {news.length + predictions.length} contenidos encontrados
        </strong>
      </section>

      {!hasResults && (
        <div className="category-page__empty">
          Todavía no hay contenido relacionado con {title}.
        </div>
      )}

      {news.length > 0 && (
        <section className="category-page__section">
          <div className="category-page__section-header">
            <span>Noticias</span>
            <h2>Últimas noticias</h2>
          </div>

          <div className="category-page__grid">
            {news.map((item) => (
              <NewsCard
                key={item._id || item.slug}
                image={item.image}
                category={item.category}
                title={item.title}
                excerpt={item.subtitle}
                slug={item.slug}
              />
            ))}
          </div>
        </section>
      )}

      {predictions.length > 0 && (
        <section className="category-page__section">
          <div className="category-page__section-header">
            <span>Predicciones</span>
            <h2>Análisis relacionados</h2>
          </div>

          <div className="category-page__grid">
            {predictions.map((prediction) => (
              <PredictionCard
                key={prediction._id || prediction.slug}
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
        </section>
      )}
    </main>
  )
}