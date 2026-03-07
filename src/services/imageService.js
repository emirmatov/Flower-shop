import axios from 'axios'

const IMGBB_API_KEY = '1a342bced8f6d7302620cfd6ff827adf'

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('image', file)

  const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData)

  return response.data.data.url
}
