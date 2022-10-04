import { t } from 'i18next'
import React from 'react'
import {
  Collapse, Divider, Typography, useTheme, Box, ToggleButtonGroup, ToggleButton,
} from '@mui/material'

import IngredientsSelector from './IngredientsSelector'
import WaiterBanner from '../WaiterBanner'

function FoodRestrictionsStep({ filters, setFilters }) {
  const theme = useTheme()

  const [selectedRestrictions, setSelectedRestrictions] = React.useState({
    exclude: filters.exclude.length > 0,
    allergies: filters.allergies.length > 0,
    reduce: filters.reduce.length > 0,
  })

  const isNoRestrictions = (
    !selectedRestrictions.exclude
    && !selectedRestrictions.allergies
    && !selectedRestrictions.reduce
  )

  const handleClickNoRestrictions = () => {
    setFilters((currFilters) => ({
      ...currFilters,
      exclude: [],
      allergies: [],
      reduce: [],
    }))
    setSelectedRestrictions({
      exclude: false,
      allergies: false,
      reduce: false,
    })
  }

  const handleClickSelectRestriction = (restrictionType) => () => {
    setSelectedRestrictions((currSelectedRestrictions) => {
      const newSelectedRestriction = !currSelectedRestrictions[restrictionType]
      if (!newSelectedRestriction) setFilters((currFilters) => ({ ...currFilters, [restrictionType]: [] }))
      return { ...currSelectedRestrictions, [restrictionType]: newSelectedRestriction }
    })
  }

  // if (isError) return <div>{JSON.stringify(isError)}</div>
  return (
    <>
      <WaiterBanner
        title={t('any_restrictions')}
        subtitle={t('choose_relevant_options')}
      />

      <Box sx={{ padding: theme.spacing(2) }}>
        <ToggleButtonGroup
          fullWidth
          variant="outlined"
          color="primary"
          orientation="vertical"
        >
          <ToggleButton
            fullWidth
            color="primary"
            variant="outlined"
            selected={isNoRestrictions}
            onClick={handleClickNoRestrictions}
          >
            {t('no_food_restrictions')}
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider variant="middle" sx={{ margin: `${theme.spacing(2)} 0` }} />

        <ToggleButtonGroup
          fullWidth
          variant="outlined"
          color="primary"
          orientation="vertical"
        >
          <ToggleButton
            fullWidth
            variant="outlined"
            selected={selectedRestrictions.exclude}
            onClick={handleClickSelectRestriction('exclude')}
          >
            {t('things_i_dont_eat')}
          </ToggleButton>

          <Collapse
            unmountOnExit
            in={selectedRestrictions.exclude}
          >
            <Box sx={{ minHeight: 100, paddingTop: theme.spacing(2) }}>
              <IngredientsSelector filters={filters} setFilters={setFilters} filterType="exclude" />
            </Box>
          </Collapse>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          fullWidth
          variant="outlined"
          color="primary"
          orientation="vertical"
        >
          <ToggleButton
            fullWidth
            variant="outlined"
            selected={selectedRestrictions.allergies}
            onClick={handleClickSelectRestriction('allergies')}
          >
            {t('im_allergic')}
          </ToggleButton>

          <Collapse
            unmountOnExit
            in={selectedRestrictions.allergies}
          >
            <Box sx={{ minHeight: 100, paddingTop: theme.spacing(2) }}>
              <IngredientsSelector filters={filters} setFilters={setFilters} filterType="allergies" />
            </Box>
          </Collapse>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          fullWidth
          variant="outlined"
          color="primary"
          orientation="vertical"
        >
          <ToggleButton
            fullWidth
            variant="outlined"
            selected={selectedRestrictions.reduce}
            onClick={handleClickSelectRestriction('reduce')}
          >
            {t('things_i_avoid_or_reduce')}
          </ToggleButton>

          <Collapse
            unmountOnExit
            in={selectedRestrictions.reduce}
          >
            <Box sx={{ minHeight: 100, paddingTop: theme.spacing(2) }}>
              <IngredientsSelector filters={filters} setFilters={setFilters} filterType="reduce" />
            </Box>
          </Collapse>
        </ToggleButtonGroup>
      </Box>
    </>
  )
}

export default FoodRestrictionsStep
