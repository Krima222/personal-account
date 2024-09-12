interface IProps {
  id: string
  status: number
}

export async function patchOrder({ id, status }: IProps) {
  const response = await fetch(`http://localhost:8000/orders/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      status: status || 4,
    }),
  })

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`)
  }
}
