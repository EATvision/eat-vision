import axios from 'axios'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

function MenuPage({ filters, setDishes }) {
  const { kitchenId, menuId } = useParams()

  React.useEffect(() => {
    const getRelevantDishes = async () => {
      const {
        data: {
          totalDishes: updatedTotalDishes,
          filteredDishes: updatedFilteredDishes,
        },
      } = await axios.post(
        `/api/kitchens/${kitchenId}/menus/${menuId}/dishes/search`,
        filters
      )
      setDishes({ total: updatedTotalDishes, filtered: updatedFilteredDishes })
    }
    getRelevantDishes()
  }, [filters, kitchenId, menuId, setDishes])

  return <Outlet />
}

export default MenuPage
