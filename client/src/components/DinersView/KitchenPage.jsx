import React from 'react'
import { Outlet } from 'react-router-dom'

function KitchenPage() {
  return (
    <div className="flex flex-col absolute h-full w-full overflow-hidden flex-1 ">
      <Outlet />
    </div>
  )
}

export default KitchenPage
