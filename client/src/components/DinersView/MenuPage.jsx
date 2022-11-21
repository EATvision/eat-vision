import { postSearchDishes } from 'api/dishes'
import { useDinerUser } from 'contexts/diner'
import React from 'react'
import { Outlet, useParams } from 'react-router-dom'

function MenuPage({ setDishes }) {
  const { kitchenId, menuId } = useParams()
  const dinerUser = useDinerUser()

  React.useEffect(() => {
    const getRelevantDishes = async () => {
      const {
        totalDishes: updatedTotalDishes,
        filteredDishes: updatedFilteredDishes,
      } = await postSearchDishes(dinerUser.user.filters, { kitchenId, menuId })
      setDishes({ total: updatedTotalDishes, filtered: updatedFilteredDishes })
    }
    getRelevantDishes()
  }, [dinerUser.user.filters, kitchenId, menuId, setDishes])

  return <Outlet />
}

export default MenuPage
