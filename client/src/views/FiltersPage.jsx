import { useTranslation } from 'react-i18next'
import axios from 'axios'
import React from 'react'
import ReactModal from 'react-modal'
import { useParams } from 'react-router-dom'

import MainBtn from '../components/MainBtn'
import DietsSelector from '../components/DietsSelector'

function FiltersPage({ filters, setFilters }) {
  const { restaurantId, menuId } = useParams()

  const { t } = useTranslation()

  const [filterType, setFilterType] = React.useState(null)
  const [totalDishes, setTotalDishes] = React.useState([])
  const [filteredDishes, setFilteredDishes] = React.useState([])

  React.useEffect(() => {
    const getRelevantDishes = async () => {
      const { data: { totalDishes: updatedTotalDishes, filteredDishes: updatedFilteredDishes } } = await axios.post(`/api/restaurants/${restaurantId}/menus/${menuId}/dishes/search`, filters)
      setTotalDishes(updatedTotalDishes)
      setFilteredDishes(updatedFilteredDishes)
    }
    getRelevantDishes()
  }, [filters])

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
        <MainBtn label={t('i_have_a_specific_diet')} onClick={handleClickFilterType('diets')} />

        <MainBtn label={t('i_try_to_avoid_or_reduce')} onClick={handleClickFilterType(<DietsSelector />)} />

        <MainBtn label={t('im_allergic')} onClick={handleClickFilterType(<DietsSelector />)} />

        <MainBtn label={t('i_simply_hate_eating')} onClick={handleClickFilterType(<DietsSelector />)} />

        <MainBtn label={t('no_limitations')} onClick={handleClickFilterType(<DietsSelector />)} />

      </div>

      <div className="w-full bg-purple-500 text-white">
        <div>{t('dishes')}</div>
        <div>{`${filteredDishes.length}/${totalDishes.length}`}</div>

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