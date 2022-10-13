import { t } from 'i18next'
import React from 'react'
import {
  Collapse, Divider, useTheme, Box, ToggleButtonGroup, ToggleButton, Checkbox,
} from '@mui/material'

import IngredientsSelector from './IngredientsSelector'

function FoodRestrictionsStep({ filters, setFilters }) {
  const theme = useTheme()

  const [selectedRestrictions, setSelectedRestrictions] = React.useState({
    exclude: filters.exclude.length > 0,
    allergies: filters.allergies.length > 0,
    avoidOrReduce: filters.avoidOrReduce.length > 0,
  })

  const isNoRestrictions = (
    !selectedRestrictions.exclude
    && !selectedRestrictions.allergies
    && !selectedRestrictions.avoidOrReduce
  )

  const handleClickNoRestrictions = () => {
    setFilters((currFilters) => ({
      ...currFilters,
      exclude: [],
      allergies: [],
      avoidOrReduce: [],
    }))
    setSelectedRestrictions({
      exclude: false,
      allergies: false,
      avoidOrReduce: false,
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
    <Box sx={{ padding: theme.spacing(2), flex: 1 }}>
      <ToggleButtonGroup
        fullWidth
        variant="outlined"
        color="primary"
        orientation="vertical"
      >
        <ToggleButton
          color="primary"
          variant="outlined"
          selected={isNoRestrictions}
          onClick={handleClickNoRestrictions}
        >
          {t('no_food_restrictions')}
        </ToggleButton>
      </ToggleButtonGroup>

      <Divider variant="middle" sx={{ margin: `${theme.spacing(2)} 0` }} />

      <Box sx={{ textAlign: 'start' }}>
        <ToggleButtonGroup
          fullWidth
          variant="outlined"
          color="primary"
          orientation="vertical"
        >
          <ToggleButton
            variant="outlined"
            selected={Boolean(selectedRestrictions.exclude)}
            onClick={handleClickSelectRestriction('exclude')}
            sx={{ justifyContent: 'flex-start' }}
          >
            <Checkbox checked={Boolean(selectedRestrictions.exclude)} />

            {t('things_i_dont_eat')}
          </ToggleButton>

          <Collapse
            unmountOnExit
            in={Boolean(selectedRestrictions.exclude)}
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
            variant="outlined"
            selected={Boolean(selectedRestrictions.allergies)}
            onClick={handleClickSelectRestriction('allergies')}
            sx={{ justifyContent: 'flex-start' }}
          >
            <Checkbox checked={Boolean(selectedRestrictions.allergies)} />

            {t('im_allergic')}
          </ToggleButton>

          <Collapse
            unmountOnExit
            in={Boolean(selectedRestrictions.allergies)}
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
            variant="outlined"
            selected={Boolean(selectedRestrictions.avoidOrReduce)}
            onClick={handleClickSelectRestriction('avoidOrReduce')}
            sx={{ justifyContent: 'flex-start' }}
          >
            <Checkbox checked={Boolean(selectedRestrictions.avoidOrReduce)} />

            {t('things_i_avoid_or_reduce')}
          </ToggleButton>

          <Collapse
            unmountOnExit
            in={Boolean(selectedRestrictions.avoidOrReduce)}
          >
            <Box sx={{ minHeight: 100, paddingTop: theme.spacing(2) }}>
              <IngredientsSelector filters={filters} setFilters={setFilters} filterType="avoidOrReduce" />
            </Box>
          </Collapse>
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
}

export default FoodRestrictionsStep