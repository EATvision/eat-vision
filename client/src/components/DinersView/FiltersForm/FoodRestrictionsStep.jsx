import { t } from 'i18next'
import React from 'react'
import {
  Collapse, Divider, useTheme, Box, ToggleButtonGroup, ToggleButton, Checkbox, Button,
  DialogActions, DialogContent, useMediaQuery, Dialog,
} from '@mui/material'

import IngredientsSelector from './IngredientsSelector'

function FoodRestrictionsStep({ filters, setFilters }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [filterType, setFilterType] = React.useState(null)
  const [initialFilters, setInitialFilters] = React.useState(filters)

  const handleClickDone = () => {
    setFilterType(null)
    setInitialFilters(filters)
  }

  const handleClickBack = () => {
    setFilterType(null)
    setFilters(initialFilters)
  }

  const isNoRestrictions = (
    !filters.exclude.length
    && !filters.allergies.length
    && !filters.avoidOrReduce.length
  )

  const handleClickNoRestrictions = () => {
    setFilters((currFilters) => ({
      ...currFilters,
      exclude: [],
      allergies: [],
      avoidOrReduce: [],
    }))
  }

  const handleClickSelectRestriction = (restrictionType) => () => {
    setFilterType(restrictionType)
  }

  return (
    <Box sx={{ padding: theme.spacing(2), flex: 1 }}>
      <ToggleButtonGroup
        fullWidth
        value="none"
        variant="outlined"
        color="primary"
        orientation="vertical"
      >
        <ToggleButton
          fullWidth
          value="none"
          size="small"
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
          value="exclude"
          variant="outlined"
          color="primary"
          orientation="vertical"
        >
          <ToggleButton
            fullWidth
            value="exclude"
            variant="outlined"
            size="small"
            selected={Boolean(filters.exclude.length > 0)}
            onClick={handleClickSelectRestriction('exclude')}
            sx={{ justifyContent: 'flex-start' }}
          >
            <Checkbox checked={Boolean(filters.exclude.length > 0)} />

            {t('things_i_dont_eat')}
          </ToggleButton>
        </ToggleButtonGroup>

        <Collapse
          unmountOnExit
          in={Boolean(filters.exclude.length > 0)}
        >
          <Box sx={{ minHeight: 100, padding: `${theme.spacing(2)} 0` }}>
            <IngredientsSelector filters={filters} setFilters={setFilters} filterType="exclude" disabled />
          </Box>
        </Collapse>

        <ToggleButtonGroup
          fullWidth
          value="allergies"
          variant="outlined"
          color="primary"
          orientation="vertical"
        >
          <ToggleButton
            fullWidth
            value="allergies"
            variant="outlined"
            size="small"
            selected={Boolean(filters.allergies.length > 0)}
            onClick={handleClickSelectRestriction('allergies')}
            sx={{ justifyContent: 'flex-start' }}
          >
            <Checkbox checked={Boolean(filters.allergies.length > 0)} />

            {t('im_allergic')}
          </ToggleButton>
        </ToggleButtonGroup>

        <Collapse
          unmountOnExit
          in={Boolean(filters.allergies.length > 0)}
        >
          <Box sx={{ minHeight: 100, padding: `${theme.spacing(2)} 0` }}>
            <IngredientsSelector filters={filters} setFilters={setFilters} filterType="allergies" disabled />
          </Box>
        </Collapse>

        <ToggleButtonGroup
          fullWidth
          value="avoidOrReduce"
          variant="outlined"
          color="primary"
          orientation="vertical"
        >
          <ToggleButton
            fullWidth
            value="avoidOrReduce"
            variant="outlined"
            size="small"
            selected={Boolean(filters.avoidOrReduce.length > 0)}
            onClick={handleClickSelectRestriction('avoidOrReduce')}
            sx={{ justifyContent: 'flex-start' }}
          >
            <Checkbox checked={Boolean(filters.avoidOrReduce.length > 0)} />

            {t('things_i_avoid_or_reduce')}
          </ToggleButton>
        </ToggleButtonGroup>

        <Collapse
          unmountOnExit
          in={Boolean(filters.avoidOrReduce.length > 0)}
        >
          <Box sx={{ minHeight: 100, padding: `${theme.spacing(2)} 0` }}>
            <IngredientsSelector filters={filters} setFilters={setFilters} filterType="avoidOrReduce" disabled />
          </Box>
        </Collapse>
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={Boolean(filterType)}
        onClose={handleClickBack}

      >
        <DialogContent sx={!fullScreen ? { minWidth: 500, minHeight: 500 } : {}}>
          <IngredientsSelector filters={filters} setFilters={setFilters} filterType={filterType} selectProps={{ defaultMenuIsOpen: true }} />
        </DialogContent>
        <DialogActions disableSpacing sx={{ padding: 0 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClickBack}
          >
            {t('back')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickDone}
          >
            {t('done')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default FoodRestrictionsStep
