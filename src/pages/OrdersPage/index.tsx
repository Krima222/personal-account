import { Button, Loader, Select } from '@mantine/core'

import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'

import { useState } from 'react'
import { CardOrder } from '../../components/CardOrder'
import { useOrders } from '../../hooks/useOrders'

import classes from './index.module.scss'
import { useMutation } from '../../hooks/useMutation'
import { patchOrder } from '../../api/patchOrder'

export function OrdersPage() {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [statusFilter, setStatusFilter] = useState<number | undefined>(
    undefined,
  )
  const { data, refetch } = useOrders({
    status: statusFilter,
  })

  const { mutate } = useMutation(patchOrder, {
    onSuccess: () => {
      refetch()
    },
    onError: error => {
      console.error('Failed to delete ad:', error)
    },
  })

  if (!data) {
    return <Loader />
  }

  const sortedOrders = [...data].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.total - b.total
    } else {
      return b.total - a.total
    }
  })

  const handleStatusChange = (value: string | null) => {
    setStatusFilter(value === '' ? undefined : Number(value))
  }

  const handleCompliteOrder = (id: string) => {
    mutate({ id, status: 4 })
  }

  const icon = sortOrder === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.h1}>Заказы</h1>
      <div className={classes.block}>
        <div>
          <Select
            placeholder="Статус"
            onChange={handleStatusChange}
            data={[
              { value: '', label: 'Все' },
              { value: '0', label: 'Ждут подтверждения' },
              { value: '1', label: 'Ждут отправки' },
              { value: '2', label: 'В пути' },
              { value: '3', label: 'Доставлен в пункт выдачи' },
              { value: '4', label: 'Завершён' },
            ]}
          />
        </div>

        <Button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          rightSection={icon}
        >
          Сортировать по сумме
        </Button>
      </div>

      <div>
        <ul>
          {sortedOrders.map(order => (
            <li key={order.id}>
              <CardOrder order={order} onChange={handleCompliteOrder} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
