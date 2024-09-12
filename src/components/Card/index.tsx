import { EyeOpenIcon, HeartIcon } from '@radix-ui/react-icons'
import { Link } from 'react-router-dom'

import Img from './6671192296.jpg'

import classes from './index.module.scss'

interface IProps {
  id: string
  imageUrl?: string
  name: string
  price: number
  views: number
  likes: number
}
export function Card({ id, imageUrl, name, price, views, likes }: IProps) {
  const linkStyle = {
    textDecoration: 'none',
  }

  return (
    <button className={classes.wrapper}>
      <div className={classes.block}>
        <div className={classes.img}>
          {imageUrl ? (
            <img src={imageUrl} alt="картинка товара"></img>
          ) : (
            <img src={Img} alt="image" />
          )}
        </div>
      </div>
      <div className={classes.block}>
        <Link key={id} to={`/${id}`} style={linkStyle}>
          <h3 className={classes.name}>{name}</h3>
        </Link>
        <p className={classes.price}>{price} ₽</p>
      </div>
      <div className={classes.block}>
        <div>Продал на Авито</div>
        <div>
          <div className={classes.item}>
            <EyeOpenIcon style={{ width: '24px', height: '24px' }} />
            <div>{views}</div>
          </div>
          <div className={classes.item}>
            <HeartIcon
              style={{ width: '24px', height: '24px', color: 'red' }}
            />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
