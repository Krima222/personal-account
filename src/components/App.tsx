import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { MainPage } from '../pages/MainPage'
import { OrdersPage } from '../pages/OrdersPage'
import { SingleAdPage } from '../pages/SingleAdPage'

import clasess from './index.module.scss'

import { NavigationBar } from './NavigationBar'

export function App() {
  return (
    <Router>
      <div className={clasess.wrapper}>
        <div className={clasess.nav}>
          <NavigationBar />
        </div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:ad" element={<SingleAdPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </div>
    </Router>
  )
}
