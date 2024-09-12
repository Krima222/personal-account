interface IProps {
  id: string
  name?: string
  price?: number
  description?: string
  imageUrl?: string
}

export async function putAd({
  id,
  name,
  price,
  description,
  imageUrl,
}: IProps) {
  const dataToUpdate: Record<string, any> = {}

  if (name !== undefined && name !== '') {
    dataToUpdate.name = name
  }

  if (price !== undefined && price !== 0) {
    dataToUpdate.price = price
  }

  if (description !== undefined && description !== '') {
    dataToUpdate.description = description
  }

  if (imageUrl !== undefined && imageUrl !== '') {
    dataToUpdate.imageUrl = imageUrl
  }

  const response = await fetch(`http://localhost:8000/advertisements/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(dataToUpdate),
  })

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`)
  }
}
