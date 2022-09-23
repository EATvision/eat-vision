import { t } from 'i18next'
import React from 'react'
import {
  ToggleButton, ToggleButtonGroup, Typography, useTheme,
} from '@mui/material'

import { useDiets } from '../hooks/diets'

function DietsSelector({ filters, setFilters }) {
  const theme = useTheme()
  const { diets, isLoading } = useDiets()

  const handleChange = (e, value) => {
    setFilters((currFilters) => ({ ...currFilters, diets: value }))
  }

  if (isLoading) return <div>LOADING</div>

  return (
    <div>
      <Typography variant="h3" sx={{ textAlign: 'center', margin: theme.spacing(3) }}>{t('my_diet')}</Typography>
      <Typography variant="h4" sx={{ textAlign: 'center', margin: theme.spacing(3) }}>{t('choose_relevant_options')}</Typography>
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
    </div>
  )
}

export default DietsSelector
