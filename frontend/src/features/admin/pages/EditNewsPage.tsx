import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import {
  getNewsById,
  updateNews
} from '../../../services/newsService'

import { uploadImage } from '../../../services/uploadService'
import { slugify } from '../../../shared/utils/slugify'
import type { NewsSection } from '../../../shared/types/News'

import './AdminForm.css'

export default function EditNewsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

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

  useEffect(() => {
    loadNews()
  }, [])

  async function loadNews() {
    if (!id) return

    const article = await getNewsById(id)

    setTitle(article.title)
    setSubtitle(article.subtitle)
    setCategory(article.category)
    setImage(article.image)
    setHashtags(article.hashtags?.join(', ') || '')
    setSections(article.sections || [])
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const data = await uploadImage(file)
      setImage(data.url)
    } finally {
      setUploading(false)
    }
  }

  async function handleSectionImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const data = await uploadImage(file)
      setSectionImage(data.url)
    } finally {
      setUploading(false)
    }
  }

  function addSection() {
    if (sectionType === 'text' && !sectionContent) {
      alert('Agregá contenido al bloque')
      return
    }

    if (sectionType !== 'text' && !sectionImage) {
      alert('Agregá una imagen al bloque')
      return
    }

    if (sectionType === 'image-full') {
      setSections([...sections, { type: 'image-full', image: sectionImage }])
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

    const updatedNews = {
      slug: slugify(title),
      title,
      subtitle,
      category,
      image,
      hashtags: hashtags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      sections
    }

    await updateNews(id!, updatedNews)

    alert('Noticia actualizada')
    navigate('/admin/noticias')
  }

  return (
    <div className="admin-form-page">
      <h1>Editar noticia</h1>

      <form onSubmit={handleSubmit} className="admin-form">
        <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />

        <input placeholder="Subtítulo" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />

        <input placeholder="Categoría" value={category} onChange={(e) => setCategory(e.target.value)} />

        <input placeholder="Hashtags separados por coma" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />

        <label>Imagen principal</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {uploading && <p>Subiendo imagen...</p>}

        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ width: '180px', borderRadius: '10px' }}
          />
        )}

        <h2>Secciones de la noticia</h2>

        <select
          value={sectionType}
          onChange={(e) => setSectionType(e.target.value as NewsSection['type'])}
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
          <input type="file" accept="image/*" onChange={handleSectionImageUpload} />
        )}

        <button type="button" onClick={addSection}>
          Agregar sección
        </button>

        <p>Secciones creadas: {sections.length}</p>

        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #334155',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}
          >
            <strong>{section.type}</strong>

            {'content' in section && <p>{section.content}</p>}

            {'image' in section && section.image && (
              <img
                src={section.image}
                alt=""
                style={{
                  width: '150px',
                  marginTop: '10px',
                  borderRadius: '8px'
                }}
              />
            )}

            <button
              type="button"
              onClick={() =>
                setSections(sections.filter((_, i) => i !== index))
              }
            >
              Eliminar sección
            </button>
          </div>
        ))}

        <button type="submit">
          Guardar cambios
        </button>
      </form>
    </div>
  )
}