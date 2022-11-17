import React from 'react'
import { useParams } from 'react-router-dom'
import { useKitchenById } from './kitchens'

const RTL_LANGS = ['he-IL']

const defaultLang = navigator.language
const defaultIsRTL = RTL_LANGS.includes(defaultLang)

const useIsRTL = () => {
  const [isRTL, setIsRTL] = React.useState(defaultIsRTL)
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  React.useEffect(() => {
    if (kitchen?.locale) {
      setIsRTL(RTL_LANGS.includes(kitchen.locale))
    }
  }, [kitchen])

  return isRTL
}

export default useIsRTL
