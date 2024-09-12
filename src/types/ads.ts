export interface Ad {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
  views: number
  likes: number
}

export type AdsResponse = Ad[]
