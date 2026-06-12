import { useEffect, useState } from 'react'
import {
  getHashtags,
  createHashtag,
  deleteHashtag
} from '../../../services/contentService'
import { slugify } from '../../../shared/utils/slugify'
import './AdminForm.css'

type Hashtag = {
  _id: string
  name: string
  slug: string
}

export default function AdminHashtagsPage() {
  const [hashtags, setHashtags] = useState<Hashtag[]>([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadHashtags() {
    try {
      const data = await getHashtags()
      setHashtags(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHashtags()
  }, [])

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    if (!name.trim()) return

    try {
      await createHashtag({
        name: name.trim(),
        slug: slugify(name)
      })

      setName('')
      loadHashtags()
    } catch (error) {
      console.error(error)
      alert('Error creando hashtag')
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      '¿Eliminar hashtag?'
    )

    if (!confirmDelete) return

    try {
      await deleteHashtag(id)

      setHashtags(
        hashtags.filter(
          (hashtag) => hashtag._id !== id
        )
      )
    } catch (error) {
      console.error(error)
      alert('Error eliminando hashtag')
    }
  }

  return (
    <div className="admin-form-page">
      <h1>Hashtags</h1>

      <form
        onSubmit={handleSubmit}
        className="admin-form"
      >
        <input
          placeholder="Nombre del hashtag"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <button type="submit">
          Crear hashtag
        </button>
      </form>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="admin-list">
          {hashtags.map((hashtag) => (
            <div
              key={hashtag._id}
              className="section-preview"
            >
              <strong>
                #{hashtag.name}
              </strong>

              <p>
                slug: {hashtag.slug}
              </p>

              <button
                type="button"
                onClick={() =>
                  handleDelete(hashtag._id)
                }
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}