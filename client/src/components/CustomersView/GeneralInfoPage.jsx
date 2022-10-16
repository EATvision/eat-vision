import React from 'react'
import { useTranslation } from 'react-i18next'
import { useKitchen } from '../../contexts/kitchen'
import { useKitchenById } from '../../hooks/kitchens'

function GeneralInfoPage() {
  const { i18n } = useTranslation()
  const { kitchenId } = useKitchen()
  const { kitchen, isLoading } = useKitchenById(kitchenId)

  if (isLoading) return <div>LOADING</div>

  return (
    <div>
      General Info

      kitchen name:
      {' '}
      {kitchen.name}

      website:
      {' '}
      {kitchen.website}

    </div>
  )
}

export default GeneralInfoPage
