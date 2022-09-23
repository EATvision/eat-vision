import { useTranslation } from 'react-i18next'
import React from 'react'
import ReactModal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import {
  Box, Button, Typography, useTheme,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/CheckBoxOutlined'
import DietsSelector from '../components/DietsSelector'
import IngredientsSelector from '../components/IngredientsSelector'

function FiltersPage({
  filters, setFilters, dishes, setDishes,
}) {
  const navigate = useNavigate()
  const theme = useTheme()

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
    <>
      <Typography variant="h5" sx={{ margin: theme.spacing(3) }}>{t('do_you_have_restrictions_etc')}</Typography>

      <Box sx={{ margin: theme.spacing(3), display: 'flex', flexDirection: 'column' }}>
        <Button
          variant="outlined"
          endIcon={filters.diets.length > 0 && <CheckIcon />}
          onClick={handleClickFilterType('diets')}
          sx={{ marginTop: theme.spacing(2) }}
        >
          {t('i_have_a_specific_diet')}
        </Button>

        <Button
          variant="outlined"
          endIcon={filters.avoid.length > 0 && <CheckIcon />}
          onClick={handleClickFilterType('avoid')}
          sx={{ marginTop: theme.spacing(2) }}
        >
          {t('i_dont_eat_specific_foods')}
        </Button>
        {/*
        <Button
          label={t('no_limitations')}
          variant="text"
          onClick={() => {
            setDishes((currDishes) => ({ ...currDishes, filtered: currDishes.total }))
            navigate('../dishes')
          }}
          sx={{ marginTop: theme.spacing(2) }}
        >
          {t('no_limitations')}
        </Button> */}

      </Box>

      <Box sx={{ marginTop: 'auto', display: 'flex' }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => { navigate('../dishes') }}
        >
          {t('done')}
        </Button>
      </Box>

      <ReactModal isOpen={Boolean(filterType)} className="w-full h-full bg-white">
        <div className="flex flex-col h-full">
          <div className="p-4">
            {
              filterType === 'diets'
              && <DietsSelector filters={filters} setFilters={setFilters} />
            }

            {
              filterType === 'avoid'
              && <IngredientsSelector filters={filters} setFilters={setFilters} />
            }
          </div>

          <Box sx={{ marginTop: 'auto', display: 'flex', flexDirection: 'row' }}>
            <Button fullWidth variant="outlined" onClick={handleClickBack}>{t('back')}</Button>
            <Button fullWidth variant="contained" onClick={handleClickDone}>{t('done')}</Button>

          </Box>
        </div>
      </ReactModal>
    </>
  )
}

export default FiltersPage
