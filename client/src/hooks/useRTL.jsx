import React from 'react'
import { useParams } from 'react-router-dom'
import { useV1KitchenById } from './kitchens'

const RTL_LANGS = ['he-IL']

const defaultLang = navigator.language
const defaultIsRTL = RTL_LANGS.includes(defaultLang)

const useIsRTL = () => {
  const [isRTL, setIsRTL] = React.useState(defaultIsRTL)
  const { kitchenId } = useParams()
  const { kitchen } = useV1KitchenById(kitchenId)

  React.useEffect(() => {
    if (kitchen?.locale) {
      setIsRTL(RTL_LANGS.includes(kitchen.locale))
    }
  }, [kitchen])

  document.body.dir = isRTL ? 'rtl' : 'ltr'

  return isRTL
}

export default useIsRTL
