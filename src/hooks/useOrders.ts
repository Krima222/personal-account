import { fetchOrders } from '../api/fetchOrders'
import { useRequest } from './useRequest'

export function useOrders({
  sort,
  status,
}: {
  sort?: boolean
  status?: number
}) {
  const requestOrders = () => fetchOrders({ sort, status })

  return useRequest(requestOrders, [sort, status])
}
