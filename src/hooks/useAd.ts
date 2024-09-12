import { fetchAd } from '../api/fetchAd'
import { useRequest } from './useRequest'

export function useAd({ id }: { id: string }) {
  const requestAd = () => fetchAd(id)

  return useRequest(requestAd, [id])
}
