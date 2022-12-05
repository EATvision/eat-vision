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

  return {
    order,
    setOrder,
  }
}
