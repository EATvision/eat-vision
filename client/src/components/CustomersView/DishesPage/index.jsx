import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Button, Stack, Typography } from '@mui/material'

import DishesList from './DishesList'

function DishesManagerPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleClickAddNewDish = () => {
    navigate('new')
  }

  return (
    <Stack direction="column">
      <Typography variant="h4">{t('Dishes')}</Typography>
      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickAddNewDish}
        >
          Add new dish
        </Button>
      </Stack>
      <DishesList />
    </Stack>
  )
}

export default DishesManagerPage
