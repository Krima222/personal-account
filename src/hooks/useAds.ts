import { fetchAds } from '../api/fetchAds'
import { useRequest } from './useRequest'

export function useAds(page: number, limit: number) {
  const requestAds = () => fetchAds(page, limit)

  return useRequest(requestAds, [page, limit])
}
