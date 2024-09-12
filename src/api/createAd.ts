interface IProps {
  newId: string
  name: string
  price: number
  description: string
  imageUrl: string
}

export async function createAd({
  newId,
  name,
  price,
  description,
  imageUrl,
}: IProps) {
  const response = await fetch('http://localhost:8000/advertisements', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      id: newId || 'sdklfjskdjl',
      imageUrl: imageUrl || '',
      name: name || 'Новый товар',
      price: price || 100,
      description: description || 'Без описания',
    }),
  })

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`)
  }
}
