import { useParams } from 'react-router-dom'
import { useV1KitchenById } from './kitchens'

export const useGetTranslatedLabel = () => {
  const { kitchenId } = useParams()

  const { kitchen } = useV1KitchenById(kitchenId)

  const getTranslatedLabel = (c) =>
    (kitchen?.locale === 'he-IL' ? c?.translation_heb : c?.name) || c?.name
  return getTranslatedLabel
}
