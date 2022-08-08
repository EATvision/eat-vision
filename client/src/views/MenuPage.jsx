import axios from 'axios'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

function MenuPage({ filters, setDishes }) {
  const { restaurantId, menuId } = useParams()

  React.useEffect(() => {
    const getRelevantDishes = async () => {
      const {
        data: { totalDishes: updatedTotalDishes, filteredDishes: updatedFilteredDishes },
      } = await axios.post(`/api/restaurants/${restaurantId}/menus/${menuId}/dishes/search`, filters)
      setDishes({ total: updatedTotalDishes, filtered: updatedFilteredDishes })
    }
    getRelevantDishes()
  }, [filters])

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
