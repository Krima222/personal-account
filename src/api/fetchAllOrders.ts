export async function fetchAllOrders() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }
  const response = await fetch(`http://localhost:8000/orders?`, options)

  const data = await response.json()

  const total = data.length

  return { ads: data, total }
}
