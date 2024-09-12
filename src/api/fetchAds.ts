import type { AdsResponse } from '../types/ads'

export async function fetchAds(page: number, limit: number) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }
  const response = await fetch(
    `http://localhost:8000/advertisements?_page=${page}&_per_page=${limit}`,
    options,
  )
  const data = await response.json()

  return data.data as AdsResponse
}
