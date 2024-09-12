import { useSearchParams } from 'react-router-dom'

export function useSearchParamChanger(key: string, defaultValue: string) {
  const [searchParams, setSearchParams] = useSearchParams()

  const onChange = (value: number) => {
    setSearchParams({ ...searchParams, [key]: value })
  }

  const value = searchParams.get(key) ?? defaultValue

  return { value, onChange }
}
