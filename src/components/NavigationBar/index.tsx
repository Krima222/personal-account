import { Link } from 'react-router-dom'

export function NavigationBar() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Мои объявления</Link>
          </li>
          <li>
            <Link to="/orders">Заказы</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
