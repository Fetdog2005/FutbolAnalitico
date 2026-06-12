import { useEffect, useState } from 'react'
import { createNews } from '../../../services/newsService'
import {
  getCategories,
  getHashtags,
  getMedia,
  searchMedia
} from '../../../services/contentService'
import './AdminForm.css'
import { slugify } from '../../../shared/utils/slugify'
import type { NewsSection } from '../../../shared/types/News'

type Category = {
  _id: string
  name: string
}

type Hashtag = {
  _id: string
  name: string
}

type Media = {
  _id: string
  url: string
  title?: string
  hashtag?: string
}

export default function CreateNewsPage() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState('')
  const [competition, setCompetition] = useState('')

  const [categories, setCategories] = useState<Category[]>([])
  const [hashtagOptions, setHashtagOptions] = useState<Hashtag[]>([])
  const [mediaOptions, setMediaOptions] = useState<Media[]>([])

  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])
  const [selectedImageHashtag, setSelectedImageHashtag] = useState('')

  const [image, setImage] = useState('')

  const [teams, setTeams] = useState<string[]>([])
  const [teamInput, setTeamInput] = useState('')

  const [sections, setSections] = useState<NewsSection[]>([])
  const [sectionType, setSectionType] = useState<NewsSection['type']>('text')
  const [sectionContent, setSectionContent] = useState('')
  const [sectionImage, setSectionImage] = useState('')

  useEffect(() => {
    loadContent()
  }, [])

  async function loadContent() {
    try {
      const [categoriesData, hashtagsData, mediaData] = await Promise.all([
        getCategories(),
        getHashtags(),
        getMedia()
      ])

      setCategories(categoriesData)
      setHashtagOptions(hashtagsData)
      setMediaOptions(mediaData)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleImageHashtagChange(hashtag: string) {
    setSelectedImageHashtag(hashtag)

    try {
      if (!hashtag) {
        const data = await getMedia()
        setMediaOptions(data)
        return
      }

      const data = await searchMedia(hashtag)
      setMediaOptions(data)
    } catch (error) {
      console.error(error)
    }
  }

  function toggleHashtag(hashtag: string) {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(
        selectedHashtags.filter((tag) => tag !== hashtag)
      )
      return
    }

    setSelectedHashtags([...selectedHashtags, hashtag])
  }

  function addTeam() {
    if (!teamInput.trim()) return

    setTeams([...teams, teamInput.trim()])
    setTeamInput('')
  }

  function addSection() {
    if (sectionType === 'text' && !sectionContent) {
      alert('Agregá contenido al bloque')
      return
    }

    if (sectionType !== 'text' && !sectionImage) {
      alert('Seleccioná una imagen para el bloque')
      return
    }

    if (sectionType === 'image-full') {
      setSections([
        ...sections,
        {
          type: 'image-full',
          image: sectionImage
        }
      ])
    } else {
      setSections([
        ...sections,
        {
          type: sectionType,
          content: sectionContent,
          image: sectionImage
        }
      ])
    }

    setSectionType('text')
    setSectionContent('')
    setSectionImage('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const news = {
      slug: slugify(title),

      title,
      subtitle,
      category,
      competition,
      image,

      hashtags: selectedHashtags,

      teams,

      sections
    }

    try {
      await createNews(news)

      alert('Noticia creada')

      setTitle('')
      setSubtitle('')
      setCategory('')
      setCompetition('')
      setImage('')
      setSelectedHashtags([])
      setTeams([])
      setSections([])
    } catch (error) {
      console.error(error)
      alert('Error creando noticia')
    }
  }

  return (
    <div className="admin-form-page">
      <h1>Crear noticia</h1>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Subtítulo"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <label>
          Categoría
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Seleccionar categoría</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <input
          placeholder="Competencia. Ej: Mundial, Champions"
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
        />

        <label>
          Filtrar imágenes por hashtag
          <select
            value={selectedImageHashtag}
            onChange={(e) => handleImageHashtagChange(e.target.value)}
          >
            <option value="">Todas las imágenes</option>

            {hashtagOptions.map((hashtag) => (
              <option key={hashtag._id} value={hashtag.name}>
                #{hashtag.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Imagen principal
          <select
            value={image}
            onChange={(e) => setImage(e.target.value)}
          >
            <option value="">Seleccionar imagen</option>

            {mediaOptions.map((media) => (
              <option key={media._id} value={media.url}>
                {media.title || media.url}
              </option>
            ))}
          </select>
        </label>

        {image && (
          <img
            src={image}
            alt="Preview"
            className="image-preview"
          />
        )}

        <h2>Hashtags</h2>

        {hashtagOptions.map((hashtag) => (
          <label key={hashtag._id}>
            <input
              type="checkbox"
              checked={selectedHashtags.includes(hashtag.name)}
              onChange={() => toggleHashtag(hashtag.name)}
            />
            #{hashtag.name}
          </label>
        ))}

        <h2>Equipos</h2>

        <input
          placeholder="Agregar equipo"
          value={teamInput}
          onChange={(e) => setTeamInput(e.target.value)}
        />

        <button type="button" onClick={addTeam}>
          Agregar equipo
        </button>

        {teams.map((team, index) => (
          <p key={`${team}-${index}`}>{team}</p>
        ))}

        <h2>Secciones de la noticia</h2>

        <select
          value={sectionType}
          onChange={(e) =>
            setSectionType(e.target.value as NewsSection['type'])
          }
        >
          <option value="text">Texto</option>
          <option value="image-left">Imagen izquierda</option>
          <option value="image-right">Imagen derecha</option>
          <option value="image-full">Imagen completa</option>
        </select>

        {sectionType !== 'image-full' && (
          <textarea
            placeholder="Contenido de la sección"
            value={sectionContent}
            onChange={(e) => setSectionContent(e.target.value)}
            rows={6}
          />
        )}

        {sectionType !== 'text' && (
          <>
            <select
              value={sectionImage}
              onChange={(e) => setSectionImage(e.target.value)}
            >
              <option value="">Seleccionar imagen de sección</option>

              {mediaOptions.map((media) => (
                <option key={media._id} value={media.url}>
                  {media.title || media.url}
                </option>
              ))}
            </select>

            {sectionImage && (
              <img
                src={sectionImage}
                alt=""
                className="section-image-preview"
              />
            )}
          </>
        )}

        <button type="button" onClick={addSection}>
          Agregar sección
        </button>

        <p>Secciones creadas: {sections.length}</p>

        {sections.map((section, index) => (
          <div key={index} className="section-preview">
            <strong>{section.type}</strong>

            {'content' in section && (
              <p>{section.content}</p>
            )}

            {'image' in section && section.image && (
              <img
                src={section.image}
                alt=""
                className="section-image-preview"
              />
            )}

            <button
              type="button"
              onClick={() =>
                setSections(
                  sections.filter((_, i) => i !== index)
                )
              }
            >
              Eliminar sección
            </button>
          </div>
        ))}

        <button type="submit">
          Crear noticia
        </button>
      </form>
    </div>
  )
}