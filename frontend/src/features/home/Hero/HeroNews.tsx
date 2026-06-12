import './HeroNews.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getNews } from '../../../services/newsService'
import type { News } from '../../../shared/types/News'

export default function HeroNews() {
  const [news, setNews] = useState<News | null>(null)

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getNews()

        if (data.length > 0) {
          setNews(data[0])
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadNews()
  }, [])

  if (!news) return null

  return (
    <section className="hero-news">
      <img
        src={news.image}
        alt={news.title}
      />

      <div className="overlay" />

      <div className="content">
        <span className="tag">
          {news.category}
        </span>

        <h1>
          {news.title}
        </h1>

        <p>
          {news.subtitle}
        </p>

        <Link to={`/noticias/${news.slug}`}>
          <button>
            Ver más
          </button>
        </Link>
      </div>
    </section>
  )
}