import { fetchAllOrders } from '../api/fetchAllOrders'

import { useRequest } from './useRequest'

export function useAllOrders() {
  const requestOrders = () => fetchAllOrders()

  return useRequest(requestOrders, [])
}
