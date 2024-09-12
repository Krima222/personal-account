import type { Orders } from '../types/orders'

export async function fetchOrders({
  sort,
  status,
}: {
  sort?: boolean
  status?: number
}) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }

  let query = 'http://localhost:8000/orders?'

  if (sort) {
    query += `_sort=price&`
  }

  if (status !== undefined) {
    query += `status=${status}`
  }

  const response = await fetch(query, options)
  const data = await response.json()

  return data as Orders
}
