import React, { useState } from 'react'
import _uniq from 'lodash/uniq'
import update from 'immutability-helper'
import { useTranslation } from 'react-i18next'
import { Form, FormikProvider, useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

import {
  Box,
  Stack,
  Button,
  FormLabel,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material'

import { useKitchen } from 'contexts/kitchen'
import { useCategories } from 'hooks/categories'
import { useMenuById, useMenusByKitchenId } from 'hooks/menus'

import menuValidationSchema from 'schemas/menu'
import { addMenu, removeMenu, updateMenuById } from 'api/menus'

import TextInput from 'components/FormInputs/TextInput'
import ConfirmDialog from 'components/CustomersView/ConfirmDialog'
import CategoriesList from 'components/CustomersView/MenuPage/CategoriesList'
import AddExistingCategoryDialog from 'components/CustomersView/MenuPage/AddExistingCategoryDialog'

const DIALOGS = {
  REMOVE_MENU: 'REMOVE_MENU',
  ADD_EXISTING_CATEGORY: 'ADD_EXISTING_CATEGORY',
}

function MenuPage() {
  const { t } = useTranslation()
  const { menuId } = useParams()
  const navigate = useNavigate()
  const { kitchenId } = useKitchen()

  const [openDialog, setOpenDialog] = useState('')
  const [confirmCallback, setConfirmCallback] = useState(null)

  const isNew = menuId === 'new'

  const { mutate: mutateMenus } = useMenusByKitchenId(kitchenId)
  const { menu, isLoading, mutate: mutateMenu } = useMenuById(!isNew && menuId)

  const { categories } = useCategories({
    kitchens: [kitchenId],
    mapById: true,
  })

  const handleOnSubmit = async (values) => {
    try {
      let updatedMenu
      if (isNew) {
        updatedMenu = await addMenu(values)
      } else {
        updatedMenu = await updateMenuById(menuId, values)
      }
      mutateMenus()
      mutateMenu(updatedMenu)
      navigate(`/customers/menus/${updatedMenu.id}`)
    } catch (error) {
      console.log(`Could not update menu: ${error.message}`)
    }
  }

  const formik = useFormik({
    initialValues: menu || { kitchen: kitchenId },
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: false,
    onSubmit: handleOnSubmit,
    validationSchema: menuValidationSchema,
  })

  const handleOnClickDelete = () => {
    setConfirmCallback(() => async () => {
      try {
        await removeMenu(formik.values.id)

        mutateMenus()
        navigate('/customers/menus')
      } catch (error) {
        console.log(`Could not delete menu: ${error.message}`)
      }
      setOpenDialog('')
    })

    setOpenDialog(DIALOGS.REMOVE_MENU)
  }

  if (!isNew && isLoading) return <div>{t('loading')}</div>

  return (
    <>
      <FormikProvider value={formik}>
        <Form>
          <Stack direction="column" maxWidth="md">
            <Typography variant="h4">
              {isNew ? t('new_menu') : menu?.name}
            </Typography>
            <TextInput name="name" label={t('name')} required />
            <TextInput
              name="description"
              label={t('description')}
              multiline
              minRows={2}
              required
            />
            <FormControl required margin="normal">
              <FormLabel>{t('menu_categories')}</FormLabel>
              <CategoriesList
                categories={formik.values.categories?.map(
                  (categoryId) =>
                    categories[categoryId] || {
                      id: categoryId,
                      name: categoryId,
                    }
                )}
                onChange={(categories) =>
                  formik.setFieldValue(
                    'categories',
                    categories.map(({ id }) => id)
                  )
                }
              />
              <FormHelperText>
                {t('you_can_drag_and_drop_categories_to_reorder_them.')}
              </FormHelperText>
            </FormControl>
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => setOpenDialog(DIALOGS.ADD_EXISTING_CATEGORY)}
              >
                {t('add_category')}
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} my={4}>
              <Button
                disabled={isNew}
                onClick={handleOnClickDelete}
                color="error"
              >
                {t('delete')}
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
        </Form>
      </FormikProvider>
      {openDialog === DIALOGS.ADD_EXISTING_CATEGORY && (
        <AddExistingCategoryDialog
          onClose={() => setOpenDialog('')}
          onSave={(categories) => {
            formik.setFieldValue(
              'categories',
              _uniq(
                update(formik.values.categories, { $push: [...categories] })
              )
            )
            setOpenDialog('')
          }}
        />
      )}
      {openDialog === DIALOGS.REMOVE_MENU && (
        <ConfirmDialog
          title={t('delete_menu')}
          open={open}
          onClose={() => setOpenDialog('')}
          onConfirm={() => confirmCallback()}
          labels={{ confirm: t('delete'), reject: t('cancel') }}
        >
          {t('are_you_sure_you_want_to_delete_this_menu')}?
        </ConfirmDialog>
      )}
    </>
  )
}

export default MenuPage
