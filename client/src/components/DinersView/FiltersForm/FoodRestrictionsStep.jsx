import { t } from 'i18next'
import React from 'react'
import {
  useTheme,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  DialogContent,
  useMediaQuery,
  Dialog,
  Chip,
  Grow,
  Typography,
} from '@mui/material'
import { BiSearchAlt2 as SearchIcon } from 'react-icons/bi'

import RestrictionsSelector from './RestrictionsSelector'
import { useGetComponentLabel, useV1IngredientsByIds } from 'hooks/ingredients'
import { useDinerUser } from 'contexts/diner'
import { useV1FoodGroupsByIds } from 'hooks/foodGroups'
import FixedBottomConrainer from 'components/FixedBottomContainer'

function FoodRestrictionsStep({ onNext, onBack }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const dinerUser = useDinerUser()
  const [filterType, setFilterType] = React.useState(null)

  const handleClickDoneFilter = () => {
    setFilterType(null)
  }

  const isNoRestrictions =
    !dinerUser.user.filters.exclude.length &&
    !dinerUser.user.filters.allergies.length &&
    !dinerUser.user.filters.avoidOrReduce.length

  const handleClickDoneStep = () => {
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
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          textAlign: 'start',
          marginBottom: 'auto',
          padding: theme.spacing(2),
          paddingBottom: '100px',
        }}
      >
        <RestrictionFilter
          filters={dinerUser.user.filters}
          title={t('i_dont_eat_specific_foods')}
          type="exclude"
          onClick={handleClickSelectRestriction('exclude')}
        />

        <RestrictionFilter
          filters={dinerUser.user.filters}
          title={t('things_i_avoid_or_reduce')}
          type="avoidOrReduce"
          onClick={handleClickSelectRestriction('avoidOrReduce')}
        />

        <RestrictionFilter
          filters={dinerUser.user.filters}
          title={t('allergies')}
          type="allergies"
          onClick={handleClickSelectRestriction('allergies')}
        />
      </Box>

      <FixedBottomConrainer>
        <Button variant="text" onClick={handleClickStepBack}>
          {t('back')}
        </Button>
        <Grow direction="up" in key={isNoRestrictions}>
          <Button variant="contained" fullWidth onClick={handleClickDoneStep}>
            {isNoRestrictions ? t('no_food_restrictions') : t('done')}
          </Button>
        </Grow>
      </FixedBottomConrainer>

      <Dialog
        fullScreen={fullScreen}
        open={Boolean(filterType)}
        // onClose={handleClickBack}
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            height: '100vh',
            maxHeight: '100vh',
          },
        }}
      >
        <DialogContent
          sx={{
            // padding: 0,
            padding: theme.spacing(2),
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
        <FixedBottomConrainer>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClickDoneFilter}
          >
            {t('im_done')}
            {dinerUser.user.filters[filterType]?.length > 0 &&
              ` (${dinerUser.user.filters[filterType]?.length})`}
          </Button>
        </FixedBottomConrainer>
      </Dialog>
    </Box>
  )
}

function RestrictionFilter({ filters, title, type, onClick }) {
  const theme = useTheme()
  const getComponentLabel = useGetComponentLabel()
  const { ingredients } = useV1IngredientsByIds(filters[type])
  const { foodGroups } = useV1FoodGroupsByIds(filters[type])

  const componentsList = [...(ingredients || []), ...(foodGroups || [])]

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
          padding: '10px',
          border: 0,
          textAlign: 'start',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography sx={{ marginRight: 'auto', fontWeight: 500 }}>
            {title}
          </Typography>
          <SearchIcon />
        </Box>

        {componentsList?.length > 0 && (
          <Box sx={{ padding: theme.spacing(1) }}>
            {componentsList?.map((c) => (
              <Chip
                key={c.id}
                size="small"
                label={getComponentLabel(c)}
                sx={{ marginRight: '2px', marginBottom: '2px' }}
              />
            ))}
          </Box>
        )}
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default FoodRestrictionsStep
