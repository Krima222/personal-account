import { fetchAds } from '../api/fetchAds'
import { useRequest } from './useRequest'

export function useAds({
  page,
  limit,
  sort,
}: {
  page: number
  limit: number
  sort?: string | null
}) {
  const requestAds = () => fetchAds({ page, limit, sort })

  return useRequest(requestAds, [page, limit, sort])
}
