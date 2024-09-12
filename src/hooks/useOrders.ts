import { fetchOrders } from '../api/fetchOrders'
import { useRequest } from './useRequest'

export function useOrders({
  sort,
  status,
  start,
}: {
  sort?: boolean
  status?: number
  start?: number
}) {
  const requestOrders = () => fetchOrders({ sort, status, start })

  return useRequest(requestOrders, [sort, status, start])
}
