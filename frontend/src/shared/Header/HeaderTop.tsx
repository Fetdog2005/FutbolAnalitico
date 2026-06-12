import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { loginAdmin } from '../../services/authService'

import './Header.css'

export default function HeaderTop() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [search, setSearch] = useState('')

  const showPassword = username.toLowerCase() === 'W4zn3'

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()

    if (!search.trim()) return

    navigate(`/buscar?q=${encodeURIComponent(search.trim())}`)
    setSearch('')
  }

  async function handleLogin() {
    try {
      const data = await loginAdmin(username, password)

      localStorage.setItem('adminToken', data.token)

      navigate('/admin')
    } catch (error) {
      alert('Credenciales incorrectas')
    }
  }

  return (
    <header className="header-top">
      <Link to="/" className="logo">
        Futbol<span>Analítico</span>
      </Link>

      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar noticias, equipos o jugadores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <div className="news-area admin-dropdown">
        <button
          className="news-btn"
          onClick={() => setOpen(true)}
        >
          📰
        </button>
      </div>

      {open && (
        <div className="admin-panel">
          <h4>Acceso</h4>

          <input
            placeholder="Nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {showPassword && (
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {showPassword && (
            <button onClick={handleLogin}>
              Entrar
            </button>
          )}
        </div>
      )}
    </header>
  )
}