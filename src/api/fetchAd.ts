import type { Ad } from '../types/ads'

export async function fetchAd(id: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }

  if (!id) return

  const response = await fetch(
    `http://localhost:8000/advertisements/${id}`,
    options,
  )

  const data = await response.json()

  return data as Ad
}
