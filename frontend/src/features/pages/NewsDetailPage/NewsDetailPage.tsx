import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { News } from '../../../shared/types/News'
import { Helmet } from 'react-helmet-async'
import { getNewsBySlug } from '../../../services/newsService'

import './NewsDetailPage.css'

export default function NewsDetailPage() {
  const { slug } = useParams()

  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    getNewsBySlug(slug)
      .then((data) => {
        setNews(data)
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return <h1>Cargando...</h1>
  }

  if (!news) {
    return <h1>Noticia no encontrada</h1>
  }

  return (
    
    <>
  <Helmet>
    <meta property="og:title" content={news.title} />
    <meta property="og:description" content={news.subtitle} />
    <meta property="og:image" content={news.image} />
    <meta property="og:type" content="article" />
    <link
  rel="canonical"
  href={`https://futbolanalitico.com/noticias/${news.slug}`}
/>
    <title>{news.title} | Futbol Analítico</title>

    <meta
      name="description"
      content={news.subtitle}
    />
  </Helmet>

  <div className="news-detail">
      <img
        className="news-detail__hero"
        src={news.image}
        alt={news.title}
      />

      <span className="news-detail__category">
        {news.category}
      </span>

      <h1 className="news-detail__title">
        {news.title}
      </h1>

      <p className="news-detail__subtitle">
        {news.subtitle}
      </p>

        <p className="news-detail__date">
          {new Date(news.createdAt).toLocaleDateString('es-AR')}
        </p>

      {news.sections.map((section, index) => {
        switch (section.type) {
          case 'text':
            return (
              <p
                key={index}
                className="news-detail__text"
              >
                {section.content}
              </p>
            )

          case 'image-right':
            return (
              <div
                key={index}
                className="news-detail__section"
              >
                <p>{section.content}</p>

                <img
                  src={section.image}
                  alt=""
                />
              </div>
            )

          case 'image-left':
            return (
              <div
                key={index}
                className="news-detail__section news-detail__section--reverse"
              >
                <img
                  src={section.image}
                  alt=""
                />

                <p>{section.content}</p>
              </div>
            )

          case 'image-full':
            return (
              <img
                key={index}
                className="news-detail__image-full"
                src={section.image}
                alt=""
              />
            )

          default:
            return null
        }
      })}

            <div className="news-detail__hashtags">
        {news.hashtags.map((tag: string) => (
          <span key={tag}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  </>
)
}