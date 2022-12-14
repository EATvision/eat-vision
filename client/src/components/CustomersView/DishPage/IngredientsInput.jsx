import React from 'react'
import { useField } from 'formik'
import update from 'immutability-helper'
import { useTranslation } from 'react-i18next'

import { Close } from '@mui/icons-material'
import { Add as AddIcon } from '@mui/icons-material'

import Checkbox from 'components/FormInputs/Checkbox'
import NumberInput from 'components/FormInputs/NumberInput'
import SelectDishes from 'components/CustomersView/DishPage/SelectDishes'
import SelectIngredients from 'components/CustomersView/DishPage/SelectIngredients'

const { Box, Stack, Button, FormLabel, FormControl } = require('@mui/material')

const IngredientsInput = ({
  name,
  label,
  showAddDish,
  showPutaside,
  showAddIngredient,
  showDishAddedPrice,
  showIngredientAddedPrice,
}) => {
  const { t } = useTranslation()
  const [, meta, helpers] = useField(name)

  const handleOnClickAddIngredient = (type) => () => {
    helpers.setValue(update(meta.value || [], { $push: [{ type }] }))
  }

  const handleClickRemoveIngredient = (index) => () => {
    helpers.setValue(update(meta.value || [], { $splice: [[index, 1]] }))
  }

  return (
    <FormControl direction="column" mt={2} mb={1} margin="normal">
      <FormLabel>{label}</FormLabel>
      <Stack direction="column" alignItems="stretch" mt={2}>
        {meta.value?.map((ingredient, index) => {
          const showAddedPrice =
            (ingredient.type === 'dish' && showDishAddedPrice) ||
            (ingredient.type === 'ingredient' && showIngredientAddedPrice)

          return (
            <Stack
              key={ingredient?.id || 'new'}
              direction="row"
              alignItems="flex-start"
              spacing={1}
              mt={-3}
            >
              <Box flex={1} pt={1}>
                {ingredient.type === 'ingredient' && (
                  <SelectIngredients
                    name={`${name}.${index}.id`}
                    placeholder={`${t('ingredient')} ${index + 1}`}
                    fullWidth
                  />
                )}
                {ingredient.type === 'dish' && (
                  <SelectDishes
                    name={`${name}.${index}.id`}
                    placeholder={`${t('dish')} ${index + 1}`}
                    fullWidth
                  />
                )}
              </Box>
              {showAddedPrice && (
                <Box>
                  <NumberInput
                    name={`${name}.${index}.price`}
                    placeholder={t('added_price')}
                  />
                </Box>
              )}
              {(showPutaside || true) && (
                <Box pt={1}>
                  <Checkbox
                    name={`${name}.${index}.putaside`}
                    label={t('is_possible_to_putaside')}
                  />
                </Box>
              )}
              <Box pt={3}>
                <Button
                  color="inherit"
                  onClick={handleClickRemoveIngredient(index)}
                >
                  <Close />
                </Button>
              </Box>
            </Stack>
          )
        })}
        <Stack direction="row" alignSelf="flex-end" spacing={1}>
          {showAddDish && (
            <Button
              disabled={!!meta.error}
              variant="outlined"
              onClick={handleOnClickAddIngredient('dish')}
              color="warning"
              startIcon={<AddIcon />}
            >
              Dish
            </Button>
          )}
          {showAddIngredient && (
            <Button
              disabled={!!meta.error}
              variant="outlined"
              onClick={handleOnClickAddIngredient('ingredient')}
              color="info"
              startIcon={<AddIcon />}
            >
              Ingredient
            </Button>
          )}
        </Stack>
      </Stack>
    </FormControl>
  )
}

export default IngredientsInput
