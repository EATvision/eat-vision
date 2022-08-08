import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import MainBtn from '../components/MainBtn'

import { defaultFilters } from '../utils/filters'

function GreetingPage({ setFilters }) {
  const { t } = useTranslation()

  const handleClickSkipToFullMenu = () => {
    setFilters(defaultFilters)
  }

  return (
    <div>
      <Link
        className="group flex flex-col"
        to="filters"
      >
        <MainBtn label={t('lets_get_started')} variant="primary" />
      </Link>

      <Link
        className="group flex flex-col"
        to="dishes"
        onClick={handleClickSkipToFullMenu}
      >
        <MainBtn label={t('skip_to_full_menu')} />
      </Link>
    </div>
  )
}

export default GreetingPage
