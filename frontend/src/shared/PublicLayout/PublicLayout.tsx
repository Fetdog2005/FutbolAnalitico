import { Outlet } from 'react-router-dom'

import HeaderTop from '../Header/HeaderTop'
import HeaderBottom from '../Header/HeaderBottom'
import Footer from '../Footer/Footer'

export default function PublicLayout() {
  return (
    <>
      <HeaderTop />
      <HeaderBottom />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  )
}