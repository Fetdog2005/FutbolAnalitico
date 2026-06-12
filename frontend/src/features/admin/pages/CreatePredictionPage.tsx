import { useState } from 'react'
import { createPrediction } from '../../../services/predictionService'
import type { PredictionBlock } from '../../../shared/types/Prediction'
import { slugify } from '../../../shared/utils/slugify'
import { uploadImage } from '../../../services/uploadService'
import './AdminForm.css'

export default function CreatePredictionPage() {
  const [competition, setCompetition] =
    useState('')

  const [date, setDate] =
    useState('')

  const [homeTeam, setHomeTeam] =
    useState('')

  const [awayTeam, setAwayTeam] =
    useState('')

  const [homeLogo, setHomeLogo] = useState('')

  const [awayLogo, setAwayLogo] = useState('')

  const [homeProbability, setHomeProbability] =
    useState(50)

  const [drawProbability, setDrawProbability] =
    useState(25)

  const [awayProbability, setAwayProbability] =
    useState(25)

  const [blocks, setBlocks] = useState<PredictionBlock[]>([])

  const [blockTitle, setBlockTitle] =
    useState('')

  const [teamAValue, setTeamAValue] =
    useState(50)

  const [teamBValue, setTeamBValue] =
    useState(50)

  const [blockDescription, setBlockDescription] =
    useState('')

  function addBlock() {
    if (!blockTitle || !blockDescription) {
  alert('Completá el título y la descripción del bloque')
  return
}

if (teamAValue + teamBValue !== 100) {
  alert('Los valores del bloque deben sumar 100%')
  
  return
}
    const newBlock = {
      title: blockTitle,
      teamAValue,
      teamBValue,
      description: blockDescription
    }

    setBlocks([
      ...blocks,
      newBlock
    ])
    
    setBlockTitle('')
    setTeamAValue(50)
    setTeamBValue(50)
    setBlockDescription('')
  }
async function handleHomeLogoUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0]

  if (!file) return

  const data = await uploadImage(file)

  setHomeLogo(data.url)
}

async function handleAwayLogoUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0]

  if (!file) return

  const data = await uploadImage(file)

  setAwayLogo(data.url)
}

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    const total =
      homeProbability +
      drawProbability +
      awayProbability

    if (total !== 100) {
      alert(
        'Las probabilidades deben sumar 100%'
      )
      return
    }
    if (!competition || !homeTeam || !awayTeam || !date) {
    alert('Completá todos los campos')
    return
}
    const prediction = {
      slug: slugify(`${homeTeam} vs ${awayTeam}`),

      competition,
      date,
      homeLogo,
      awayLogo,
      homeTeam,
      awayTeam,

      homeProbability,
      drawProbability,
      awayProbability,

      blocks
    }

    try {
      await createPrediction(
        prediction
      )

      alert(
        'Predicción creada'
      )
      setCompetition('')
      setDate('')
      setHomeTeam('')
      setAwayTeam('')
      setHomeLogo('')
      setAwayLogo('')
      setHomeProbability(50)
      setDrawProbability(25)
      setAwayProbability(25)
      setBlocks([])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="admin-form-page">

      <h1>Crear Predicción</h1>

      <form
        onSubmit={handleSubmit}
        className="admin-form"
      >

        <label>
          Competición
          <input
            value={competition}
            onChange={(e) =>
              setCompetition(
                e.target.value
              )
            }
          />
        </label>

        <label>
          Fecha
          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
          />
        </label>

        <label>
          Equipo local
          <input
  value={homeTeam}
  onChange={(e) => setHomeTeam(e.target.value)}
/>

<input
  type="file"
  accept="image/*"
  onChange={handleHomeLogoUpload}
/>

{homeLogo && (
  <img
    src={homeLogo}
    alt=""
    style={{
      width: '60px',
      borderRadius: '50%'
    }}
  />
)}
        </label>

        <label>
          Equipo visitante
          <input
  value={awayTeam}
  onChange={(e) => setAwayTeam(e.target.value)}
/>

<input
  type="file"
  accept="image/*"
  onChange={handleAwayLogoUpload}
/>

{awayLogo && (
  <img
    src={awayLogo}
    alt=""
    style={{
      width: '60px',
      borderRadius: '50%'
    }}
  />
)}
        </label>

        <h2>Probabilidades</h2>

        <label>
          Local %
          <input
            type="number"
            value={homeProbability}
            onChange={(e) =>
              setHomeProbability(
                Number(e.target.value)
              )
            }
          />
        </label>

        <label>
          Empate %
          <input
            type="number"
            value={drawProbability}
            onChange={(e) =>
              setDrawProbability(
                Number(e.target.value)
              )
            }
          />
        </label>

        <label>
          Visitante %
          <input
            type="number"
            value={awayProbability}
            onChange={(e) =>
              setAwayProbability(
                Number(e.target.value)
              )
            }
          />
        </label>

        <h2>Bloques Analíticos</h2>

        <label>
          Título
          <input
            value={blockTitle}
            onChange={(e) =>
              setBlockTitle(
                e.target.value
              )
            }
          />
        </label>

        <label>
          Valor Local
          <input
            type="number"
            value={teamAValue}
            onChange={(e) =>
              setTeamAValue(
                Number(e.target.value)
              )
            }
          />
        </label>

        <label>
          Valor Visitante
          <input
            type="number"
            value={teamBValue}
            onChange={(e) =>
              setTeamBValue(
                Number(e.target.value)
              )
            }
          />
        </label>

        <label>
          Descripción
          <textarea
            rows={4}
            value={blockDescription}
            onChange={(e) =>
              setBlockDescription(
                e.target.value
              )
            }
          />
        </label>

        <button
          type="button"
          onClick={addBlock}
        >
          Agregar bloque
        </button>

        <p>
          Bloques creados:
          {' '}
          {blocks.length}
        </p>

        <button type="submit">
          Crear predicción
        </button>

      </form>

    </div>
  )
}