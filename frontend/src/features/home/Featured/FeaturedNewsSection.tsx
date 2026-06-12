import { useEffect, useState } from 'react'

import './FeaturedNewsSection.css'
import NewsCard from './NewsCard'

import { getNews } from '../../../services/newsService'
import type { News } from '../../../shared/types/News'

export default function FeaturedNewsSection() {
  const [news, setNews] = useState<News[]>([])

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getNews()

        setNews(data.slice(0, 3))
      } catch (error) {
        console.error(error)
      }
    }

    loadNews()
  }, [])

  return (
    <section className="featured-news-section">
      <div className="featured-header">
        <h2>Lo último</h2>
        <span>Noticias destacadas</span>
      </div>

      <div className="featured-news-grid">
        {news.map((article) => (
          <NewsCard
            key={article._id}
            image={article.image}
            category={article.category}
            title={article.title}
            excerpt={article.subtitle}
            slug={article.slug}
          />
        ))}
      </div>
    </section>
  )
}