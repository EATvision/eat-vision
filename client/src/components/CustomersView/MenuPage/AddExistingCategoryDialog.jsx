import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormikProvider, useFormik } from 'formik'

import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

import yup from 'schemas/yup'

import SelectCategories from 'components/CustomersView/DishPage/SelectCategories'

const addCategoriesValidationSchema = () =>
  yup.object().shape({
    categories: yup
      .array()
      .of(yup.string())
      .min(1, 'Choose one category or more')
      .nullable()
      .required('Choose one category or more'),
  })

const AddExistingCategoryDialog = ({ onClose, onSave }) => {
  const { t } = useTranslation()

  const handleOnSubmit = (values) => {
    onSave(values.categories)
  }

  const formik = useFormik({
    initialValues: { categories: [] },
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: false,
    onSubmit: handleOnSubmit,
    validationSchema: addCategoriesValidationSchema,
  })

  return (
    <FormikProvider value={formik}>
      <Dialog open onClose={onClose} fullWidth>
        <DialogTitle>{t('Add Categories')}</DialogTitle>
        <DialogContent>
          <Stack direction="column">
            <SelectCategories
              name="categories"
              label={t('Categories')}
              multiple
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button
            disabled={!formik.dirty || !formik.isValid}
            color="primary"
            variant="contained"
            type="submit"
            onClick={formik.handleSubmit}
          >
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </FormikProvider>
  )
}

export default AddExistingCategoryDialog
