import { postSearchDishes } from 'api/dishes'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

function MenuPage({ filters, setDishes }) {
  const { kitchenId, menuId } = useParams()

  React.useEffect(() => {
    const getRelevantDishes = async () => {
      const {
        totalDishes: updatedTotalDishes,
        filteredDishes: updatedFilteredDishes,
      } = await postSearchDishes(filters, { kitchenId, menuId })
      setDishes({ total: updatedTotalDishes, filtered: updatedFilteredDishes })
    }
    getRelevantDishes()
  }, [filters, kitchenId, menuId, setDishes])

  return <Outlet />
}

export default MenuPage
