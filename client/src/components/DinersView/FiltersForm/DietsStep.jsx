import React from 'react'
import { ToggleButton, ToggleButtonGroup, useTheme, Box } from '@mui/material'

import { useTranslation } from 'react-i18next'
import { useDiets } from '../../../hooks/diets'
import { useDinerUser } from 'contexts/diner'
import { useKitchenById } from 'hooks/kitchens'
import { useParams } from 'react-router-dom'

function DietsSelector({ onNext }) {
  const theme = useTheme()
  const { t } = useTranslation()
  const dinerUser = useDinerUser()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const { diets, isLoading } = useDiets()

  const handleChange = (e, value) => {
    dinerUser.setFilters({ ...dinerUser.user.filters, diets: value })
  }

  const handleClickNoDiets = () => {
    dinerUser.setFilters({ ...dinerUser.user.filters, diets: [] })
    onNext()
  }

  if (isLoading) return <div>LOADING</div>

  return (
    <Box sx={{ padding: theme.spacing(2), flex: 1 }}>
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
        }}
      >
        <ToggleButton
          color="primary"
          selected={dinerUser.user.filters.diets.length === 0}
          onClick={handleClickNoDiets}
          value="none"
          sx={{
            justifyContent: 'flex-start',
            fontSize: 16,
            padding: '16px 20px',
            border: 0,
            textAlign: 'start',
          }}
        >
          {t('no_specific_diet')}
        </ToggleButton>

        {diets.map((diet) => (
          <ToggleButton
            key={diet.id}
            value={diet.id}
            sx={{
              justifyContent: 'flex-start',
              fontSize: 16,
              padding: '16px 20px',
              border: 0,
              textAlign: 'start',
            }}
          >
            {kitchen?.locale === 'he-IL' ? diet.translation_heb : diet.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}

export default DietsSelector
