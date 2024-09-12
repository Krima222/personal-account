import { fetchAllAds } from '../api/fetchAllAds'
import { useRequest } from './useRequest'

export function useAllAds() {
  const requestAds = () => fetchAllAds()

  return useRequest(requestAds, [])
}
