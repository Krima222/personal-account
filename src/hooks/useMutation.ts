import { useCallback, useState } from 'react'

interface UseMutationOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
}

export function useMutation<T>(
  requestFunction: (...args: any[]) => Promise<T>,
  options?: UseMutationOptions<T>,
) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = useCallback(
    async (...args: any[]) => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await requestFunction(...args)
        setData(result)

        if (options?.onSuccess) {
          options.onSuccess(result)
        }
      } catch (err) {
        console.error('Error executing request:', err)
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)

        if (options?.onError) {
          options.onError(errorMessage)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [requestFunction, options],
  )

  return { mutate, data, isLoading, error }
}
