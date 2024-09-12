import { Button, Input, Loader, Pagination, Select } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { TrashIcon } from '@radix-ui/react-icons'

import { useState } from 'react'

import { deleteAd } from '../../api/deleteAd'
import { Card } from '../../components/Card'
import { NewAd } from '../../components/Modal'
import { Search } from '../../components/Search'

import { useAd } from '../../hooks/useAd'
import { useAds } from '../../hooks/useAds'
import { useAllAds } from '../../hooks/useAllAds'
import { useMutation } from '../../hooks/useMutation'

import classes from './index.module.scss'

export function MainPage() {
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedItems, setSelectedItems] = useState('')
  const [value, setValue] = useState<string | null>('')

  const { data, refetch: refetchAds } = useAds({ page, limit, sort: value })
  const { data: adData, refetch: refetchAllAds } = useAllAds()
  const { data: searchData } = useAd({
    id: selectedItems ?? '',
  })

  const refetchAll = () => {
    refetchAds()
    refetchAllAds()
  }

  const { mutate } = useMutation(deleteAd, {
    onSuccess: () => {
      refetchAll()
      if (data && data.length === 1 && page > 1) {
        setPage(page - 1)
      }
    },
    onError: error => {
      console.error('Failed to delete ad:', error)
    },
  })

  const formattedData = [
    {
      value: '',
      label: 'без фильтра',
    },
    {
      value: 'price',
      label: 'цене',
    },
    {
      value: 'views',
      label: 'просмотрам',
    },
    {
      value: 'likes',
      label: 'лайкам',
    },
  ]

  const ads = data || []

  const deleteSelectedAd = (id: string) => {
    mutate(id)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSelectChange = (value: string | undefined) => {
    if (value) setSelectedItems(value)
  }

  if (!data) {
    return <Loader />
  }

  if (!adData) {
    return <Loader />
  }

  const total = Math.ceil(adData?.total / limit)

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <Button onClick={open}>Добавить объявление</Button>
          <Input
            value={limit}
            onChange={event =>
              setLimit(Number.parseInt(event.target.value, 10))
            }
            type="number"
          />
          <NewAd opened={opened} close={close} refetch={refetchAll} create />
          <Search data={adData?.ads} onChange={handleSelectChange} />
          <Select
            label="Отфильтровать по:"
            placeholder="Фильтрация"
            data={formattedData}
            value={value}
            onChange={setValue}
          />
        </div>
        <div className={classes.main}>
          {searchData ? (
            <Card
              id={searchData.id}
              name={searchData.name}
              price={searchData.price}
              views={searchData.views}
              likes={searchData.likes}
            />
          ) : null}
          <ul className={classes.ul}>
            {ads.map(ad => (
              <li key={ad.id}>
                <Button
                  onClick={() => deleteSelectedAd(ad.id)}
                  leftSection={<TrashIcon />}
                />
                <Card
                  id={ad.id}
                  imageUrl={ad.imageUrl}
                  name={ad.name}
                  price={ad.price}
                  views={ad.views}
                  likes={ad.likes}
                />
              </li>
            ))}
          </ul>
          <Pagination value={page} onChange={handlePageChange} total={total} />
        </div>
      </div>
    </>
  )
}
