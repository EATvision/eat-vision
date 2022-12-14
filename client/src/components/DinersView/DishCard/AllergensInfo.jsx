import React from 'react'
import { useAllergens } from 'hooks/allergens'
import { Box, Typography } from '@mui/material'
import { useGetTranslatedLabel } from 'hooks/useTranslatedLabel'

function AllergensInfo({ data }) {
  const { allergens } = useAllergens()
  const getTranslatedLabel = useGetTranslatedLabel()

  return (
    <>
      {allergens &&
        data.dishAllergens.map((allergenId) => {
          const allergenData = allergens.find((a) => a.id === allergenId)
          return (
            <Box key={allergenId}>
              <Typography>{getTranslatedLabel(allergenData)}</Typography>
            </Box>
          )
        })}
    </>
  )
}

export default AllergensInfo
