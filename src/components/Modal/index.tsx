import { Button, Input, Modal } from '@mantine/core'

import { useState } from 'react'
import { createAd } from '../../api/createAd'
import { putAd } from '../../api/putAd'

import { useMutation } from '../../hooks/useMutation'

interface IProps {
  id?: string
  create: boolean
  opened: boolean
  close: () => void
  refetch: () => void
}
export function NewAd({ id, create, opened, close, refetch }: IProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')

  const { mutate: createAdMutate } = useMutation(createAd, {
    onSuccess: () => {
      refetch()
      close()
    },
    onError: error => {
      console.error('Failed to create ad:', error)
    },
  })

  const { mutate: putAdMutate } = useMutation(putAd, {
    onSuccess: () => {
      refetch()
      close()
    },
    onError: error => {
      console.error('Failed to update ad:', error)
    },
  })

  const handleSubmit = async () => {
    if (create) {
      const id = crypto.randomUUID()
      createAdMutate({
        newId: id,
        name,
        price: Number(price),
        imageUrl,
        description,
      })
    } else if (id) {
      putAdMutate({
        id,
        name,
        price: Number(price),
        imageUrl,
        description,
      })
    }

    setName('')
    setPrice('')
    setImageUrl('')
    setDescription('')
    close()
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={create ? 'Создать объявление' : 'Изменить объявление'}
      >
        <Input
          placeholder="Текстовое поле для ввода URL"
          value={imageUrl}
          onChange={event => setImageUrl(event.target.value)}
        />
        <Input
          placeholder="Название"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <Input
          placeholder="Описание"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <Input
          placeholder="Стоимость"
          value={price}
          onChange={event => setPrice(event.target.value)}
          type="number"
        />
        <Button onClick={handleSubmit}>Добавить объявление</Button>
      </Modal>
    </>
  )
}
