import { useTranslation } from 'react-i18next'
import React from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'

import MainFilterBtn from '../components/MainFilterBtn'
import DietsSelector from '../components/DietsSelector'

function FiltersPage({
  filters, setFilters, dishes, setDishes,
}) {
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [filterType, setFilterType] = React.useState(null)

  const handleClickFilterType = (type) => () => {
    setFilterType(type)
  }

  const handleClickDone = () => {
    setFilterType(null)
  }

  const handleClickBack = () => {
    setFilterType(null)
  }

  return (
    <div className="">
      <h1>{t('do_you_have_restrictions_etc')}</h1>
      <h2>{t('to_show_only_relevant_dishes')}</h2>
      <div className="w-1/2 flex flex-col mx-auto">
        <MainFilterBtn label={t('i_have_a_specific_diet')} onClick={handleClickFilterType('diets')} active={filters.diets.length > 0} />

        <MainFilterBtn label={t('i_try_to_avoid_or_reduce')} onClick={handleClickFilterType(<DietsSelector />)} />

        <MainFilterBtn label={t('im_allergic')} onClick={handleClickFilterType(<DietsSelector />)} />

        <MainFilterBtn label={t('i_simply_hate_eating')} onClick={handleClickFilterType(<DietsSelector />)} />

        <MainFilterBtn
          label={t('no_limitations')}
          onClick={() => {
            setDishes((currDishes) => ({ ...currDishes, filtered: currDishes.total }))
            navigate('../dishes')
          }}
        />

      </div>

      <div className="w-full bg-purple-500 text-white">

        <div>{t('dishes')}</div>
        <div>{`${dishes.filtered.length}/${dishes.total.length}`}</div>

        <button type="button" onClick={() => { navigate('../dishes') }}>{t('done')}</button>
      </div>

      <ReactModal isOpen={Boolean(filterType)} className="w-full h-full bg-white">
        <div className="flex flex-col h-full">
          <div className="p-4">
            {
              filterType === 'diets'
              && <DietsSelector filters={filters} setFilters={setFilters} />
            }
          </div>
          <div className="group flex flex-row mt-auto">
            <div className="w-6/12 cursor-pointer py-3 border bg-primary text-white text-center hover:opacity-90" onClick={handleClickDone}>{t('done')}</div>
            <div className="w-6/12 cursor-pointer py-3 border text-center" onClick={handleClickBack}>{t('back')}</div>
          </div>
        </div>
      </ReactModal>
    </div>
  )
}

export default FiltersPage
