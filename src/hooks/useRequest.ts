import { useCallback, useEffect, useState } from 'react'

export function useRequest<T>(
  requestFunction: () => Promise<T>,
  keys: unknown[],
) {
  const [data, setData] = useState<T>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await requestFunction()
      setData(result)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [requestFunction])

  useEffect(() => {
    fetchData()
  }, keys)

  return { data, isLoading, error, refetch: fetchData }
}
