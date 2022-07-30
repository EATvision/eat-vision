import { useTranslation } from 'react-i18next'
import React from 'react'
import MainBtn from '../components/MainBtn'

function FiltersPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('do_you_have_restrictions_etc')}</h1>
      <h2>{t('to_show_only_relevant_dishes')}</h2>
      <div>
        <MainBtn label={t('i_have_a_specific_diet')} onClick={() => {}} />

        <MainBtn label={t('i_try_to_avoid_or_reduce')} onClick={() => {}} />

        <MainBtn label={t('im_allergic')} onClick={() => {}} />

        <MainBtn label={t('i_simply_hate_eating')} onClick={() => {}} />

        <MainBtn label={t('no_limitations')} onClick={() => {}} />

      </div>
    </div>
  )
}

export default FiltersPage
