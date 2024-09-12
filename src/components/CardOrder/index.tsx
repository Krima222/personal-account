import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { Card } from '../Card'
import { PickChip } from '../Chip'

import classes from './index.module.scss'

import type { Order } from '../../types/orders'

interface IProps {
  order: Order
  onChange: (id: string) => void
}

export function CardOrder({ order, onChange }: IProps) {
  const [opened, { open, close }] = useDisclosure(false)

  const getStatusText = (status: number): string => {
    switch (status) {
      case 0:
        return 'Ждет подтверждения'
      case 1:
        return 'Ждет отправки'
      case 2:
        return 'В пути'
      case 3:
        return 'Доставлен в пункт выдачи'
      case 4:
        return 'Завершён'
      default:
        return 'Неизвестный статус'
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.item}>
        <div>{getStatusText(order.status)}</div>
        {order.status !== 4 ? (
          <div className={classes.chip}>
            <PickChip id={order.id} onChange={onChange} />
          </div>
        ) : null}
      </div>
      <div className={classes.item}>
        <div>{order.total} ₽</div>
        <div>Колличество товаров: {order.items.length}</div>
        <div>Номер заказа: {order.id} </div>
        <div>
          Дата создания: {new Date(order.createdAt).toLocaleDateString()}
        </div>
      </div>

      <Button onClick={open} className={classes.item}>
        Показать все товары
      </Button>
      <Modal opened={opened} onClose={close} title="Все товары" size="auto">
        <div>
          {order.items.map(item => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              views={item.views}
              likes={item.likes}
            />
          ))}
        </div>
      </Modal>
    </div>
  )
}
