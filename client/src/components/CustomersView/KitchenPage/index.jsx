import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Form, useFormik, FormikProvider } from 'formik'

import { Add } from '@mui/icons-material'
import { Box, Button, Stack, Tooltip } from '@mui/material'

import { useKitchen } from 'contexts/kitchen'
import { updateKitchenById } from 'api/kitchens'
import kitchenValidationSchema from 'schemas/kitchen'
import { useKitchenById, useKitchens } from 'hooks/kitchens'

import Select from 'components/FormInputs/Select'
import TextInput from 'components/FormInputs/TextInput'
import SelectLocations from 'components/CustomersView/KitchenPage/SelectLocations'
import AddLocationDialog from 'components/CustomersView/KitchenPage/AddLocationDialog'

const DIALOGS = {
  ADD_LOCATION: 'ADD_LOCATION',
}

function KitchenPage() {
  const { t } = useTranslation()
  const [openDialog, setOpenDialog] = useState('')

  const { kitchenId } = useKitchen()
  const { mutate: mutateKitchens } = useKitchens()
  const {
    kitchen,
    mutate: mutateKitchen,
    isLoading,
  } = useKitchenById(kitchenId)

  const handleOnSubmit = async (values) => {
    try {
      const updatedKitchen = await updateKitchenById(kitchenId, values)
      mutateKitchen(updatedKitchen)
      mutateKitchens()
    } catch (error) {
      console.log(`Could not update kitchen: ${error.message}`)
    }
  }

  const formik = useFormik({
    initialValues: kitchen || {},
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: false,
    onSubmit: handleOnSubmit,
    validationSchema: kitchenValidationSchema,
  })

  if (isLoading) return <div>LOADING</div>

  return (
    <>
      <FormikProvider value={formik}>
        <Stack as={Form} direction="column" maxWidth="md">
          <TextInput name="name" label="Name" required fullWidth />

          <TextInput name="website" label="Website" required fullWidth />

          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <SelectLocations
              name="location"
              label="Location"
              required
              multiple
              fullWidth
            />
            <Tooltip title={t('Create new location')}>
              <Button
                onClick={() => setOpenDialog(DIALOGS.ADD_LOCATION)}
                component={Box}
                variant="outlined"
                sx={{ marginTop: '39px !important', padding: '7px' }}
              >
                <Add />
              </Button>
            </Tooltip>
          </Stack>

          <Select
            required
            fullWidth
            name="intentions"
            label="Intentions"
            options={['Dine-in', 'Takeout', 'Delivery']}
            multiple
          />

          <Select
            name="currency"
            label="Currency"
            options={['$', '€', '₪']}
            required
            fullWidth
          />

          <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
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
      {openDialog === DIALOGS.ADD_LOCATION && (
        <AddLocationDialog
          onClose={() => setOpenDialog('')}
          onSave={(locationId) => {
            formik.setFieldValue('location', [locationId])
            setOpenDialog('')
          }}
        />
      )}
    </>
  )
}

export default KitchenPage
