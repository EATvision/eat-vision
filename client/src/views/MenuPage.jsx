import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

function MenuPage() {
  const { menuId } = useParams()
  return (
    <div>

      <h2>
        MENU:
        {' '}
        {menuId}
      </h2>
      <Outlet />

    </div>
  )
}

export default MenuPage
