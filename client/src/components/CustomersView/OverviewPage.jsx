import React from 'react'
import { useTranslation } from 'react-i18next'

function OverviewPage() {
  const { t } = useTranslation()

  return <div>{t('tabs.customers.overview')}</div>
}

export default OverviewPage
