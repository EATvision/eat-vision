import React from 'react'
import {
  Divider, ToggleButton, ToggleButtonGroup, useTheme, Box, Checkbox,
} from '@mui/material'

import { useTranslation } from 'react-i18next'
import { useDiets } from '../../../hooks/diets'

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
    <Box sx={{ padding: theme.spacing(2), flex: 1 }}>
      <ToggleButtonGroup
        fullWidth
        color="primary"
        variant="outlined"
        orientation="vertical"
      >
        <ToggleButton
          fullWidth
          size="small"
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
                size="small"
                fullWidth
                key={diet.id}
                value={diet.id}
                sx={{ justifyContent: 'flex-start', padding: theme.spacing(0) }}
              >
                <Checkbox
                  sx={{ pointerEvents: 'none' }}
                  checked={filters.diets.includes(diet.id)}
                />
                {t(diet.name.toLocaleLowerCase())}
              </ToggleButton>
            ))
            }

      </ToggleButtonGroup>
    </Box>
  )
}

export default DietsSelector
