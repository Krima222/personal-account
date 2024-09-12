import type { AdsResponse } from '../types/ads'

export async function fetchAds({
  page,
  limit,
  sort,
}: {
  page: number
  limit: number
  sort?: string | null
}) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }

  let query = `http://localhost:8000/advertisements?_page=${page}&_per_page=${limit}`

  if (sort) {
    query += `&_sort=${sort}&`
  }

  const response = await fetch(query, options)
  const data = await response.json()

  return data.data as AdsResponse
}
