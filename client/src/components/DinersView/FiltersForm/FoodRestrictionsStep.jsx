import { t } from 'i18next'
import React from 'react'
import {
  useTheme,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  DialogActions,
  DialogContent,
  useMediaQuery,
  Dialog,
  Chip,
  Grow,
} from '@mui/material'

import RestrictionsSelector from './RestrictionsSelector'
import { useGetComponentLabel, useV1IngredientsByIds } from 'hooks/ingredients'
import { useDinerUser } from 'contexts/diner'

function FoodRestrictionsStep({ onNext, onBack }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const dinerUser = useDinerUser()
  const [filterType, setFilterType] = React.useState(null)

  const handleClickDone = () => {
    setFilterType(null)
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

  const handleClickStepBack = () => {
    onBack()
  }

  const handleClickSelectRestriction = (restrictionType) => () => {
    setFilterType(restrictionType)
  }

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ textAlign: 'start', marginBottom: 'auto' }}>
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

      <Box sx={{ display: 'flex' }}>
        <Button variant="text" onClick={handleClickStepBack}>
          {t('back')}
        </Button>
        <Grow direction="up" in>
          <Button
            variant="contained"
            fullWidth
            onClick={handleClickNoRestrictions}
          >
            {isNoRestrictions ? t('no_food_restrictions') : t('done')}
          </Button>
        </Grow>
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={Boolean(filterType)}
        // onClose={handleClickBack}
        disableEscapeKeyDown
        PaperProps={{ sx: { padding: theme.spacing(2), height: '100vh' } }}
      >
        <DialogContent
          sx={{
            padding: 0,
            ...(!fullScreen ? { minWidth: 500, minHeight: 500 } : {}),
          }}
        >
          <RestrictionsSelector
            filters={dinerUser.user.filters}
            setFilters={dinerUser.setFilters}
            filterType={filterType}
            selectProps={{ defaultMenuIsOpen: true }}
          />
        </DialogContent>
        <DialogActions disableSpacing sx={{ padding: 0 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickDone}
          >
            {t('im_done')}
            {dinerUser.user.filters[filterType]?.length > 0 &&
              ` (${dinerUser.user.filters[filterType]?.length})`}
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
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          fontSize: 16,
          padding: '16px 20px',
          border: 0,
          textAlign: 'start',
        }}
      >
        <Box>{title}</Box>

        {ingredients?.length > 0 && (
          <Box sx={{ padding: theme.spacing(1) }}>
            {ingredients?.map((c) => (
              <Chip
                key={c.id}
                size="small"
                label={getComponentLabel(c)}
                sx={{ marginRight: theme.spacing(1) }}
              />
            ))}
          </Box>
        )}
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default FoodRestrictionsStep
