import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Typography, useTheme } from '@mui/material'

import { useV1Kitchens } from 'hooks/kitchens'

function KitchensPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const { kitchens, isLoading, isError } = useV1Kitchens()

  if (isLoading) return <div>{t('loading')}</div>
  if (isError) return <div>ERROR</div>

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'auto',
        padding: `0 ${theme.spacing(1)}`,
      }}
    >
      <Typography variant="h3">{t('kitchens_list')}</Typography>

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {kitchens?.map((kitchen) => (
              <Link
                className="group flex flex-col"
                to={`${kitchen.id}/menus`}
                key={kitchen.id}
              >
                <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8  flex-1">
                  <img
                    src={kitchen?.image?.[0]?.url}
                    alt="kitchen logo"
                    className="w-full h-full object-center object-fit group-hover:opacity-75"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 group-hover:opacity-75">
                  {kitchen.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Box>
  )
}

export default KitchensPage
