import type { Orders } from '../types/orders'

export async function fetchOrders({
  sort,
  status,
  start,
}: {
  sort?: boolean
  status?: number
  start?: number
}) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }

  let query = `http://localhost:8000/orders?_start=${start}&_limit=1&`

  if (sort) {
    query += `_sort=total&`
  }

  if (status !== undefined) {
    query += `status=${status}`
  }

  const response = await fetch(query, options)
  const data = await response.json()

  return data as Orders
}
