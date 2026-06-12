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
    <article className="news-card">
      <img
        className="news-card__image"
        src={image}
        alt={title}
      />

      <div className="news-card__content">
        <Link
  to={`/categoria/${category
    .toLowerCase()
    .replaceAll(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')}`}
  className="news-card__category"
>
  {category}
</Link>

        <h3 className="news-card__title">
          {title}
        </h3>

        <p className="news-card__excerpt">
          {excerpt}
        </p>

        <Link
          to={`/noticias/${slug}`}
          className="news-card__button"
        >
          Leer más
        </Link>
      </div>
    </article>
  )
}