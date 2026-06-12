import { Link } from 'react-router-dom'
import './Header.css'

export default function HeaderBottom() {
  return (
    <nav className="header-bottom">
      <Link to="/">Inicio</Link>

      <Link to="/mundial-2026">
        Mundial 2026
      </Link>

      <Link to="/seleccion-argentina">
        Selección Argentina
      </Link>

      <Link to="/noticias">
        Noticias
      </Link>

      <Link to="/predicciones">
        Predicciones
      </Link>
    </nav>
  )
}