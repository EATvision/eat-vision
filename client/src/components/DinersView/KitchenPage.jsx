import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useV1KitchenById } from 'hooks/kitchens'
import { t } from 'i18next'

function KitchenPage() {
  const { kitchenId } = useParams()
  const { i18n } = useTranslation()

  const { kitchen, isLoading, isError } = useV1KitchenById(kitchenId)

  React.useEffect(() => {
    if (kitchen) {
      i18n.changeLanguage(kitchen.locale)
    }
  }, [i18n, kitchen])

  if (isLoading) return <div>{t('loading')}</div>
  if (isError) return <div>ERROR</div>

  return (
    <div className="flex flex-col absolute h-full w-full overflow-hidden flex-1 ">
      <Outlet />
    </div>
  )
}

export default KitchenPage
