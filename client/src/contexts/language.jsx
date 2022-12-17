import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useV1KitchenById } from 'hooks/kitchens'
import { useParams } from 'react-router-dom'

const LanguageContext = React.createContext(null)
const DEFAULT_LANGUAGE = 'en-US'

function LanguageProvider({ children }) {
  const { i18n } = useTranslation()
  const { kitchenId } = useParams()
  const [language, setLanguage] = React.useState(DEFAULT_LANGUAGE)

  const { kitchen } = useV1KitchenById(kitchenId)

  React.useEffect(() => {
    if (kitchen) {
      i18n.changeLanguage(kitchen.locale)
      setLanguage(kitchen.locale)
      localStorage.setItem('locale', kitchen.locale)
    }
  }, [i18n, kitchen])

  const handleSetLanguage = useCallback(
    async (updatedValue) => {
      i18n.changeLanguage(updatedValue)
      setLanguage(updatedValue)
      localStorage.setItem('language', updatedValue)
    },
    [i18n]
  )

  const handleResetLanguage = useCallback(() => {
    setLanguage(DEFAULT_LANGUAGE)
    i18n.changeLanguage(DEFAULT_LANGUAGE)
    localStorage.setItem('language', DEFAULT_LANGUAGE)
  }, [i18n])

  const value = React.useMemo(
    () => ({
      language,
      onSetLanguage: handleSetLanguage,
      onResetLanguage: handleResetLanguage,
    }),
    [language, handleSetLanguage, handleResetLanguage]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => React.useContext(LanguageContext)

export default LanguageProvider
