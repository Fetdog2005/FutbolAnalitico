const API_URL = 'http://localhost:3000'

export async function uploadImage(file: File) {
  const formData = new FormData()

  formData.append('image', file)

  const response = await fetch(
    `${API_URL}/upload`,
    {
      method: 'POST',
      body: formData
    }
  )

  if (!response.ok) {
    throw new Error('Error subiendo imagen')
  }

  return response.json()
}