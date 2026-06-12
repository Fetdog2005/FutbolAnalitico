import { useState } from 'react'
import { createNews } from '../../../services/newsService'
import './AdminForm.css'
import { uploadImage } from '../../../services/uploadService'
import { slugify } from '../../../shared/utils/slugify'
import type { NewsSection } from '../../../shared/types/News'

export default function CreateNewsPage() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [uploading, setUploading] = useState(false)
  const [sections, setSections] = useState<NewsSection[]>([])
  const [sectionType, setSectionType] = useState<NewsSection['type']>('text')
  const [sectionContent, setSectionContent] = useState('')
  const [sectionImage, setSectionImage] = useState('')
  const [competition, setCompetition] = useState('')
  const [teams, setTeams] = useState<string[]>([])
  const [teamInput, setTeamInput] = useState('')

    async function handleImageUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0]

  if (!file) return

  try {
    setUploading(true)

    const data = await uploadImage(file)

    setImage(data.url)
  } catch (error) {
    console.error(error)
    alert('Error subiendo imagen')
  } finally {
    setUploading(false)
  }
}
function addSection() {
  if (sectionType === 'text' && !sectionContent) {
    alert('Agregá contenido al bloque')
    return
  }

  if (
    sectionType !== 'text' &&
    !sectionImage
  ) {
    alert('Agregá una imagen al bloque')
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

async function handleSectionImageUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0]

  if (!file) return

  try {
    setUploading(true)

    const data = await uploadImage(file)

    setSectionImage(data.url)
  } catch (error) {
    console.error(error)
    alert('Error subiendo imagen')
  } finally {
    setUploading(false)
  }
}

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    const news = {
 slug: slugify(title),

  title,
  subtitle,
  category,
  competition,
  image,

  hashtags: hashtags
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean),

  teams,

  sections
}

    try {
      const result =
        await createNews(news)

      console.log(result)

      alert('Noticia creada')
      setTitle('')
      setSubtitle('')
      setCategory('')
      setImage('')
      setHashtags('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="admin-form-page">
      <h1>Crear noticia</h1>

      <form onSubmit={handleSubmit} className="admin-form">

        <input
          placeholder="Título"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          placeholder="Subtítulo"
          value={subtitle}
          onChange={(e) =>
            setSubtitle(e.target.value)
          }
        />

        <input
          placeholder="Categoría"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />
        <input
          placeholder="Competencia (ej: Mundial, Champions)"
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
        />
        <input
            placeholder="Agregar equipo"
            value={teamInput}
            onChange={(e) => setTeamInput(e.target.value)}
          />

          <button
            type="button"
            onClick={() => {
              if (!teamInput.trim()) return

              setTeams([...teams, teamInput.trim()])
              setTeamInput('')
            }}
          >
            Agregar equipo
          </button>
        <input
        
          placeholder="Hashtags separados por coma"
          value={hashtags}
          onChange={(e) =>
            setHashtags(e.target.value)
          }
        />

          <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

{uploading && <p>Subiendo imagen...</p>}

{image && (
  <img
  src={image}
  alt="Preview"
  className="image-preview"
/>
)}
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
  <input
      type="file"
      accept="image/*"
      onChange={handleSectionImageUpload}
    />
)}

<button type="button" onClick={addSection}>
  Agregar sección
</button>

<p>Secciones creadas: {sections.length}</p>
{sections.map((section, index) => (
  <div
  key={index}
  className="section-preview"
>
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
          sections.filter(
            (_, i) => i !== index
          )
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