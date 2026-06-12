import './HeroNews.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { getNews } from '../../../services/newsService'
import type { News } from '../../../shared/types/News'

export default function HeroNews() {
  const [newsList, setNewsList] = useState<News[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getNews()
        setNewsList(data.slice(0, 3))
      } catch (error) {
        console.error(error)
      }
    }

    loadNews()
  }, [])

  useEffect(() => {
    if (newsList.length <= 1) return

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        current === newsList.length - 1 ? 0 : current + 1
      )
    }, 5000)

    return () => window.clearInterval(interval)
  }, [newsList.length])

  if (newsList.length === 0) return null

  const activeNews = newsList[activeIndex]

  return (
    <section className="hero-news">
      <Link
        to={`/noticias/${activeNews.slug}`}
        className="hero-news__link"
      >
        <img
          src={activeNews.image}
          alt={activeNews.title}
          className="hero-news__image"
        />

        <div className="hero-news__overlay" />

        <div className="hero-news__content">
          <span className="hero-news__tag">
            {activeNews.category}
          </span>

          <h1>
            {activeNews.title}
          </h1>

          <p>
            {activeNews.subtitle}
          </p>

          <span className="hero-news__button">
            Ver noticia
          </span>
        </div>
      </Link>

      <div className="hero-news__dots">
        {newsList.map((item, index) => (
          <button
            key={item._id || item.slug}
            type="button"
            className={
              index === activeIndex
                ? 'hero-news__dot hero-news__dot--active'
                : 'hero-news__dot'
            }
            onClick={() => setActiveIndex(index)}
            aria-label={`Ver noticia ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}