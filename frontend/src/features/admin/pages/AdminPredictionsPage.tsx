import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminNewsPage.css'
import { getPredictions, deletePrediction } from '../../../services/predictionService'
import type { Prediction } from '../../../shared/types/Prediction'

export default function AdminPredictionsPage() {

const [predictions, setPredictions] =
  useState<Prediction[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPredictions()
      .then(setPredictions)
      .catch(console.error)
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <h1>Cargando...</h1>
  }

  async function handleDelete(id: string) {
  const confirmDelete = window.confirm(
    '¿Eliminar predicción?'
  )

  if (!confirmDelete) return

  try {
    await deletePrediction(id)

    const data = await getPredictions()
    setPredictions(data)
  } catch (error) {
    console.error(error)
  }
}

  return (
    <div className="admin-news">

  <div className="admin-news-header">
    <h1>Administrar predicciones</h1>

    <Link
      to="/admin/predicciones/crear"
      className="admin-news-create"
    >
      Nueva predicción
    </Link>
  </div>

  <table className="admin-news-table">
    <thead>
      <tr>
        <th>Partido</th>
        <th>Competición</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody>
      {predictions.map(prediction => (
        <tr key={prediction._id}>
          <td>
            {prediction.homeTeam} vs {prediction.awayTeam}
          </td>

          <td>
            {prediction.competition}
          </td>

          <td>
            <div className="admin-actions">

              <Link
                className="admin-edit"
                to={`/admin/predicciones/editar/${prediction._id}`}
              >
                Editar
              </Link>

              <button
  className="admin-delete"
  onClick={() => handleDelete(prediction._id!)}
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