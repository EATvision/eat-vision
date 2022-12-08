import React from 'react'

const dinerOrderContext = React.createContext()

export function ProvideDinerOrder({ children }) {
  const dinerUser = useProvideDinerOrder()
  return (
    <dinerOrderContext.Provider value={dinerUser}>
      {children}
    </dinerOrderContext.Provider>
  )
}

export const useDinerOrder = () => {
  return React.useContext(dinerOrderContext)
}

function useProvideDinerOrder() {
  const [order, setOrder] = React.useState([])

  const totalSum = React.useMemo(
    () =>
      order.reduce((acc, dish) => {
        return acc + Number(dish.price || 0)
      }, 0),
    [order]
  )

  return {
    totalSum,
    order,
    setOrder,
  }
}
