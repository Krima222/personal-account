import { useEffect, useState } from 'react'

export function useDebouncedValue(value: string, milliSecond: number) {
  const [debouncedValue, setDebounsedValue] = useState(value)

  useEffect(() => {
    const hendler = setTimeout(() => {
      setDebounsedValue(value)
    }, milliSecond)

    return () => {
      clearTimeout(hendler)
    }
  }, [value, milliSecond])

  return debouncedValue
}
