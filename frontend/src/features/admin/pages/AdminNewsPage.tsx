import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminNewsPage.css'

import { getNews, deleteNews } from '../../../services/newsService'
import type { News } from '../../../shared/types/News'

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([])

  useEffect(() => {
    loadNews()
  }, [])

  async function loadNews() {
    const data = await getNews()
    setNews(data)
  }

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      '¿Eliminar noticia?'
    )

    if (!confirmDelete) return

    await deleteNews(id)
    loadNews()
  }

  return (
    <div className="admin-news">

  <div className="admin-news-header">
    <h1>Administrar noticias</h1>

    <Link
      to="/admin/noticias/crear"
      className="admin-news-create"
    >
      Nueva noticia
    </Link>
  </div>

  <table className="admin-news-table">
    <thead>
      <tr>
        <th>Título</th>
        <th>Categoría</th>
        <th>Fecha</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody>
      {news.map(item => (
       <tr key={item._id}>
          <td>{item.title}</td>
          <td>{item.category}</td>
          <td>
          {new Date(item.createdAt).toLocaleDateString('es-AR')}
        </td>

          <td>
            <div className="admin-actions">
              <Link
                className="admin-edit"
                to={`/admin/noticias/editar/${item._id}`}
              >
                Editar
              </Link>

              <button
                className="admin-delete"
                onClick={() => handleDelete(item._id!)}
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

</div>
  )
}