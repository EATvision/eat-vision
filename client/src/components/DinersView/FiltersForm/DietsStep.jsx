import React from 'react'
import {
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  Box,
  Grow,
  Button,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { Check as CheckIcon } from '@mui/icons-material'

import { useTranslation } from 'react-i18next'
import { useDinerUser } from 'contexts/diner'
import { useDiets } from 'hooks/diets'
import { useKitchenById } from 'hooks/kitchens'
import FixedBottomConrainer from 'components/FixedBottomContainer'

function DietsSelector({ onNext, onBack }) {
  const theme = useTheme()
  const { t } = useTranslation()
  const dinerUser = useDinerUser()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const { diets, isLoading } = useDiets()

  const handleChange = (e, value) => {
    dinerUser.setFilters({
      ...dinerUser.user.filters,
      diets: value.includes('none') ? [] : value,
    })
  }

  const handleClickDone = () => {
    onNext()
  }

  const handleClickBack = () => {
    onBack()
  }

  if (isLoading) return <div>LOADING</div>

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ToggleButtonGroup
        fullWidth
        color="primary"
        value={dinerUser.user.filters.diets}
        onChange={handleChange}
        aria-label="diets"
        orientation="vertical"
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: theme.spacing(1),
          marginBottom: 'auto',
        }}
      >
        <ToggleButton
          color="primary"
          selected={dinerUser.user.filters.diets.length === 0}
          value="none"
          sx={{
            justifyContent: 'flex-start',
            fontSize: 16,
            padding: '15px 10px',
            border: 0,
            textAlign: 'start',
          }}
        >
          {t('no_specific_diet')}

          {dinerUser.user.filters.diets.length === 0 && (
            <CheckIcon sx={{ marginLeft: 'auto' }} />
          )}
        </ToggleButton>

        {diets.map((diet) => (
          <ToggleButton
            key={diet.id}
            value={diet.id}
            sx={{
              justifyContent: 'flex-start',
              fontSize: 16,
              padding: '15px 10px',
              border: 0,
              textAlign: 'start',
            }}
          >
            {kitchen?.locale === 'he-IL' ? diet.translation_heb : diet.name}

            {dinerUser.user.filters.diets.includes(diet.id) && (
              <CheckIcon sx={{ marginLeft: 'auto' }} />
            )}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <FixedBottomConrainer>
        <Button variant="text" onClick={handleClickBack}>
          {t('back')}
        </Button>
        <Grow direction="up" in>
          <Button variant="contained" fullWidth onClick={handleClickDone}>
            {t('im_done')}
          </Button>
        </Grow>
      </FixedBottomConrainer>
    </Box>
  )
}

export default DietsSelector
