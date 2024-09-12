import { Chip } from '@mantine/core'
import { useState } from 'react'

interface IProps {
  id: string
  onChange: (id: string) => void
}

export function PickChip({ id, onChange }: IProps) {
  const [checked, setChecked] = useState(false)

  const handleStatusChecked = () => {
    setChecked(prevChecked => !prevChecked)
    onChange(id)
  }

  return (
    <>
      <Chip
        defaultChecked
        color="gray"
        variant="outline"
        size="xs"
        radius="sm"
        checked={checked}
        onChange={handleStatusChecked}
      >
        Завершить заказ
      </Chip>
    </>
  )
}
