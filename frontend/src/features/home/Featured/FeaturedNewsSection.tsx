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

        setNews(data.slice(3, 6))
      } catch (error) {
        console.error(error)
      }
    }

    loadNews()
  }, [])

  if (news.length === 0) return null

  return (
    <section className="featured-news-section">
      <div className="featured-header">
        <div>
          <span>Noticias destacadas</span>
          <h2>Más historias</h2>
        </div>
      </div>

      <div className="featured-news-grid">
        {news.map((article) => (
          <NewsCard
            key={article._id || article.slug}
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