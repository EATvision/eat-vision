import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

import { useIngredientsByIds } from '../../../hooks/ingredients'
import { t } from 'i18next'

const _keyBy = require('lodash/keyBy')

function ChangesInfo({ data }) {
  const theme = useTheme()
  const relevantIds = [
    ...data.recipe.putaside.map((c) => c.id),
    ...data.recipe.excludable.map((c) => c.id),
  ]
  const { ingredients } = useIngredientsByIds(relevantIds)
  const ingredientsById = _keyBy(ingredients, 'id')

  const ingredientsSummary = {}
  data.recipe.putaside.forEach((component) => {
    ingredientsSummary[component.id] = {
      ...(ingredientsSummary[component.id] || {}),
      putaside: true,
    }
  })
  data.recipe.excludable.forEach((component) => {
    ingredientsSummary[component.id] = {
      ...(ingredientsSummary[component.id] || {}),
      excludable: true,
    }
  })
  return (
    <>
      <Typography sx={{ fontWeight: 'bold', marginBottom: theme.spacing(2) }}>
        {t('dish_possible_changes')}
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('ingredient')}</TableCell>
            <TableCell>{t('remove')}</TableCell>
            <TableCell>{t('put_aside')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(ingredientsSummary).map((row) => (
            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {ingredientsById?.[row[0]]?.name}
              </TableCell>
              <TableCell>{row[1].excludable && <CheckIcon />}</TableCell>
              <TableCell>{row[1].putaside && <CheckIcon />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default ChangesInfo
