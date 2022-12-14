import React from 'react'
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

import { defaultFilters, doesUserHaveFilters } from 'utils/filters'
import Login from 'components/Login'
import { useDinerUser } from 'contexts/diner'
import { useV1KitchenById } from 'hooks/kitchens'

function GreetingPage() {
  const theme = useTheme()
  const { t } = useTranslation()
  const { kitchenId, menuId } = useParams()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const dinerUser = useDinerUser()
  const { kitchen } = useV1KitchenById(kitchenId)

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
        <Box sx={{ margin: 'auto' }}>
          <Box>
            <div className="w-[150px] mx-auto mt-4 aspect-w-1 aspect-h-1overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
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
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                height: 300,
                width: 105,
                position: 'absolute',
                bottom: 0,
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
                backdropFilter: 'blur(1px)',
                background: 'rgb(255 249 242 / 80%)',
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
                sx={{ fontSize: 18, color: '#494949', fontWeigth: '500' }}
              >
                {t('lets_see_only_things')}
                <br />
                {t('that_are_relevant_to_you')}
              </Typography>

              <Box
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
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              padding: `0 ${theme.spacing(2)}`,
              paddingBottom: theme.spacing(1),
              width: '100vw',
              display: 'flex',
              marginTop: theme.spacing(2),
            }}
          >
            <Box
              sx={{
                width: '100%',
                bottom: 50,
                maxWidth: 300,
                margin: 'auto',
              }}
            >
              <Link className="group flex flex-col" to="filters/1">
                <Button variant="contained" color="primary">
                  {t('lets_get_started')}
                </Button>
              </Link>

              <Button
                variant="outlined"
                fullWidth
                onClick={handleClickSignin}
                disabled={dinerUser.token}
                sx={{
                  margin: `${theme.spacing(1)} 0`,
                }}
              >
                {dinerUser.token
                  ? t('already_registered')
                  : t('register_or_sign_in')}
              </Button>
            </Box>
          </Box>
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
