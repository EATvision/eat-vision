import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useKitchenById } from '../../hooks/kitchens'

function KitchenPage() {
  const { kitchenId } = useParams()
  const { i18n } = useTranslation()

  const { kitchen, isLoading, isError } = useKitchenById(kitchenId)

  React.useEffect(() => {
    if (kitchen) {
      i18n.changeLanguage(kitchen.locale)
    }
  }, [kitchen])

  if (isLoading) return <div>LOADING</div>
  if (isError) return <div>ERROR</div>

  return (
    <div className="flex flex-col absolute h-full w-full overflow-hidden flex-1 ">

      <Outlet />

    </div>
  )
}

export default KitchenPage
