import React from 'react'
import _flatten from 'lodash/flatten'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Box,
  Typography,
  useTheme,
  Dialog,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from '@mui/material'
import waiterSrc from '../../images/waiter_transparent_fullbody.png'

import { defaultFilters } from 'utils/filters'
import { useKitchenById } from 'hooks/kitchens'
import useIsRTL from 'hooks/useRTL'
import Login from 'components/Login'
import { useDinerUser } from 'contexts/diner'

const doesUserHaveFilters = (filters) =>
  _flatten(Object.values(filters)).length > 0

function GreetingPage() {
  const theme = useTheme()
  const { t } = useTranslation()
  const { kitchenId, menuId } = useParams()
  const isRTL = useIsRTL()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const dinerUser = useDinerUser()

  const { kitchen } = useKitchenById(kitchenId)

  const [isLoginOpen, setIsLoginOpen] = React.useState(false)

  const handleClickSkipToFullMenu = () => {
    dinerUser.setFilters(defaultFilters)
    dinerUser.signup()
  }

  const handleClickSignin = () => setIsLoginOpen(true)

  const handleOnDoneSignIn = () => {
    setIsLoginOpen(false)
  }

  const handleCloseLoginDialog = () => setIsLoginOpen(false)

  if (dinerUser.token && doesUserHaveFilters(dinerUser.user.filters)) {
    return (
      <Navigate
        to={`/diners/kitchens/${kitchenId}/menus/${menuId}/service`}
        replace
      />
    )
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box>
          <div className="w-[150px] mx-auto mt-4 aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              className="w-full h-full object-center object-fit group-hover:opacity-75"
              src={kitchen?.image?.[0]?.url}
              alt=""
            />
          </div>
        </Box>

        <Box
          sx={{
            position: 'relative',
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            margin: 'auto',
            marginTop: 0,
          }}
        >
          <Box
            sx={{
              height: 300,
              position: 'absolute',
              [isRTL ? 'right' : 'left']: '50%',
              translate: '-50%',
            }}
          >
            <img
              src={waiterSrc}
              alt="waiter"
              className="w-full h-full object-center object-fit group-hover:opacity-75"
            />
          </Box>
          <Box
            sx={{
              zIndex: 1,
              background: 'rgb(255 255 255 / 80%)',
              padding: theme.spacing(2),
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: 18, color: '#494949', fontWeigth: '500' }}
            >
              {t('hi_im_your_personal_waiter')}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontSize: 20,
                fontWeight: 'bold',
                lineHeight: 1.2,
                marginTop: theme.spacing(1),
              }}
            >
              {t('lets_see_only_things')}
              <br />
              {t('that_are_relevant_to_you')}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                opacity: 0.8,
                marginTop: theme.spacing(2),
              }}
            >
              {t('or_skip_to_the')}
              <Link
                className="group flex flex-col"
                to="dishes"
                onClick={handleClickSkipToFullMenu}
              >
                <Typography
                  variant="body2"
                  sx={{
                    margin: `0 ${theme.spacing(1)}`,
                    textDecoration: 'underline',
                  }}
                >
                  {t('tofull_menu')}
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            padding: `0 ${theme.spacing(2)}`,
            paddingBottom: theme.spacing(1),
            position: 'fixed',
            width: '100vw',
            bottom: 50,
            maxWidth: 500,
            margin: 'auto',
            [isRTL ? 'right' : 'left']: '50%',
            translate: '-50%',
          }}
        >
          <Link className="group flex flex-col" to="filters/1">
            <Button variant="contained" color="primary">
              {t('lets_get_started')}
            </Button>
          </Link>

          <Typography
            variant="body2"
            sx={{
              margin: `0 ${theme.spacing(1)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="text"
              fullWidth
              onClick={handleClickSignin}
              disabled={dinerUser.token}
            >
              {dinerUser.token
                ? t('already_registered')
                : t('register_or_sign_in')}
            </Button>
          </Typography>
        </Box>
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={isLoginOpen}
        onClose={handleCloseLoginDialog}
      >
        <DialogContent
          sx={!fullScreen ? { minWidth: 500, minHeight: 500 } : {}}
        >
          <Login onDone={handleOnDoneSignIn} />
        </DialogContent>

        <DialogActions disableSpacing sx={{ padding: 0 }}>
          <Button fullWidth variant="outlined" onClick={handleCloseLoginDialog}>
            {t('back')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default GreetingPage
