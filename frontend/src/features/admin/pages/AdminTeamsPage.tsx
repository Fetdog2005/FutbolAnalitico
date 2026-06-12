import { useEffect, useState } from 'react'
import {
  getCompetitions,
  getTeams,
  createTeam,
  deleteTeam
} from '../../../services/contentService'
import { uploadImage } from '../../../services/uploadService'
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

export default function AdminTeamsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [teams, setTeams] = useState<Team[]>([])

  const [name, setName] = useState('')
  const [logo, setLogo] = useState('')
  const [competitionId, setCompetitionId] = useState('')

  const [uploading, setUploading] = useState(false)

  async function loadData() {
    try {
      const [competitionsData, teamsData] =
        await Promise.all([
          getCompetitions(),
          getTeams()
        ])

      setCompetitions(competitionsData)
      setTeams(teamsData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  async function handleLogoUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setUploading(true)

      const data = await uploadImage(file)

      setLogo(data.url)
    } catch (error) {
      console.error(error)
      alert('Error subiendo logo')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    if (!name.trim()) {
      alert('Ingresá un nombre')
      return
    }

    if (!competitionId) {
      alert('Seleccioná una competición')
      return
    }

    try {
      await createTeam({
        name: name.trim(),
        slug: slugify(name),
        logo,
        competitionId
      })

      setName('')
      setLogo('')
      setCompetitionId('')

      loadData()
    } catch (error) {
      console.error(error)
      alert('Error creando equipo')
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      '¿Eliminar equipo?'
    )

    if (!confirmDelete) return

    try {
      await deleteTeam(id)

      setTeams(
        teams.filter(
          (team) => team._id !== id
        )
      )
    } catch (error) {
      console.error(error)
      alert('Error eliminando equipo')
    }
  }

  function getCompetitionName(
    competitionId: string
  ) {
    const competition = competitions.find(
      (item) => item._id === competitionId
    )

    return competition?.name || '-'
  }

  return (
    <div className="admin-form-page">
      <h1>Equipos</h1>

      <form
        onSubmit={handleSubmit}
        className="admin-form"
      >
        <input
          placeholder="Nombre del equipo"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <select
          value={competitionId}
          onChange={(e) =>
            setCompetitionId(e.target.value)
          }
        >
          <option value="">
            Seleccionar competición
          </option>

          {competitions.map(
            (competition) => (
              <option
                key={competition._id}
                value={competition._id}
              >
                {competition.name}
              </option>
            )
          )}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
        />

        {uploading && (
          <p>Subiendo logo...</p>
        )}

        {logo && (
          <img
            src={logo}
            alt=""
            className="competition-logo-preview"
          />
        )}

        <button type="submit">
          Crear equipo
        </button>
      </form>

      <div className="admin-list">
        {teams.map((team) => (
          <div
            key={team._id}
            className="section-preview"
          >
            {team.logo && (
              <img
                src={team.logo}
                alt=""
                className="competition-logo-preview"
              />
            )}

            <strong>{team.name}</strong>

            <p>
              {getCompetitionName(
                team.competitionId
              )}
            </p>

            <button
              type="button"
              onClick={() =>
                handleDelete(team._id)
              }
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}