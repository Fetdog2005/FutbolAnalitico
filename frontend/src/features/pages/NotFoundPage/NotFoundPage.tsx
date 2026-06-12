import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La página que estás buscando no existe o fue movida.</p>

      <Link to="/" className="not-found-page__button">
        Volver al inicio
      </Link>
    </section>
  )
}