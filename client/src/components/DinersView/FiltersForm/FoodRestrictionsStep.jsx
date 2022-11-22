import { t } from 'i18next'
import React from 'react'
import {
  Divider,
  useTheme,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Checkbox,
  Button,
  DialogActions,
  DialogContent,
  useMediaQuery,
  Dialog,
  Chip,
} from '@mui/material'

import IngredientsSelector from './IngredientsSelector'
import { useGetComponentLabel, useV1IngredientsByIds } from 'hooks/ingredients'
import { useDinerUser } from 'contexts/diner'

function FoodRestrictionsStep({ onNext }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const dinerUser = useDinerUser()
  const [filterType, setFilterType] = React.useState(null)
  const [initialFilters, setInitialFilters] = React.useState(
    dinerUser.user.filters
  )

  const handleClickDone = () => {
    setFilterType(null)
    setInitialFilters(dinerUser.user.filters)
  }

  const handleClickBack = () => {
    setFilterType(null)
    dinerUser.setFilters(initialFilters)
  }

  const isNoRestrictions =
    !dinerUser.user.filters.exclude.length &&
    !dinerUser.user.filters.allergies.length &&
    !dinerUser.user.filters.avoidOrReduce.length

  const handleClickNoRestrictions = () => {
    dinerUser.setFilters({
      ...dinerUser.user.filters,
      exclude: [],
      allergies: [],
      avoidOrReduce: [],
    })
    onNext()
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
          filters={dinerUser.user.filters}
          title={t('i_dont_eat_specific_foods')}
          type="exclude"
          onClick={handleClickSelectRestriction('exclude')}
        />

        <RestrictionFilter
          filters={dinerUser.user.filters}
          title={t('allergies')}
          type="allergies"
          onClick={handleClickSelectRestriction('allergies')}
        />

        <RestrictionFilter
          filters={dinerUser.user.filters}
          title={t('things_i_avoid_or_reduce')}
          type="avoidOrReduce"
          onClick={handleClickSelectRestriction('avoidOrReduce')}
        />
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={Boolean(filterType)}
        onClose={handleClickBack}
      >
        <DialogContent
          sx={!fullScreen ? { minWidth: 500, minHeight: 500 } : {}}
        >
          <IngredientsSelector
            filters={dinerUser.user.filters}
            setFilters={dinerUser.setFilters}
            filterType={filterType}
            selectProps={{ defaultMenuIsOpen: true }}
          />
        </DialogContent>
        <DialogActions disableSpacing sx={{ padding: 0 }}>
          <Button fullWidth variant="outlined" onClick={handleClickBack}>
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

function RestrictionFilter({ filters, title, type, onClick }) {
  const theme = useTheme()
  const getComponentLabel = useGetComponentLabel()
  const { ingredients } = useV1IngredientsByIds(filters[type])

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
          alignItems: 'start',
          justifyContent: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <Checkbox checked={Boolean(filters[type].length > 0)} />

          {title}
        </Box>

        {ingredients?.length > 0 && (
          <Box sx={{ padding: theme.spacing(1) }}>
            {ingredients?.map((c) => (
              <Chip key={c.id} size="small" label={getComponentLabel(c)} />
            ))}
          </Box>
        )}
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default FoodRestrictionsStep
