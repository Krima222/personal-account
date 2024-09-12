export async function deleteAd(id: string) {
  const response = await fetch(`http://localhost:8000/advertisements/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to delete ad. Status: ${response.status}`)
  }
}
