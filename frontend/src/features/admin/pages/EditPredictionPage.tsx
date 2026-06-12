import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type {
  PredictionBlock,
  PredictionBlockItem
} from '../../../shared/types/Prediction'
import { slugify } from '../../../shared/utils/slugify'
import './AdminForm.css'

import {
  getPredictionById,
  updatePrediction
} from '../../../services/predictionService'

export default function EditPredictionPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [competition, setCompetition] = useState('')
  const [date, setDate] = useState('')
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')

  const [homeProbability, setHomeProbability] = useState(50)
  const [drawProbability, setDrawProbability] = useState(25)
  const [awayProbability, setAwayProbability] = useState(25)

  const [blocks, setBlocks] = useState<PredictionBlock[]>([])

  const [blockTitle, setBlockTitle] = useState('')
  const [items, setItems] = useState<PredictionBlockItem[]>([])

  const [itemLabel, setItemLabel] = useState('')
  const [itemValue, setItemValue] = useState('')

  useEffect(() => {
    loadPrediction()
  }, [])

  async function loadPrediction() {
    try {
      if (!id) return

      const prediction = await getPredictionById(id)

      setCompetition(prediction.competition || '')
      setDate(prediction.date || '')
      setHomeTeam(prediction.homeTeam || '')
      setAwayTeam(prediction.awayTeam || '')

      setHomeProbability(prediction.homeProbability || 50)
      setDrawProbability(prediction.drawProbability || 25)
      setAwayProbability(prediction.awayProbability || 25)

      setBlocks(prediction.blocks || [])
    } catch (error) {
      console.error(error)
    }
  }

  function addItem() {
    if (!itemLabel || !itemValue) {
      alert('Completá dato y valor')
      return
    }

    setItems([
      ...items,
      {
        label: itemLabel,
        value: itemValue
      }
    ])

    setItemLabel('')
    setItemValue('')
  }

  function addBlock() {
    if (!blockTitle) {
      alert('Completá el título del bloque')
      return
    }

    if (items.length === 0) {
      alert('Agregá al menos un dato')
      return
    }

    setBlocks([
      ...blocks,
      {
        title: blockTitle,
        items
      }
    ])

    setBlockTitle('')
    setItems([])
    setItemLabel('')
    setItemValue('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const total =
      homeProbability +
      drawProbability +
      awayProbability

    if (total !== 100) {
      alert('Las probabilidades deben sumar 100%')
      return
    }

    if (!competition || !date || !homeTeam || !awayTeam) {
      alert('Completá todos los campos')
      return
    }

    const updatedPrediction = {
      competition,
      date,

      homeTeam,
      awayTeam,

      homeProbability,
      drawProbability,
      awayProbability,

      blocks,

      slug: slugify(`${homeTeam} vs ${awayTeam}`)
    }

    try {
      await updatePrediction(id!, updatedPrediction)

      alert('Predicción actualizada')

      navigate('/admin/predicciones')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="admin-form-page">
      <h1>Editar predicción</h1>

      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Competición
          <input
            value={competition}
            onChange={(e) => setCompetition(e.target.value)}
          />
        </label>

        <label>
          Fecha
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Equipo local
          <input
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
          />
        </label>

        <label>
          Equipo visitante
          <input
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
          />
        </label>

        <h2>Probabilidades</h2>

        <label>
          Local %
          <input
            type="number"
            value={homeProbability}
            onChange={(e) =>
              setHomeProbability(Number(e.target.value))
            }
          />
        </label>

        <label>
          Empate %
          <input
            type="number"
            value={drawProbability}
            onChange={(e) =>
              setDrawProbability(Number(e.target.value))
            }
          />
        </label>

        <label>
          Visitante %
          <input
            type="number"
            value={awayProbability}
            onChange={(e) =>
              setAwayProbability(Number(e.target.value))
            }
          />
        </label>

        <h2>Bloques de datos</h2>

        <label>
          Título del bloque
          <input
            placeholder="Ej: Estadísticas esperadas"
            value={blockTitle}
            onChange={(e) => setBlockTitle(e.target.value)}
          />
        </label>

        <label>
          Dato
          <input
            placeholder="Ej: Goles"
            value={itemLabel}
            onChange={(e) => setItemLabel(e.target.value)}
          />
        </label>

        <label>
          Valor
          <input
            placeholder="Ej: 3.4"
            value={itemValue}
            onChange={(e) => setItemValue(e.target.value)}
          />
        </label>

        <button type="button" onClick={addItem}>
          Agregar dato
        </button>

        <p>Datos en este bloque: {items.length}</p>

        {items.map((item, index) => (
          <p key={`${item.label}-${index}`}>
            {item.label}: {item.value}
          </p>
        ))}

        <button type="button" onClick={addBlock}>
          Agregar bloque
        </button>

        {blocks.length === 0 ? (
          <p>No hay bloques cargados.</p>
        ) : (
          blocks.map((block, index) => (
            <div
              key={`${block.title}-${index}`}
              style={{
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
              }}
            >
              <strong>{block.title}</strong>

              {block.items.map((item, itemIndex) => (
                <p key={`${item.label}-${itemIndex}`}>
                  {item.label}: {item.value}
                </p>
              ))}

              <button
                type="button"
                onClick={() =>
                  setBlocks(
                    blocks.filter((_, i) => i !== index)
                  )
                }
              >
                Eliminar bloque
              </button>
            </div>
          ))
        )}

        <button type="submit">
          Guardar cambios
        </button>
      </form>
    </div>
  )
}