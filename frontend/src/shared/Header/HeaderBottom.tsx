import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getCategories } from '../../services/contentService'

import './Header.css'

type Category = {
  _id: string
  name: string
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replaceAll(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default function HeaderBottom() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data)
      })
      .catch(console.error)
  }, [])

  return (
    <nav className="header-bottom">
      <Link to="/">Inicio</Link>

      {categories.map((category) => (
        <Link
          key={category._id}
          to={`/categoria/${slugify(category.name)}`}
        >
          {category.name}
        </Link>
      ))}

      <Link to="/noticias">
        Noticias
      </Link>

      <Link to="/predicciones">
        Predicciones
      </Link>
    </nav>
  )
}