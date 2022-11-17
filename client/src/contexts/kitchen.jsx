import React from 'react'

const KitchenContext = React.createContext(null)

function KitchenProvider({ children }) {
  const [kitchenId, setKitchenId] = React.useState(
    localStorage.getItem('kitchenId')
  )

  const handleSetKitchenId = async (updatedValue) => {
    setKitchenId(updatedValue)
    localStorage.setItem('kitchenId', updatedValue)
  }

  const handleClearKitchenId = () => {
    setKitchenId(null)
    localStorage.removeItem('kitchenId')
  }

  const value = React.useMemo(
    () => ({
      kitchenId,
      onSetKitchenId: handleSetKitchenId,
      onClearKitchenId: handleClearKitchenId,
    }),
    [kitchenId, handleSetKitchenId, handleClearKitchenId]
  )

  return (
    <KitchenContext.Provider value={value}>{children}</KitchenContext.Provider>
  )
}

export const useKitchen = () => React.useContext(KitchenContext)

export default KitchenProvider
