import { Button, Loader, Pagination, Select } from '@mantine/core'

import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'

import { useState } from 'react'
import { CardOrder } from '../../components/CardOrder'
import { useOrders } from '../../hooks/useOrders'

import classes from './index.module.scss'
import { useMutation } from '../../hooks/useMutation'
import { patchOrder } from '../../api/patchOrder'
import { useAllOrders } from '../../hooks/useAllOrders'

export function OrdersPage() {
  const [sortOrder, setSortOrder] = useState(false)
  const [page, setPage] = useState<number>(1)
  const { data: orderData } = useAllOrders()
  const [statusFilter, setStatusFilter] = useState<number | undefined>(
    undefined,
  )
  const { data, refetch } = useOrders({
    status: statusFilter,
    sort: sortOrder,
    start: page * 1 - 1,
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

  const handleSortOrder = () => {
    setSortOrder(!sortOrder)
  }

  const handleStatusChange = (value: string | null) => {
    setStatusFilter(value === '' ? undefined : Number(value))
  }

  const handleCompliteOrder = (id: string) => {
    mutate({ id, status: 4 })
  }

  const icon = sortOrder ? <ArrowUpIcon /> : <ArrowDownIcon />

  if (!orderData) {
    return <Loader />
  }

  const total = Math.ceil(orderData?.total / 1)

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

        <Button onClick={handleSortOrder} rightSection={icon}>
          Сортировать по сумме
        </Button>
      </div>

      <div>
        <ul>
          {data.map(order => (
            <li key={order.id}>
              <CardOrder order={order} onChange={handleCompliteOrder} />
            </li>
          ))}
        </ul>
      </div>
      <Pagination value={page} onChange={setPage} total={total} />
    </div>
  )
}
