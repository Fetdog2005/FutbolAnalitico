import { useEffect, useState } from 'react'
import { createPrediction } from '../../../services/predictionService'
import {
  getCompetitions,
  getTeamsByCompetition
} from '../../../services/contentService'
import type { PredictionBlock } from '../../../shared/types/Prediction'
import { slugify } from '../../../shared/utils/slugify'
import './AdminForm.css'

type Competition = {
  _id: string
  name: string
}

type Team = {
  _id: string
  name: string
  logo: string
  competitionId: string
}

export default function CreatePredictionPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [teams, setTeams] = useState<Team[]>([])

  const [competitionId, setCompetitionId] = useState('')
  const [homeTeamId, setHomeTeamId] = useState('')
  const [awayTeamId, setAwayTeamId] = useState('')
  const [date, setDate] = useState('')

  const [homeProbability, setHomeProbability] = useState(50)
  const [drawProbability, setDrawProbability] = useState(25)
  const [awayProbability, setAwayProbability] = useState(25)

  const [blocks, setBlocks] = useState<PredictionBlock[]>([])

  const [blockTitle, setBlockTitle] = useState('')
  const [teamAValue, setTeamAValue] = useState(50)
  const [teamBValue, setTeamBValue] = useState(50)
  const [blockDescription, setBlockDescription] = useState('')

  useEffect(() => {
    loadCompetitions()
  }, [])

  async function loadCompetitions() {
    try {
      const data = await getCompetitions()
      setCompetitions(data)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCompetitionChange(id: string) {
    setCompetitionId(id)
    setHomeTeamId('')
    setAwayTeamId('')

    try {
      const data = await getTeamsByCompetition(id)
      setTeams(data)
    } catch (error) {
      console.error(error)
    }
  }

  function addBlock() {
    if (!blockTitle || !blockDescription) {
      alert('Completá título y descripción')
      return
    }

    if (teamAValue + teamBValue !== 100) {
      alert('Los valores deben sumar 100%')
      return
    }

    setBlocks([
      ...blocks,
      {
        title: blockTitle,
        teamAValue,
        teamBValue,
        description: blockDescription
      }
    ])

    setBlockTitle('')
    setTeamAValue(50)
    setTeamBValue(50)
    setBlockDescription('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const total = homeProbability + drawProbability + awayProbability

    if (total !== 100) {
      alert('Las probabilidades deben sumar 100%')
      return
    }

    const competition = competitions.find((c) => c._id === competitionId)
    const home = teams.find((t) => t._id === homeTeamId)
    const away = teams.find((t) => t._id === awayTeamId)

    if (!competition || !home || !away || !date) {
      alert('Completá todos los campos')
      return
    }

    const prediction = {
      slug: slugify(`${home.name} vs ${away.name}`),

      competition: competition.name,
      competitionId,

      homeTeam: home.name,
      awayTeam: away.name,

      homeTeamId,
      awayTeamId,

      homeLogo: home.logo,
      awayLogo: away.logo,

      date,

      homeProbability,
      drawProbability,
      awayProbability,

      blocks
    }

    try {
      await createPrediction(prediction)

      alert('Predicción creada')

      setCompetitionId('')
      setHomeTeamId('')
      setAwayTeamId('')
      setDate('')

      setBlocks([])

      setHomeProbability(50)
      setDrawProbability(25)
      setAwayProbability(25)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="admin-form-page">
      <h1>Crear Predicción</h1>

      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Competición

          <select
            value={competitionId}
            onChange={(e) => handleCompetitionChange(e.target.value)}
          >
            <option value="">Seleccionar competición</option>

            {competitions.map((competition) => (
              <option key={competition._id} value={competition._id}>
                {competition.name}
              </option>
            ))}
          </select>
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

          <select
            value={homeTeamId}
            onChange={(e) => setHomeTeamId(e.target.value)}
          >
            <option value="">Seleccionar equipo</option>

            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Equipo visitante

          <select
            value={awayTeamId}
            onChange={(e) => setAwayTeamId(e.target.value)}
          >
            <option value="">Seleccionar equipo</option>

            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>

        <h2>Probabilidades</h2>

        <input
          type="number"
          value={homeProbability}
          onChange={(e) => setHomeProbability(Number(e.target.value))}
        />

        <input
          type="number"
          value={drawProbability}
          onChange={(e) => setDrawProbability(Number(e.target.value))}
        />

        <input
          type="number"
          value={awayProbability}
          onChange={(e) => setAwayProbability(Number(e.target.value))}
        />

        <h2>Bloques Analíticos</h2>

        <input
          placeholder="Título"
          value={blockTitle}
          onChange={(e) => setBlockTitle(e.target.value)}
        />

        <input
          type="number"
          value={teamAValue}
          onChange={(e) => setTeamAValue(Number(e.target.value))}
        />

        <input
          type="number"
          value={teamBValue}
          onChange={(e) => setTeamBValue(Number(e.target.value))}
        />

        <textarea
          rows={4}
          value={blockDescription}
          onChange={(e) => setBlockDescription(e.target.value)}
        />

        <button type="button" onClick={addBlock}>
          Agregar bloque
        </button>

        <p>Bloques creados: {blocks.length}</p>

        <button type="submit">Crear predicción</button>
      </form>
    </div>
  )
}