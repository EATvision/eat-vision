import React, { useState } from 'react'
import update from 'immutability-helper'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Form, useFormik, FormikProvider } from 'formik'

import { Add } from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'

import { useKitchen } from 'contexts/kitchen'
import dishValidationSchema from 'schemas/dish'
import { addDish, removeDish, updateDishById } from 'api/dishes'
import { useDishById, useDishesByKitchenId } from 'hooks/dishes'

import TextInput from 'components/FormInputs/TextInput'
import NumberInput from 'components/FormInputs/NumberInput'
import ConfirmDialog from 'components/CustomersView/ConfirmDialog'
import IngredientsInput from 'components/CustomersView/DishPage/IngredientsInput'
import SelectCategories from 'components/CustomersView/DishPage/SelectCategories'
import AddCategoryDialog from 'components/CustomersView/DishPage/AddCategoryDialog'

const DIALOGS = {
  ADD_CATEGORY: 'ADD_CATEGORY',
}

function DishPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const { dishId } = useParams()
  const navigate = useNavigate()

  const isNew = dishId === 'new'
  const [openDialog, setOpenDialog] = useState('')
  const [confirmCallback, setConfirmCallback] = useState(null)

  const { kitchenId } = useKitchen()
  const { mutate: mutateDishes } = useDishesByKitchenId(kitchenId)
  const { dish, isLoading, mutate: mutateDish } = useDishById(!isNew && dishId)

  const handleOnSubmit = async (values) => {
    try {
      let updatedDish
      if (isNew) {
        updatedDish = await addDish(values)
      } else {
        updatedDish = await updateDishById(dishId, values)
      }
      mutateDishes()
      mutateDish(updatedDish)
      navigate(`/customers/dishes/${updatedDish._id}`)
    } catch (error) {
      console.log(`Could not update dish: ${error.message}`)
    }
  }

  const formik = useFormik({
    initialValues: dish || { kitchen: kitchenId },
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: false,
    onSubmit: handleOnSubmit,
    validationSchema: dishValidationSchema,
  })

  const handleOnClickDelete = () => {
    setConfirmCallback(() => async () => {
      try {
        await removeDish(formik.values.id)

        mutateDishes()
        navigate('/customers/dishes')
      } catch (error) {
        console.log(`Could not delete dish: ${error.message}`)
      }
      setOpenDialog('')
    })

    setOpenDialog(DIALOGS.REMOVE_MENU)
  }

  if (!isNew && isLoading) return <div>LOADING</div>

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h4">
          {isNew ? t('New Dish') : formik.values.name}
        </Typography>
        <FormikProvider value={formik}>
          <Stack as={Form} direction="column" maxWidth="md">
            <Stack direction="row" alignItems="flex-end" spacing={2}>
              <Stack flex={1} direction="column" alignItems="stretch">
                <TextInput name="name" label="Name" required fullWidth />
                <TextInput name="image.url" label={t('Image URL')} fullWidth />
              </Stack>
              <Box
                overflow="hidden"
                borderRadius={theme.spacing(0.5)}
                maxHeight={theme.spacing(24)}
                maxWidth={theme.spacing(36)}
              >
                <img src={formik.values.image?.url} loading="lazy" />
              </Box>
            </Stack>
            <TextInput
              name="description"
              label="Description"
              fullWidth
              multiline
              minRows={2}
            />
            <NumberInput name="price" label="Price" required />
            <Stack direction="row" alignItems="flex-start" spacing={1}>
              <SelectCategories
                name="categories"
                label={t('Categories')}
                required
                multiple
                fullWidth
              />
              <Tooltip title={t('Create new category')}>
                <Button
                  onClick={() => setOpenDialog(DIALOGS.ADD_CATEGORY)}
                  component={Box}
                  variant="outlined"
                  sx={{ marginTop: '39px !important', padding: '7px' }}
                >
                  <Add />
                </Button>
              </Tooltip>
            </Stack>

            <IngredientsInput
              name="recipe.mandatory"
              showAddIngredient
              label={t('Mandatory Ingredients')}
            />
            <Divider />
            <IngredientsInput
              name="recipe.addable"
              showAddDish
              showAddIngredient
              label={t('Addable Ingredients')}
              showDishAddedPrice
              showIngredientAddedPrice
            />
            <Divider />
            <IngredientsInput
              showAddIngredient
              name="recipe.excludible"
              label={t('Excludible Ingredients')}
            />
            <Divider />
            <IngredientsInput
              showAddDish
              showAddIngredient
              name="recipe.changeable"
              label={t('Changeable Ingredients')}
            />
            <Divider />
            <Stack direction="row" spacing={1} my={4}>
              <Button
                disabled={isNew}
                onClick={handleOnClickDelete}
                color="error"
              >
                {t('Delete')}
              </Button>
              <Box flex={1} />
              <Button
                disabled={!formik.dirty}
                color="primary"
                variant="outlined"
                onClick={formik.resetForm}
              >
                {t('reset')}
              </Button>
              <Button
                disabled={!formik.dirty || !formik.isValid}
                color="primary"
                variant="contained"
                type="submit"
              >
                {t('save')}
              </Button>
            </Stack>
          </Stack>
        </FormikProvider>
      </Stack>
      {openDialog === DIALOGS.ADD_CATEGORY && (
        <AddCategoryDialog
          onClose={() => setOpenDialog('')}
          onSave={(categoryId) => {
            formik.setFieldValue(
              'categories',
              update(formik.values.categories, { $push: [categoryId] })
            )
            setOpenDialog('')
          }}
        />
      )}
      {openDialog === DIALOGS.REMOVE_MENU && (
        <ConfirmDialog
          open
          title="Delete Dish"
          onClose={() => setOpenDialog('')}
          onConfirm={() => confirmCallback()}
          labels={{ confirm: 'Delete', reject: 'Cancel' }}
        >
          Are you sure you want to delete this dish?
        </ConfirmDialog>
      )}
    </>
  )
}

export default DishPage
