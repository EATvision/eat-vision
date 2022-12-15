import React from 'react'
import { t } from 'i18next'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
} from '@mui/material'

import { useDinerUser } from 'contexts/diner'
import { useNavigate, useParams } from 'react-router-dom'

export default function UserFiltersSwitch() {
  const navigate = useNavigate()
  const { kitchenId, menuId } = useParams()
  const dinerUser = useDinerUser()

  const [isNoFiltersDialogOn, setIsNoFiltersDialogOn] = React.useState(false)

  const numberOfFiltersOn = Object.keys(dinerUser.user.filters).reduce(
    (acc, filterName) => acc + dinerUser.user.filters[filterName].length,
    0
  )

  const handleToggleSwitch = () => {
    if (numberOfFiltersOn === 0) {
      return setIsNoFiltersDialogOn(true)
    }
    dinerUser.setAreFiltersOn((current) => !current)
  }

  const handleCloseNoFiltersDialogOnDialog = () => {
    setIsNoFiltersDialogOn(false)
  }

  const handleClickPersonalizeMenu = () => {
    if (kitchenId && menuId) {
      navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}/filters/1`)
    } else {
      navigate(-1)
    }
  }

  return (
    <>
      <FormControlLabel
        sx={{ color: 'black' }}
        onChange={handleToggleSwitch}
        control={
          <Switch
            color="primary"
            size="small"
            checked={Boolean(numberOfFiltersOn > 0 && dinerUser?.areFiltersOn)}
          />
        }
        label={t('personal_preferences')}
        labelPlacement="bottom"
      />

      <Dialog
        open={isNoFiltersDialogOn}
        onClose={handleCloseNoFiltersDialogOnDialog}
      >
        <DialogTitle>{t('you_dont_have_any_preferences')}</DialogTitle>
        <DialogContent>
          {t('would_you_like_to_personalize_the_menu')}
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCloseNoFiltersDialogOnDialog}
          >
            {t('back')}
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={handleClickPersonalizeMenu}
          >
            {t('personalize')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
