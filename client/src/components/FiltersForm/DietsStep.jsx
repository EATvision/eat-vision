import React from 'react'
import {
  Divider,
  ToggleButton, ToggleButtonGroup, Typography, useTheme,
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import { useDiets } from '../../hooks/diets'

function DietsSelector({ filters, setFilters }) {
  const theme = useTheme()
  const { t } = useTranslation()

  const { diets, isLoading } = useDiets()

  const handleChange = (e, value) => {
    setFilters((currFilters) => ({ ...currFilters, diets: value }))
  }

  const handleClickNoDiets = () => {
    setFilters((currFilters) => ({ ...currFilters, diets: [] }))
  }

  if (isLoading) return <div>LOADING</div>

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center', margin: theme.spacing(3) }}>{t('do_you_have_a_specific_diet')}</Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', margin: theme.spacing(3) }}>{t('choose_relevant_options')}</Typography>

      <ToggleButtonGroup
        fullWidth
        color="primary"
        variant="outlined"
        orientation="vertical"
      >
        <ToggleButton
          fullWidth
          color="primary"
          variant="outlined"
          selected={filters.diets.length === 0}
          onClick={handleClickNoDiets}
        >
          {t('no_specific_diet')}
        </ToggleButton>
      </ToggleButtonGroup>

      <Divider variant="middle" sx={{ margin: `${theme.spacing(2)} 0` }} />

      <ToggleButtonGroup
        fullWidth
        color="primary"
        value={filters.diets}
        onChange={handleChange}
        aria-label="diets"
        orientation="vertical"
      >
        {
         diets.map((diet) => (
           <ToggleButton
             fullWidth
             key={diet.id}
             value={diet.id}
           >
             {t(diet.name.toLocaleLowerCase())}
           </ToggleButton>
         ))
        }

      </ToggleButtonGroup>
    </>
  )
}

export default DietsSelector
