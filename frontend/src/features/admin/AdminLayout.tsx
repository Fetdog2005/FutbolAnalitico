import { Outlet, Link, Navigate } from 'react-router-dom'
import './AdminLayout.css'

export default function AdminLayout() {
  const token =
    localStorage.getItem('adminToken')

  if (!token) {
    return <Navigate to="/" replace />
  }

  function logout() {
    localStorage.removeItem(
      'adminToken'
    )

    window.location.href = '/'
  }

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">
        <h2>FutbolAnalítico</h2>

        <nav>
          <Link to="/admin">
            Dashboard
          </Link>

          <Link to="/admin/noticias">
            Noticias
          </Link>

          <Link to="/admin/noticias/crear">
            Crear noticia
          </Link>

          <Link to="/admin/predicciones">
            Predicciones
          </Link>

          <Link to="/admin/predicciones/crear">
            Crear predicción
          </Link>

          <button
            className="admin-logout"
            onClick={logout}
          >
            Cerrar sesión
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  )
}