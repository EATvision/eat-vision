import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Button, Box, Typography, useTheme,
} from '@mui/material'
import waiterSrc from '../../images/waiter_transparent_fullbody.png'

import { defaultFilters } from '../../utils/filters'
import { postDiner } from '../../api/diners'
import { useKitchenById } from '../../hooks/kitchens'

function GreetingPage({ setFilters }) {
  const theme = useTheme()
  const { t } = useTranslation()
  const { kitchenId } = useParams()

  const { kitchen } = useKitchenById(kitchenId)

  const handleClickSkipToFullMenu = async () => {
    setFilters(defaultFilters)
    await postDiner(defaultFilters)
  }

  const handleClickSignin = () => {}

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box>
        <div className="w-[150px] h-[150px] mx-auto mt-4 aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8  flex-1">
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
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          margin: `0 ${theme.spacing(2)}`,
        }}
      >

        <Box
          sx={{
            height: 400,
            position: 'absolute',
            left: '50%',
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
          <Typography variant="h6">
            {t('hi_im_your_personal_waiter')}
          </Typography>

          <Typography variant="h6">
            <b>{t('let_me_help_you')}</b>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: 'flex', justifyContent: 'center', opacity: 0.8, marginTop: theme.spacing(2),
            }}
          >
            {t('or_skip_to_the')}
            <Link
              className="group flex flex-col"
              to="dishes"
              onClick={handleClickSkipToFullMenu}
            >
              <Typography variant="body2" sx={{ margin: `0 ${theme.spacing(1)}`, textDecoration: 'underline' }}>{t('tofull_menu')}</Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ margin: theme.spacing(2), marginTop: 'auto' }}>
        <Link
          className="group flex flex-col"
          to="filters/1"
        >
          <Button variant="contained" color="primary">{t('lets_get_started')}</Button>
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
          {t('already_signed_in')}
          ?
          <Button variant="text" onClick={handleClickSignin}>{t('sign_in')}</Button>
        </Typography>
      </Box>
    </Box>
  )
}

export default GreetingPage
