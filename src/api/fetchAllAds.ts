export async function fetchAllAds() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }
  const response = await fetch(`http://localhost:8000/advertisements?`, options)

  const data = await response.json()

  const total = data.length

  return { ads: data, total }
}
