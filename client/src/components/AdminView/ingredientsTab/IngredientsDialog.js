import React, { useState } from 'react'

import { FormikProvider, useFormik, useFormikContext } from 'formik'
import ingredientsValidationSchema from 'schemas/ingredient'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

import { useTheme } from '@emotion/react'

import { t } from 'i18next'
import { Box } from '@mui/system'
import TextInput from 'components/FormInputs/TextInput'
import Checkbox from 'components/FormInputs/Checkbox'
import ChipSelection from 'components/FormInputs/ChipSelection'
import { useIngredients } from 'hooks/ingredients'

import { useDebounce } from 'use-debounce'

const defaultIngredient = {
  id: '',
  name: '',
  tags: [],
  groups: [],
  synonyms: '',
  description: '',
  subIngredients: [],
  excludedInDiets: [],
  isSearchable: false,
  translation_heb: '',
}

const DialogForm = () => {
  const theme = useTheme()

  const [ingredientsSearch, setIngredientsSearch] = useState('')
  const [debouncedIngredientsSearch] = useDebounce(ingredientsSearch, 250)

  const { ingredients, loading } = useIngredients({
    search: debouncedIngredientsSearch,
  })

  const { values: ingredient } = useFormikContext()

  return (
    <Box
      sx={{
        '.MuiFormControl-root': {
          margin: theme.spacing(1),
        },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box>{ingredient.id ? `id: ${ingredient.id}` : ''}</Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <TextInput label={t('name')} name="name" required fullWidth />
        <TextInput
          label={t('translation_heb')}
          name="translation_heb"
          required
          fullWidth
        />
      </Box>
      <Checkbox label={t('isSearchable')} name="isSearchable" required />
      <Box
        sx={{
          maxWidth: theme.spacing(100),
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ChipSelection
          label={t('food_groups')}
          name="groups"
          required
          options={[]}
          fullWidth
          //TODO: add options props
          getId={(option) => option}
          getLabel={(option) => option}
        />
        <ChipSelection
          label={t('subIngredients')}
          name="subIngredients"
          options={ingredients}
          loading={loading}
          onSearchChange={setIngredientsSearch}
          required
          fullWidth
        />
      </Box>
    </Box>
  )
}
const IngredientsDialog = ({ ingredient, onClose }) => {
  const theme = useTheme()

  const onSubmit = async () => {
    //TODO: put ingredients
  }

  const { _id, ...restOfIngredient } = ingredient || {}
  const isEditing = !!_id

  const formik = useFormik({
    initialValues: { ...defaultIngredient, ...restOfIngredient },
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: false,
    onSubmit: onSubmit,
    validationSchema: ingredientsValidationSchema,
  })

  return (
    <FormikProvider value={formik}>
      <Dialog open={!!ingredient} maxWidth="lg">
        <DialogTitle>
          {isEditing ? t('edit_ingredient') : t('create_ingredient')}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              width: theme.spacing(100),
              padding: theme.spacing(1),
              '& > *': {
                margin: theme.spacing(1),
              },
            }}
          >
            <DialogForm />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>exit</Button>
          <Button disabled={formik.isValid} onClick={formik.onSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </FormikProvider>
  )
}

export default IngredientsDialog
