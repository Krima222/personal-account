import { Select } from '@mantine/core'
import { useEffect, useState } from 'react'

import type { AdsResponse } from '../../types/ads'
import { useNavigate } from 'react-router-dom'

interface IProps {
  data: AdsResponse
  onChange: (value: string | undefined) => void
}

export function Search({ data, onChange }: IProps) {
  const [selectedValues, setSelectedValues] = useState<string | undefined>(
    undefined,
  )
  const navigate = useNavigate()

  useEffect(() => {
    onChange(selectedValues)
  }, [selectedValues, onChange])

  const handleChange = (value: string | null) => {
    if (value) {
      setSelectedValues(value)
      const selectedItem = data.find(item => item.id === value)
      if (selectedItem) {
        navigate(`/${selectedItem.id}`)
      }
    } else {
      setSelectedValues(undefined)
    }
  }

  const formattedData = data.map(item => ({
    value: item.id,
    label: item.name,
  }))

  return (
    <div>
      <Select
        placeholder="Pick value"
        data={formattedData}
        searchable
        nothingFoundMessage="Nothing found..."
        value={selectedValues}
        onChange={handleChange}
      />
    </div>
  )
}
