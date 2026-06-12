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
    <section className="news-page">
      <div className="news-page__header">
        <span>FutbolAnalítico</span>
        <h1>Noticias</h1>
        <p>Últimas novedades del fútbol mundial.</p>
      </div>

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
    </section>
  )
}