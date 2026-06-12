import { Link } from 'react-router-dom'
import './NewsCard.css'

type NewsCardProps = {
  image: string
  category: string
  title: string
  excerpt: string
  slug: string
}

export default function NewsCard({
  image,
  category,
  title,
  excerpt,
  slug
}: NewsCardProps) {
  return (
    <Link to={`/noticias/${slug}`} className="news-card">
      <img
        className="news-card__image"
        src={image}
        alt={title}
      />

      <div className="news-card__content">
        <span className="news-card__category">
          {category}
        </span>

        <h3 className="news-card__title">
          {title}
        </h3>

        <p className="news-card__excerpt">
          {excerpt}
        </p>

        <span className="news-card__badge">
          Reciente
        </span>
      </div>
    </Link>
  )
}