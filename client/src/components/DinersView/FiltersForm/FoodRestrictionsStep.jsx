import { t } from 'i18next'
import React from 'react'
import {
  Divider, useTheme, Box, ToggleButtonGroup, ToggleButton, Checkbox, Button,
  DialogActions, DialogContent, useMediaQuery, Dialog, Chip,
} from '@mui/material'

import IngredientsSelector from './IngredientsSelector'
import { useIngredientsByIds } from '../../../hooks/ingredients'

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
        <RestrictionFilter
          filters={filters}
          type="exclude"
          onClick={handleClickSelectRestriction('exclude')}
        />

        <RestrictionFilter
          filters={filters}
          type="allergies"
          onClick={handleClickSelectRestriction('allergies')}
        />

        <RestrictionFilter
          filters={filters}
          type="avoidOrReduce"
          onClick={handleClickSelectRestriction('avoidOrReduce')}
        />
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

function RestrictionFilter({ filters, type, onClick }) {
  const theme = useTheme()
  const { ingredients } = useIngredientsByIds(filters[type])

  return (
    <ToggleButtonGroup
      fullWidth
      value={type}
      variant="outlined"
      color="primary"
      orientation="vertical"
    >
      <ToggleButton
        fullWidth
        value={type}
        variant="outlined"
        size="small"
        selected={Boolean(filters[type].length > 0)}
        onClick={onClick}
        sx={{
          alignItems: 'start', justifyContent: 'flex-start', display: 'flex', flexDirection: 'column',
        }}
      >
        <Box>

          <Checkbox checked={Boolean(filters[type].length > 0)} />

          {t('things_i_avoid_or_reduce')}
        </Box>

        {
          ingredients?.length > 0
          && (
          <Box sx={{ padding: theme.spacing(1) }}>
            {ingredients?.map((c) => (
              <Chip
                size="small"
                label={c.name}
              />
            ))}
          </Box>
          )
        }
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default FoodRestrictionsStep
