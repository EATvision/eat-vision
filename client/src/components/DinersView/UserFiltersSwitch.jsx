import React from 'react'
import { t } from 'i18next'
import { FormControlLabel, Switch } from '@mui/material'

import { useDinerUser } from 'contexts/diner'

export default function UserFiltersSwitch() {
  const dinerUser = useDinerUser()
  const numberOfFiltersOn = Object.keys(dinerUser.user.filters).reduce(
    (acc, filterName) => acc + dinerUser.user.filters[filterName].length,
    0
  )

  const handleToggleSwitch = () => {
    dinerUser.setAreFiltersOn((current) => !current)
  }

  return (
    <FormControlLabel
      sx={{ color: 'black' }}
      onChange={handleToggleSwitch}
      disabled={numberOfFiltersOn === 0}
      control={
        <Switch
          color="primary"
          size="small"
          checked={Boolean(numberOfFiltersOn === 0 || dinerUser.areFiltersOn)}
        />
      }
      label={t('filters')}
      labelPlacement="bottom"
    />
  )
}
