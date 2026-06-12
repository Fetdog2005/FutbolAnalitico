import { useEffect, useState } from 'react'

import NewsCard from '../../home/Featured/NewsCard'
import { getNews } from '../../../services/newsService'
import type { News } from '../../../shared/types/News'

import './NewsPage.css'

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([])

  useEffect(() => {
    getNews()
      .then(setNews)
      .catch(console.error)
  }, [])

  return (
    <main className="news-page">
      <section className="news-page__hero">
        <span>FutbolAnalítico</span>

        <h1>Noticias</h1>

        <p>
          Últimas novedades, historias y análisis del fútbol mundial.
        </p>

        <strong>
          {news.length} noticias publicadas
        </strong>
      </section>

      {news.length > 0 ? (
        <section className="news-page__grid">
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
        </section>
      ) : (
        <div className="news-page__empty">
          Todavía no hay noticias publicadas.
        </div>
      )}
    </main>
  )
}