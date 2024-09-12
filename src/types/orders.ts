// элемент заказа
export interface OrderItem {
  id: string
  name: string
  price: number
  createdAt: string
  views: number
  likes: number
  imageUrl: string
  count: number
  description?: string
}

// заказ
export interface Order {
  id: string
  status: number
  createdAt: string
  finishedAt: string
  total: number
  deliveryWay: 'mail' | 'sdek'
  items: OrderItem[]
}

export type Orders = Order[]
