import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useKitchenById } from 'hooks/kitchens'

const KitchenContext = React.createContext(null)

function KitchenProvider({ children }) {
  const { i18n } = useTranslation()

  const [kitchenId, setKitchenId] = React.useState(
    localStorage.getItem('kitchenId')
  )

  const { kitchen } = useKitchenById(kitchenId)

  React.useEffect(() => {
    if (kitchen) {
      i18n.changeLanguage(kitchen.locale)
    }
  }, [i18n, kitchen])

  const handleSetKitchenId = useCallback(async (updatedValue) => {
    setKitchenId(updatedValue)
    localStorage.setItem('kitchenId', updatedValue)
  }, [])

  const handleClearKitchenId = useCallback(() => {
    setKitchenId(null)
    localStorage.removeItem('kitchenId')
  }, [])

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
