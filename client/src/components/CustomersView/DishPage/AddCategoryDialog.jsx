import React from 'react'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material'

import { addCategory } from 'api/categories'
import { useKitchen } from 'contexts/kitchen'
import { useCategories } from 'hooks/categories'
import categoryValidationSchema from 'schemas/category'

import TextInput from 'components/FormInputs/TextInput'

const AddCategoryDialog = ({ onClose, onSave }) => {
  const { t } = useTranslation()
  const { kitchenId } = useKitchen()
  const { mutate } = useCategories({ kitchens: [kitchenId] })

  const handleOnSubmit = async (values) => {
    try {
      const { insertedId } = await addCategory(values)
      mutate()
      onSave(insertedId)
    } catch (error) {
      console.log(`Could not add category: ${error.message}`)
    }
  }

  return (
    <Formik
      initialValues={{ kitchen: kitchenId }}
      onSubmit={handleOnSubmit}
      validateOnBlur={false}
      validationSchema={categoryValidationSchema}
    >
      {({ dirty, isValid, submitForm }) => (
        <Form onSubmit={submitForm}>
          <Dialog open onClose={onClose}>
            <DialogTitle>{t('Add Category')}</DialogTitle>
            <DialogContent>
              <Stack direction="column">
                <TextInput name="name" label="Name" required />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button color="primary" variant="outlined" onClick={onClose}>
                {t('cancel')}
              </Button>
              <Button
                disabled={!dirty || !isValid}
                color="primary"
                variant="contained"
                type="submit"
                onClick={submitForm}
              >
                {t('save')}
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}

export default AddCategoryDialog
