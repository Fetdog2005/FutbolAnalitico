const API_URL = import.meta.env.VITE_API_URL

export async function loginAdmin(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  if (!response.ok) {
    throw new Error('Credenciales incorrectas')
  }

  return response.json()
}