import React from 'react'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material'

import { addLocation } from 'api/locations'
import { useLocations } from 'hooks/locations'
import locationValidationSchema from 'schemas/location'

import TextInput from 'components/FormInputs/TextInput'

const AddLocationDialog = ({ onClose, onSave }) => {
  const { t } = useTranslation()

  const { mutate } = useLocations()

  const handleOnSubmit = async (values) => {
    try {
      const insertedLocation = await addLocation(values)
      mutate()
      onSave(insertedLocation)
    } catch (error) {
      console.log(`Could not add location: ${error.message}`)
    }
  }

  return (
    <Formik
      initialValues={{}}
      onSubmit={handleOnSubmit}
      validateOnBlur={false}
      validationSchema={locationValidationSchema}
    >
      {({ dirty, isValid, submitForm }) => (
        <Form onSubmit={submitForm}>
          <Dialog open onClose={onClose}>
            <DialogTitle>{t('Add Location')}</DialogTitle>
            <DialogContent>
              <Stack direction="column">
                <TextInput
                  name="streetAddress"
                  label="Street Address"
                  required
                />
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <Box>
                    <TextInput name="city" label="City" required />
                  </Box>
                  <Box>
                    <TextInput name="country" label="Country" required />
                  </Box>
                </Stack>
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

export default AddLocationDialog
