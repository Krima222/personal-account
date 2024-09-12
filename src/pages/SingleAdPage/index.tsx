import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { EyeOpenIcon, HeartIcon, Pencil2Icon } from '@radix-ui/react-icons'

import { useParams } from 'react-router-dom'
import { NewAd } from '../../components/Modal'
import { useAd } from '../../hooks/useAd'

import Img from './6671192296.jpg'
import classes from './index.module.scss'

export function SingleAdPage() {
  const [opened, { open, close }] = useDisclosure(false)

  const { ad } = useParams<{ ad: string }>()

  const { data: adData, refetch } = useAd({
    id: ad ?? '',
  })

  return (
    <div className={classes.wrapper}>
      <div className={classes.modal}>
        <Button onClick={open} rightSection={<Pencil2Icon />}>
          Редактировать объявление
        </Button>
        <NewAd
          opened={opened}
          close={close}
          create={false}
          id={ad}
          refetch={refetch}
        />
      </div>
      <div className={classes.container}>
        <h1 className={classes.h1}>{adData?.name}</h1>
        <div className={classes.h1}>{adData?.price} ₽</div>
      </div>
      <div className={classes.container}>
        <div className={classes.img}>
          {adData?.imageUrl ? (
            <img src={adData.imageUrl} alt="картинка товара"></img>
          ) : (
            <img src={Img} alt="image" />
          )}
        </div>
        <div className={classes.block}>
          <div>
            <span>Описание товара: </span>
            <span>{adData?.description}</span>
          </div>
          <div className={classes.item}>
            <div className={classes.item}>
              <EyeOpenIcon style={{ width: '24px', height: '24px' }} />
              <div>{adData?.views}</div>
            </div>
            <div className={classes.item}>
              <HeartIcon
                style={{ width: '24px', height: '24px', color: 'red' }}
              />
              <div>{adData?.likes}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
